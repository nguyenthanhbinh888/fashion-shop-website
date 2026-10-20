package com.example.clothingstore.order.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    @NotBlank(message = "Tên khách hàng không được để trống")
    private String customerName;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String customerEmail;

    @NotBlank(message = "Số điện thoại không được để trống")
    private String customerPhone;

    @NotBlank(message = "Địa chỉ nhận hàng không được để trống")
    private String shippingAddress;

    private String note;

    @NotBlank(message = "Phương thức thanh toán không được để trống")
    private String paymentMethod; // COD, VNPAY

    private String couponCode;

    private String sessionId; // Dùng nếu là khách vãng lai

    private List<OrderItemRequest> items; // Tùy chọn nếu đặt hàng ngay không qua giỏ

    @Data
    public static class OrderItemRequest {
        private Long variantId;
        private Integer quantity;
    }
}
