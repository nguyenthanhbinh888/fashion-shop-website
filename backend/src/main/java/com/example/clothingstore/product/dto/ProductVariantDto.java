package com.example.clothingstore.product.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class ProductVariantDto {
    private Long id;
    private String sku;
    private String colorName;
    private String colorCode;
    private String size;
    private BigDecimal price;
    private Integer stockQuantity;
    private String imageUrl;
    private Boolean isActive;


    public ProductVariantDto() {
    }

    public ProductVariantDto(Long id, String sku, String colorName, String colorCode, String size, BigDecimal price, Integer stockQuantity, String imageUrl, Boolean isActive) {
        this.id = id;
        this.sku = sku;
        this.colorName = colorName;
        this.colorCode = colorCode;
        this.size = size;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.isActive = isActive;
    }

}
