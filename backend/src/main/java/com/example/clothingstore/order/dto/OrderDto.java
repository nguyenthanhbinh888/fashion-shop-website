package com.example.clothingstore.order.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderDto {
    private Long id;
    private String orderCode;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String shippingAddress;
    private BigDecimal subtotal;
    private BigDecimal shippingFee;
    private BigDecimal discountAmount;
    private BigDecimal totalAmount;
    private String couponCode;
    private String orderStatus;
    private String note;
    private String paymentMethod;
    private String paymentStatus;
    private String paymentUrl;
    private List<OrderItemDto> items;
    private LocalDateTime createdAt;


    public OrderDto() {
    }

    public OrderDto(Long id, String orderCode, String customerName, String customerEmail, String customerPhone, String shippingAddress, BigDecimal subtotal, BigDecimal shippingFee, BigDecimal discountAmount, BigDecimal totalAmount, String couponCode, String orderStatus, String note, String paymentMethod, String paymentStatus, String paymentUrl, List<OrderItemDto> items, LocalDateTime createdAt) {
        this.id = id;
        this.orderCode = orderCode;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.shippingAddress = shippingAddress;
        this.subtotal = subtotal;
        this.shippingFee = shippingFee;
        this.discountAmount = discountAmount;
        this.totalAmount = totalAmount;
        this.couponCode = couponCode;
        this.orderStatus = orderStatus;
        this.note = note;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.paymentUrl = paymentUrl;
        this.items = items;
        this.createdAt = createdAt;
    }

}
