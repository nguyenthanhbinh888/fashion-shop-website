package com.example.clothingstore.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_variants")
@Getter
@Setter
@Builder
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;

    @Column(nullable = false, unique = true, length = 60)
    private String sku;

    @Column(name = "color_name", nullable = false, length = 50)
    private String colorName;

    @Column(name = "color_code", nullable = false, length = 20)
    @Builder.Default
    private String colorCode = "#000000";

    @Column(nullable = false, length = 20)
    private String size;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "stock_quantity", nullable = false)
    @Builder.Default
    private Integer stockQuantity = 0;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    public ProductVariant() {
    }

    public ProductVariant(Long id, Product product, String sku, String colorName, String colorCode, String size, BigDecimal price, Integer stockQuantity, String imageUrl, Boolean isActive, LocalDateTime createdAt) {
        this.id = id;
        this.product = product;
        this.sku = sku;
        this.colorName = colorName;
        this.colorCode = colorCode;
        this.size = size;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }

}
