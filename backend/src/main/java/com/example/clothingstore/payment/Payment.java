package com.example.clothingstore.payment;

import com.example.clothingstore.order.Order;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @Column(name = "payment_method", nullable = false, length = 30)
    private String paymentMethod; // COD, VNPAY, MOMO, CREDIT_CARD

    @Column(name = "payment_status", nullable = false, length = 30)
    @Builder.Default
    private String paymentStatus = "PENDING"; // PENDING, COMPLETED, FAILED, REFUNDED

    @Column(name = "transaction_reference", length = 100)
    private String transactionReference;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    public Payment() {
    }

    public Payment(Long id, Order order, String paymentMethod, String paymentStatus, String transactionReference, BigDecimal amount, LocalDateTime paidAt, LocalDateTime createdAt) {
        this.id = id;
        this.order = order;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.transactionReference = transactionReference;
        this.amount = amount;
        this.paidAt = paidAt;
        this.createdAt = createdAt;
    }

}
