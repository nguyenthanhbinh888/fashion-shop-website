package com.example.clothingstore.payment;

import com.example.clothingstore.common.ApiResponse;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    @PostMapping("/confirm")
    public ResponseEntity<ApiResponse<Void>> confirmPayment(@RequestBody PaymentConfirmDto request) {
        paymentService.processPaymentSuccess(request.getOrderCode(), request.getTransactionRef());
        return ResponseEntity.ok(ApiResponse.ok("Xác nhận thanh toán thành công", null));
    }

    @PostMapping("/fail")
    public ResponseEntity<ApiResponse<Void>> failPayment(@RequestBody PaymentFailDto request) {
        paymentService.processPaymentFailure(request.getOrderCode(), request.getReason());
        return ResponseEntity.ok(ApiResponse.ok("Ghi nhận trạng thái thanh toán không thành công", null));
    }

    @Data
    public static class PaymentConfirmDto {
        private String orderCode;
        private String transactionRef;
    }

    @Data
    public static class PaymentFailDto {
        private String orderCode;
        private String reason;
    }
}
