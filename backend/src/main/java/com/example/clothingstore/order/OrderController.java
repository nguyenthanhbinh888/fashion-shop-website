package com.example.clothingstore.order;

import com.example.clothingstore.common.ApiResponse;
import com.example.clothingstore.order.dto.CreateOrderRequest;
import com.example.clothingstore.order.dto.OrderDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> createOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateOrderRequest request) {
        String email = userDetails != null ? userDetails.getUsername() : null;
        OrderDto orderDto = orderService.createOrder(email, request);
        return ResponseEntity.ok(ApiResponse.ok("Đặt hàng thành công", orderDto));
    }

    @GetMapping("/{orderCode}")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderByCode(@PathVariable("orderCode") String orderCode) {
        OrderDto orderDto = orderService.getOrderByCode(orderCode);
        return ResponseEntity.ok(ApiResponse.ok(orderDto));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<ApiResponse<List<OrderDto>>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        List<OrderDto> list = orderService.getOrdersByUser(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
