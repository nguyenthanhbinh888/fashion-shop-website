package com.example.clothingstore.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CreateProductRequest {

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    private String slug;

    private String description;

    private String material;

    private String careInstructions;

    @NotNull(message = "Giá niêm yết không được để trống")
    private BigDecimal basePrice;

    private BigDecimal originalPrice;

    @NotNull(message = "Danh mục không được để trống")
    private Long categoryId;

    private Long brandId;

    private Boolean isFeatured;

    private String primaryImageUrl;

    @Builder.Default
    private List<String> additionalImages = new ArrayList<>();

    @Builder.Default
    private List<VariantRequest> variants = new ArrayList<>();

    public CreateProductRequest() {
    }

    public CreateProductRequest(String name, String slug, String description, String material, String careInstructions, BigDecimal basePrice, BigDecimal originalPrice, Long categoryId, Long brandId, Boolean isFeatured, String primaryImageUrl, List<String> additionalImages, List<VariantRequest> variants) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.material = material;
        this.careInstructions = careInstructions;
        this.basePrice = basePrice;
        this.originalPrice = originalPrice;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.isFeatured = isFeatured != null ? isFeatured : false;
        this.primaryImageUrl = primaryImageUrl;
        this.additionalImages = additionalImages != null ? additionalImages : new ArrayList<>();
        this.variants = variants != null ? variants : new ArrayList<>();
    }

    @Data
    @Builder
    public static class VariantRequest {
        private String colorName;
        private String colorCode;
        private String size;
        private BigDecimal price;
        private Integer stockQuantity;
        private String sku;
        private String imageUrl;

        public VariantRequest() {
        }

        public VariantRequest(String colorName, String colorCode, String size, BigDecimal price, Integer stockQuantity, String sku, String imageUrl) {
            this.colorName = colorName;
            this.colorCode = colorCode != null ? colorCode : "#000000";
            this.size = size;
            this.price = price;
            this.stockQuantity = stockQuantity != null ? stockQuantity : 0;
            this.sku = sku;
            this.imageUrl = imageUrl;
        }
    }
}
