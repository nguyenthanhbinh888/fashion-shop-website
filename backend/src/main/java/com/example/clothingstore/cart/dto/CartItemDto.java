package com.example.clothingstore.cart.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class CartItemDto {
    private Long id;
    private Long variantId;
    private Long productId;
    private String productName;
    private String productSlug;
    private String sku;
    private String colorName;
    private String colorCode;
    private String size;
    private BigDecimal price;
    private Integer quantity;
    private Integer stockQuantity;
    private BigDecimal itemTotal;
    private String imageUrl;


    public CartItemDto() {
    }

    public CartItemDto(Long id, Long variantId, Long productId, String productName, String productSlug, String sku, String colorName, String colorCode, String size, BigDecimal price, Integer quantity, Integer stockQuantity, BigDecimal itemTotal, String imageUrl) {
        this.id = id;
        this.variantId = variantId;
        this.productId = productId;
        this.productName = productName;
        this.productSlug = productSlug;
        this.sku = sku;
        this.colorName = colorName;
        this.colorCode = colorCode;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
        this.stockQuantity = stockQuantity;
        this.itemTotal = itemTotal;
        this.imageUrl = imageUrl;
    }

}
