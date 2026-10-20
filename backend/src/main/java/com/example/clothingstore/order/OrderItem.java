package com.example.clothingstore.order;

import com.example.clothingstore.product.ProductVariant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "color_name", nullable = false, length = 50)
    private String colorName;

    @Column(nullable = false, length = 20)
    private String size;

    @Column(nullable = false, length = 60)
    private String sku;

    @Column(name = "unit_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "total_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "image_url", length = 500)
    private String imageUrl;


    public OrderItem() {
    }

    public OrderItem(Long id, Order order, ProductVariant variant, String productName, String colorName, String size, String sku, BigDecimal unitPrice, Integer quantity, BigDecimal totalPrice, String imageUrl) {
        this.id = id;
        this.order = order;
        this.variant = variant;
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
