package com.example.clothingstore.payment;

import com.example.clothingstore.common.ResourceNotFoundException;
import com.example.clothingstore.order.Order;
import com.example.clothingstore.order.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }


    public String generatePaymentUrl(Order order, String paymentMethod) {
        String txnRef = "TXN_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 8);
        return "/checkout/payment-gateway?orderCode=" + order.getOrderCode() + "&amount=" + order.getTotalAmount() + "&method=" + paymentMethod + "&ref=" + txnRef;
    }

    @Transactional
    public void processPaymentSuccess(String orderCode, String transactionRef) {
        Order order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng: " + orderCode));

        Payment payment = order.getPayment();
        if (payment == null) {
            payment = Payment.builder()
                    .order(order)
                    .paymentMethod("VNPAY")
                    .amount(order.getTotalAmount())
                    .build();
        }

        payment.setPaymentStatus("COMPLETED");
        payment.setTransactionReference(transactionRef != null ? transactionRef : "TXN_ONLINE_" + System.currentTimeMillis());
        payment.setPaidAt(LocalDateTime.now());
        paymentRepository.save(payment);

        order.setOrderStatus("CONFIRMED");
        orderRepository.save(order);

        log.info("Order {} payment successfully completed via {}", orderCode, payment.getPaymentMethod());
    }

    @Transactional
    public void processPaymentFailure(String orderCode, String reason) {
        Order order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng: " + orderCode));

        Payment payment = order.getPayment();
        if (payment != null) {
            payment.setPaymentStatus("FAILED");
            paymentRepository.save(payment);
        }

        log.warn("Payment failed for order {}: {}", orderCode, reason);
    }
}
