package com.example.clothingstore.admin;

import com.example.clothingstore.admin.dto.DashboardStatsDto;
import com.example.clothingstore.coupon.Coupon;
import com.example.clothingstore.coupon.CouponRepository;
import com.example.clothingstore.order.OrderRepository;
import com.example.clothingstore.order.OrderService;
import com.example.clothingstore.order.dto.OrderDto;
import com.example.clothingstore.product.ProductRepository;
import com.example.clothingstore.product.ProductVariantRepository;
import com.example.clothingstore.product.dto.ProductVariantDto;
import com.example.clothingstore.user.UserRepository;
import com.example.clothingstore.user.dto.UserDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;
    private final CouponRepository couponRepository;
    private final OrderService orderService;

    public AdminService(OrderRepository orderRepository, ProductRepository productRepository, ProductVariantRepository variantRepository, UserRepository userRepository, CouponRepository couponRepository, OrderService orderService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
        this.userRepository = userRepository;
        this.couponRepository = couponRepository;
        this.orderService = orderService;
    }


    @Transactional
    public DashboardStatsDto getDashboardStats() {
        BigDecimal totalRev = orderRepository.calculateTotalRevenue();
        if (totalRev == null) {
            totalRev = BigDecimal.ZERO;
        }

        long totalOrders = orderRepository.count();
        long pendingOrders = orderRepository.countByOrderStatus("PENDING");
        long totalProducts = productRepository.count();
        long totalCustomers = userRepository.count();

        List<OrderDto> recentOrders = orderRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 5))
                .getContent().stream()
                .map(orderService::mapToDto)
                .collect(Collectors.toList());

        List<ProductVariantDto> lowStock = variantRepository.findAll().stream()
                .filter(v -> v.getStockQuantity() != null && v.getStockQuantity() <= 15)
                .map(v -> ProductVariantDto.builder()
                        .id(v.getId())
                        .sku(v.getSku())
                        .colorName(v.getColorName())
                        .colorCode(v.getColorCode())
                        .size(v.getSize())
                        .price(v.getPrice())
                        .stockQuantity(v.getStockQuantity())
                        .imageUrl(v.getImageUrl())
                        .isActive(v.getIsActive())
                        .build())
                .collect(Collectors.toList());

        return DashboardStatsDto.builder()
                .totalRevenue(totalRev)
                .totalOrders(totalOrders)
                .pendingOrders(pendingOrders)
                .totalProducts(totalProducts)
                .totalCustomers(totalCustomers)
                .recentOrders(recentOrders)
                .lowStockVariants(lowStock)
                .build();
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u -> UserDto.builder()
                        .id(u.getId())
                        .fullName(u.getFullName())
                        .email(u.getEmail())
                        .phone(u.getPhone())
                        .role(u.getRole())
                        .avatarUrl(u.getAvatarUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }
}
