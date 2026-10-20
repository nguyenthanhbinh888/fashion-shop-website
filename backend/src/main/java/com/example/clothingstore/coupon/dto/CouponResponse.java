package com.example.clothingstore.coupon.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class CouponResponse {
    private String code;
    private String discountType;
    private BigDecimal discountValue;
    private BigDecimal discountAmount;
    private BigDecimal newTotal;


    public CouponResponse() {
    }

    public CouponResponse(String code, String discountType, BigDecimal discountValue, BigDecimal discountAmount, BigDecimal newTotal) {
        this.code = code;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.discountAmount = discountAmount;
        this.newTotal = newTotal;
    }

}
