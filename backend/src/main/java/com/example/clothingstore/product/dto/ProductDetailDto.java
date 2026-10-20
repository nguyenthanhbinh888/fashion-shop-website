package com.example.clothingstore.product.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ProductDetailDto {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String material;
    private String careInstructions;
    private BigDecimal basePrice;
    private BigDecimal originalPrice;
    private Long categoryId;
    private String categoryName;
    private Long brandId;
    private String brandName;
    private Boolean isFeatured;
    private List<ProductVariantDto> variants;
    private List<ProductImageDto> images;


    public ProductDetailDto() {
    }

    public ProductDetailDto(Long id, String name, String slug, String description, String material, String careInstructions, BigDecimal basePrice, BigDecimal originalPrice, Long categoryId, String categoryName, Long brandId, String brandName, Boolean isFeatured, List<ProductVariantDto> variants, List<ProductImageDto> images) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.material = material;
        this.careInstructions = careInstructions;
        this.basePrice = basePrice;
        this.originalPrice = originalPrice;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.brandId = brandId;
        this.brandName = brandName;
        this.isFeatured = isFeatured;
        this.variants = variants;
        this.images = images;
    }

}
