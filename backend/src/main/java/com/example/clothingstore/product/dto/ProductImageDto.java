package com.example.clothingstore.product.dto;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class ProductImageDto {
    private Long id;
    private String imageUrl;
    private String colorName;
    private Boolean isPrimary;
    private Integer displayOrder;


    public ProductImageDto() {
    }

    public ProductImageDto(Long id, String imageUrl, String colorName, Boolean isPrimary, Integer displayOrder) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.colorName = colorName;
        this.isPrimary = isPrimary;
        this.displayOrder = displayOrder;
    }

}
