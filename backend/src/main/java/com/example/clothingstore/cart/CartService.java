package com.example.clothingstore.cart;

import com.example.clothingstore.cart.dto.*;
import com.example.clothingstore.common.BadRequestException;
import com.example.clothingstore.common.ResourceNotFoundException;
import com.example.clothingstore.product.ProductVariant;
import com.example.clothingstore.product.ProductVariantRepository;
import com.example.clothingstore.user.User;
import com.example.clothingstore.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductVariantRepository variantRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.variantRepository = variantRepository;
        this.userRepository = userRepository;
    }


    @Transactional
    public Cart getOrCreateCart(String email, String sessionId) {
        if (email != null && !email.isBlank()) {
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                return cartRepository.findByUserId(user.getId())
                        .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
            }
        }

        if (sessionId != null && !sessionId.isBlank()) {
            return cartRepository.findBySessionId(sessionId)
                    .orElseGet(() -> cartRepository.save(Cart.builder().sessionId(sessionId).build()));
        }

        return cartRepository.save(Cart.builder().sessionId(java.util.UUID.randomUUID().toString()).build());
    }

    @Transactional
    public CartDto getCartDto(String email, String sessionId) {
        Cart cart = getOrCreateCart(email, sessionId);
        return mapToDto(cart);
    }

    @Transactional
    public CartDto addItem(String email, AddToCartRequest request) {
        Cart cart = getOrCreateCart(email, request.getSessionId());

        ProductVariant variant = variantRepository.findById(request.getVariantId())
                .orElseThrow(() -> new ResourceNotFoundException("Biến thể sản phẩm không tồn tại"));

        if (!Boolean.TRUE.equals(variant.getIsActive())) {
            throw new BadRequestException("Sản phẩm hiện đang ngừng kinh doanh");
        }

        Optional<CartItem> existingItemOpt = cartItemRepository.findByCartIdAndVariantId(cart.getId(), variant.getId());

        int currentQty = existingItemOpt.map(CartItem::getQuantity).orElse(0);
        int targetQty = currentQty + request.getQuantity();

        if (targetQty > variant.getStockQuantity()) {
            throw new BadRequestException("Số lượng tồn kho không đủ (chỉ còn " + variant.getStockQuantity() + " sản phẩm)");
        }

        if (existingItemOpt.isPresent()) {
            CartItem item = existingItemOpt.get();
            item.setQuantity(targetQty);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .variant(variant)
                    .quantity(request.getQuantity())
                    .build();
            cartItemRepository.save(newItem);
        }

        return getCartDto(email, request.getSessionId());
    }

    @Transactional
    public CartDto updateItem(String email, String sessionId, Long itemId, UpdateCartItemRequest request) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Mục giỏ hàng không tồn tại"));

        if (request.getQuantity() > item.getVariant().getStockQuantity()) {
            throw new BadRequestException("Số lượng tồn kho không đủ (chỉ còn " + item.getVariant().getStockQuantity() + " sản phẩm)");
        }

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        return getCartDto(email, sessionId);
    }

    @Transactional
    public CartDto removeItem(String email, String sessionId, Long itemId) {
        cartItemRepository.deleteById(itemId);
        return getCartDto(email, sessionId);
    }

    @Transactional
    public void clearCart(Cart cart) {
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private CartDto mapToDto(Cart cart) {
        List<CartItem> items = cart.getItems() != null ? cart.getItems() : new ArrayList<>();

        List<CartItemDto> itemDtos = items.stream().map(item -> {
            ProductVariant v = item.getVariant();
            BigDecimal unitPrice = v.getPrice();
            BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));

            return CartItemDto.builder()
                    .id(item.getId())
                    .variantId(v.getId())
                    .productId(v.getProduct() != null ? v.getProduct().getId() : null)
                    .productName(v.getProduct() != null ? v.getProduct().getName() : "")
                    .productSlug(v.getProduct() != null ? v.getProduct().getSlug() : "")
                    .sku(v.getSku())
                    .colorName(v.getColorName())
                    .colorCode(v.getColorCode())
                    .size(v.getSize())
                    .price(unitPrice)
                    .quantity(item.getQuantity())
                    .stockQuantity(v.getStockQuantity())
                    .itemTotal(itemTotal)
                    .imageUrl(v.getImageUrl())
                    .build();
        }).collect(Collectors.toList());

        BigDecimal subtotal = itemDtos.stream()
                .map(CartItemDto::getItemTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalItems = itemDtos.stream()
                .mapToInt(CartItemDto::getQuantity)
                .sum();

        return CartDto.builder()
                .id(cart.getId())
                .items(itemDtos)
                .totalItems(totalItems)
                .subtotal(subtotal)
                .build();
    }
}
