package com.example.clothingstore.order.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class OrderItemDto {
    private Long id;
    private Long variantId;
    private String productName;
    private String colorName;
    private String size;
    private String sku;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal totalPrice;
    private String imageUrl;


    public OrderItemDto() {
    }

    public OrderItemDto(Long id, Long variantId, String productName, String colorName, String size, String sku, BigDecimal unitPrice, Integer quantity, BigDecimal totalPrice, String imageUrl) {
        this.id = id;
        this.variantId = variantId;
        this.productName = productName;
        this.colorName = colorName;
        this.size = size;
        this.sku = sku;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.imageUrl = imageUrl;
    }

}
