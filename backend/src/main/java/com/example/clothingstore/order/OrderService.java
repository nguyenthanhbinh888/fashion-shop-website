package com.example.clothingstore.order;

import com.example.clothingstore.cart.Cart;
import com.example.clothingstore.cart.CartItem;
import com.example.clothingstore.cart.CartService;
import com.example.clothingstore.common.BadRequestException;
import com.example.clothingstore.common.PagedResponse;
import com.example.clothingstore.common.ResourceNotFoundException;
import com.example.clothingstore.coupon.Coupon;
import com.example.clothingstore.coupon.CouponRepository;
import com.example.clothingstore.order.dto.CreateOrderRequest;
import com.example.clothingstore.order.dto.OrderDto;
import com.example.clothingstore.order.dto.OrderItemDto;
import com.example.clothingstore.payment.Payment;
import com.example.clothingstore.payment.PaymentRepository;
import com.example.clothingstore.payment.PaymentService;
import com.example.clothingstore.product.ProductVariant;
import com.example.clothingstore.product.ProductVariantRepository;
import com.example.clothingstore.user.User;
import com.example.clothingstore.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductVariantRepository variantRepository;
    private final PaymentRepository paymentRepository;
    private final PaymentService paymentService;
    private final CartService cartService;
    private final UserRepository userRepository;
    private final CouponRepository couponRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductVariantRepository variantRepository, PaymentRepository paymentRepository, PaymentService paymentService, CartService cartService, UserRepository userRepository, CouponRepository couponRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.variantRepository = variantRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
        this.cartService = cartService;
        this.userRepository = userRepository;
        this.couponRepository = couponRepository;
    }


    @Transactional
    public OrderDto createOrder(String userEmail, CreateOrderRequest request) {
        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        // 1. Thu thập danh sách sản phẩm cần đặt
        List<CartItemSnapshot> itemSnapshots = new ArrayList<>();
        Cart cart = null;

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            // Đặt hàng trực tiếp
            for (CreateOrderRequest.OrderItemRequest itemReq : request.getItems()) {
                ProductVariant variant = variantRepository.findById(itemReq.getVariantId())
                        .orElseThrow(() -> new ResourceNotFoundException("Biến thể ID " + itemReq.getVariantId() + " không tồn tại"));
                itemSnapshots.add(new CartItemSnapshot(variant, itemReq.getQuantity()));
            }
        } else {
            // Lấy từ giỏ hàng
            cart = cartService.getOrCreateCart(userEmail, request.getSessionId());
            if (cart.getItems() == null || cart.getItems().isEmpty()) {
                throw new BadRequestException("Giỏ hàng của bạn đang trống, vui lòng chọn sản phẩm trước khi thanh toán");
            }
            for (CartItem ci : cart.getItems()) {
                itemSnapshots.add(new CartItemSnapshot(ci.getVariant(), ci.getQuantity()));
            }
        }

        // 2. Kiểm tra và trừ tồn kho (Transactional)
        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItemSnapshot snap : itemSnapshots) {
            ProductVariant variant = snap.variant;
            int qty = snap.quantity;

            if (variant.getStockQuantity() < qty) {
                throw new BadRequestException("Sản phẩm '" + variant.getProduct().getName() +
                        "' (Size: " + variant.getSize() + ", Màu: " + variant.getColorName() +
                        ") không đủ tồn kho (chỉ còn " + variant.getStockQuantity() + ")");
            }

            // Trừ kho
            variant.setStockQuantity(variant.getStockQuantity() - qty);
            variantRepository.save(variant);

            BigDecimal lineTotal = variant.getPrice().multiply(BigDecimal.valueOf(qty));
            subtotal = subtotal.add(lineTotal);

            OrderItem orderItem = OrderItem.builder()
                    .variant(variant)
                    .productName(variant.getProduct().getName())
                    .colorName(variant.getColorName())
                    .size(variant.getSize())
                    .sku(variant.getSku())
                    .unitPrice(variant.getPrice())
                    .quantity(qty)
                    .totalPrice(lineTotal)
                    .imageUrl(variant.getImageUrl())
                    .build();

            orderItems.add(orderItem);
        }

        // 3. Tính phí giao hàng (Đơn từ 1.000.000đ miễn phí ship, dưới tính 30.000đ)
        BigDecimal shippingFee = subtotal.compareTo(BigDecimal.valueOf(1000000)) >= 0 ? BigDecimal.ZERO : BigDecimal.valueOf(30000);

        // 4. Kiểm tra & tính toán mã giảm giá
        BigDecimal discountAmount = BigDecimal.ZERO;
        String validCouponCode = null;

        if (request.getCouponCode() != null && !request.getCouponCode().isBlank()) {
            Coupon coupon = couponRepository.findByCodeIgnoreCase(request.getCouponCode().trim()).orElse(null);
            if (coupon != null && Boolean.TRUE.equals(coupon.getIsActive())) {
                LocalDateTime now = LocalDateTime.now();
                if (!now.isBefore(coupon.getStartDate()) && !now.isAfter(coupon.getEndDate())) {
                    if (coupon.getUsageLimit() == null || coupon.getUsedCount() < coupon.getUsageLimit()) {
                        if (coupon.getMinOrderValue() == null || subtotal.compareTo(coupon.getMinOrderValue()) >= 0) {
                            if ("PERCENT".equalsIgnoreCase(coupon.getDiscountType())) {
                                discountAmount = subtotal.multiply(coupon.getDiscountValue())
                                        .divide(BigDecimal.valueOf(100), 0, RoundingMode.HALF_UP);
                                if (coupon.getMaxDiscountAmount() != null && discountAmount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                                    discountAmount = coupon.getMaxDiscountAmount();
                                }
                            } else {
                                discountAmount = coupon.getDiscountValue().min(subtotal);
                            }
                            coupon.setUsedCount(coupon.getUsedCount() + 1);
                            couponRepository.save(coupon);
                            validCouponCode = coupon.getCode();
                        }
                    }
                }
            }
        }

        BigDecimal totalAmount = subtotal.add(shippingFee).subtract(discountAmount).max(BigDecimal.ZERO);

        // 5. Tạo mã đơn hàng duy nhất
        String orderCode = generateOrderCode();

        // 6. Lưu đơn hàng
        Order order = Order.builder()
                .orderCode(orderCode)
                .user(user)
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .shippingAddress(request.getShippingAddress())
                .subtotal(subtotal)
                .shippingFee(shippingFee)
                .discountAmount(discountAmount)
                .totalAmount(totalAmount)
                .couponCode(validCouponCode)
                .orderStatus("PENDING")
                .note(request.getNote())
                .build();

        order = orderRepository.save(order);

        // Gắn quan hệ với OrderItems
        for (OrderItem item : orderItems) {
            item.setOrder(order);
        }
        orderItemRepository.saveAll(orderItems);
        order.setItems(orderItems);

        // 7. Tạo bản ghi thanh toán
        Payment payment = Payment.builder()
                .order(order)
                .paymentMethod(request.getPaymentMethod().toUpperCase())
                .paymentStatus("PENDING")
                .amount(totalAmount)
                .build();
        payment = paymentRepository.save(payment);
        order.setPayment(payment);

        // 8. Nếu dùng giỏ hàng, xóa sạch các món trong giỏ
        if (cart != null) {
            cartService.clearCart(cart);
        }

        // 9. Sinh URL thanh toán nếu là phương thức online
        String paymentUrl = null;
        if (!"COD".equalsIgnoreCase(request.getPaymentMethod())) {
            paymentUrl = paymentService.generatePaymentUrl(order, request.getPaymentMethod());
        }

        OrderDto dto = mapToDto(order);
        dto.setPaymentUrl(paymentUrl);
        return dto;
    }

    @Transactional(readOnly = true)
    public OrderDto getOrderByCode(String orderCode) {
        Order order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với mã: " + orderCode));
        return mapToDto(order);
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PagedResponse<OrderDto> getAllOrders(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orderPage = orderRepository.findByOrderStatus(status, pageable);

        List<OrderDto> content = orderPage.getContent().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return PagedResponse.<OrderDto>builder()
                .content(content)
                .page(orderPage.getNumber())
                .size(orderPage.getSize())
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .last(orderPage.isLast())
                .build();
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng: " + orderId));

        order.setOrderStatus(newStatus);

        // Nếu trạng thái là DELIVERED và thanh toán COD thì cập nhật thanh toán thành công
        if ("DELIVERED".equalsIgnoreCase(newStatus) && order.getPayment() != null && "COD".equalsIgnoreCase(order.getPayment().getPaymentMethod())) {
            order.getPayment().setPaymentStatus("COMPLETED");
            order.getPayment().setPaidAt(LocalDateTime.now());
        }

        orderRepository.save(order);
        return mapToDto(order);
    }

    private String generateOrderCode() {
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomPart = 1000 + new Random().nextInt(9000);
        return "ORD-" + datePart + "-" + randomPart;
    }

    public OrderDto mapToDto(Order order) {
        List<OrderItemDto> itemDtos = order.getItems() != null ? order.getItems().stream()
                .map(item -> OrderItemDto.builder()
                        .id(item.getId())
                        .variantId(item.getVariant() != null ? item.getVariant().getId() : null)
                        .productName(item.getProductName())
                        .colorName(item.getColorName())
                        .size(item.getSize())
                        .sku(item.getSku())
                        .unitPrice(item.getUnitPrice())
                        .quantity(item.getQuantity())
                        .totalPrice(item.getTotalPrice())
                        .imageUrl(item.getImageUrl())
                        .build())
                .collect(Collectors.toList()) : new ArrayList<>();

        Payment payment = order.getPayment();

        return OrderDto.builder()
                .id(order.getId())
                .orderCode(order.getOrderCode())
                .customerName(order.getCustomerName())
                .customerEmail(order.getCustomerEmail())
                .customerPhone(order.getCustomerPhone())
                .shippingAddress(order.getShippingAddress())
                .subtotal(order.getSubtotal())
                .shippingFee(order.getShippingFee())
                .discountAmount(order.getDiscountAmount())
                .totalAmount(order.getTotalAmount())
                .couponCode(order.getCouponCode())
                .orderStatus(order.getOrderStatus())
                .note(order.getNote())
                .paymentMethod(payment != null ? payment.getPaymentMethod() : "COD")
                .paymentStatus(payment != null ? payment.getPaymentStatus() : "PENDING")
                .items(itemDtos)
                .createdAt(order.getCreatedAt())
                .build();
    }

    private static class CartItemSnapshot {
        final ProductVariant variant;
        final int quantity;

        CartItemSnapshot(ProductVariant variant, int quantity) {
            this.variant = variant;
            this.quantity = quantity;
        }
    }
}
