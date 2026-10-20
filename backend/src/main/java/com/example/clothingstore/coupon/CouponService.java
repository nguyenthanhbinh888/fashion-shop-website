package com.example.clothingstore.coupon;

import com.example.clothingstore.common.BadRequestException;
import com.example.clothingstore.common.ResourceNotFoundException;
import com.example.clothingstore.coupon.dto.ApplyCouponRequest;
import com.example.clothingstore.coupon.dto.CouponResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
public class CouponService {

    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }


    public CouponResponse validateAndApplyCoupon(ApplyCouponRequest request) {
        Coupon coupon = couponRepository.findByCodeIgnoreCase(request.getCode())
                .orElseThrow(() -> new ResourceNotFoundException("Mã giảm giá '" + request.getCode() + "' không tồn tại"));

        if (!Boolean.TRUE.equals(coupon.getIsActive())) {
            throw new BadRequestException("Mã giảm giá này hiện không còn kích hoạt");
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(coupon.getStartDate()) || now.isAfter(coupon.getEndDate())) {
            throw new BadRequestException("Mã giảm giá đã hết hạn sử dụng");
        }

        if (coupon.getUsageLimit() != null && coupon.getUsedCount() >= coupon.getUsageLimit()) {
            throw new BadRequestException("Mã giảm giá đã hết lượt sử dụng");
        }

        if (coupon.getMinOrderValue() != null && request.getSubtotal().compareTo(coupon.getMinOrderValue()) < 0) {
            throw new BadRequestException("Đơn hàng tối thiểu để áp dụng mã này là " + coupon.getMinOrderValue() + " đ");
        }

        BigDecimal discountAmount;
        if ("PERCENT".equalsIgnoreCase(coupon.getDiscountType())) {
            discountAmount = request.getSubtotal()
                    .multiply(coupon.getDiscountValue())
                    .divide(BigDecimal.valueOf(100), 0, RoundingMode.HALF_UP);

            if (coupon.getMaxDiscountAmount() != null && discountAmount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                discountAmount = coupon.getMaxDiscountAmount();
            }
        } else {
            discountAmount = coupon.getDiscountValue().min(request.getSubtotal());
        }

        BigDecimal newTotal = request.getSubtotal().subtract(discountAmount).max(BigDecimal.ZERO);

        return CouponResponse.builder()
                .code(coupon.getCode())
                .discountType(coupon.getDiscountType())
                .discountValue(coupon.getDiscountValue())
                .discountAmount(discountAmount)
                .newTotal(newTotal)
                .build();
    }
}
