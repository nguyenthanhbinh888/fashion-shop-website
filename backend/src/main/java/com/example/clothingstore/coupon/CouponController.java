package com.example.clothingstore.coupon;

import com.example.clothingstore.common.ApiResponse;
import com.example.clothingstore.coupon.dto.ApplyCouponRequest;
import com.example.clothingstore.coupon.dto.CouponResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/coupons")
public class CouponController {

    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }


    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<CouponResponse>> applyCoupon(@Valid @RequestBody ApplyCouponRequest request) {
        CouponResponse response = couponService.validateAndApplyCoupon(request);
        return ResponseEntity.ok(ApiResponse.ok("Áp dụng mã giảm giá thành công", response));
    }
}
