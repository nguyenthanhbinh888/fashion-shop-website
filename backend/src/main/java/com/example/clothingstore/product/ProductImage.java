package com.example.clothingstore.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_images")
@Getter
@Setter
@Builder
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "color_name", length = 50)
    private String colorName;

    @Column(name = "is_primary")
    @Builder.Default
    private Boolean isPrimary = false;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;


    public ProductImage() {
    }

    public ProductImage(Long id, Product product, String imageUrl, String colorName, Boolean isPrimary, Integer displayOrder) {
        this.id = id;
        this.product = product;
        this.imageUrl = imageUrl;
        this.colorName = colorName;
        this.isPrimary = isPrimary;
        this.displayOrder = displayOrder;
    }

}
