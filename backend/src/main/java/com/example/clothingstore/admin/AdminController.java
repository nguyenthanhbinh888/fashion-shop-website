package com.example.clothingstore.admin;

import com.example.clothingstore.admin.dto.DashboardStatsDto;
import com.example.clothingstore.common.ApiResponse;
import com.example.clothingstore.common.PagedResponse;
import com.example.clothingstore.coupon.Coupon;
import com.example.clothingstore.order.OrderService;
import com.example.clothingstore.order.dto.OrderDto;
import com.example.clothingstore.product.ProductService;
import com.example.clothingstore.product.dto.CreateProductRequest;
import com.example.clothingstore.product.dto.ProductDetailDto;
import com.example.clothingstore.product.dto.ProductListDto;
import com.example.clothingstore.user.dto.UserDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;
    private final OrderService orderService;
    private final ProductService productService;

    public AdminController(AdminService adminService, OrderService orderService, ProductService productService) {
        this.adminService = adminService;
        this.orderService = orderService;
        this.productService = productService;
    }


    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getDashboardStats()));
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<PagedResponse<OrderDto>>> getOrders(
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.ok(orderService.getAllOrders(status, page, size)));
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<ApiResponse<OrderDto>> updateOrderStatus(
            @PathVariable("orderId") Long orderId,
            @RequestBody UpdateStatusDto request) {
        OrderDto updated = orderService.updateOrderStatus(orderId, request.getStatus());
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái đơn hàng thành công", updated));
    }

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<PagedResponse<ProductListDto>>> getProducts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size) {
        PagedResponse<ProductListDto> response = productService.getProducts(
                null, null, null, null, null, null, "newest", page, size);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/products")
    public ResponseEntity<ApiResponse<ProductDetailDto>> createProduct(@Valid @RequestBody CreateProductRequest request) {
        ProductDetailDto created = productService.createProduct(request);
        return ResponseEntity.ok(ApiResponse.ok("Tạo sản phẩm mới thành công", created));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDto>>> getUsers() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllUsers()));
    }

    @GetMapping("/coupons")
    public ResponseEntity<ApiResponse<List<Coupon>>> getCoupons() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllCoupons()));
    }

    @PostMapping("/coupons")
    public ResponseEntity<ApiResponse<Coupon>> createCoupon(@RequestBody Coupon coupon) {
        return ResponseEntity.ok(ApiResponse.ok("Tạo mã giảm giá thành công", adminService.createCoupon(coupon)));
    }

    public static class UpdateStatusDto {
        private String status;

        public UpdateStatusDto() {
        }

        public UpdateStatusDto(String status) {
            this.status = status;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
