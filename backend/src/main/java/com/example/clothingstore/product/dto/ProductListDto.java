package com.example.clothingstore.product.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ProductListDto {
    private Long id;
    private String name;
    private String slug;
    private String categoryName;
    private Long categoryId;
    private String brandName;
    private Long brandId;
    private BigDecimal basePrice;
    private BigDecimal originalPrice;
    private String primaryImageUrl;
    private Boolean isFeatured;
    private List<String> availableColors;
    private List<String> availableSizes;
    private Integer totalStock;


    public ProductListDto() {
    }

    public ProductListDto(Long id, String name, String slug, String categoryName, Long categoryId, String brandName, Long brandId, BigDecimal basePrice, BigDecimal originalPrice, String primaryImageUrl, Boolean isFeatured, List<String> availableColors, List<String> availableSizes, Integer totalStock) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.categoryName = categoryName;
        this.categoryId = categoryId;
        this.brandName = brandName;
        this.brandId = brandId;
        this.basePrice = basePrice;
        this.originalPrice = originalPrice;
        this.primaryImageUrl = primaryImageUrl;
        this.isFeatured = isFeatured;
        this.availableColors = availableColors;
        this.availableSizes = availableSizes;
        this.totalStock = totalStock;
    }

}
