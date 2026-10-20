package com.example.clothingstore.review;

import com.example.clothingstore.common.ApiResponse;
import com.example.clothingstore.review.dto.CreateReviewRequest;
import com.example.clothingstore.review.dto.ReviewDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products/{productId}/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getReviews(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(ApiResponse.ok(reviewService.getReviewsByProduct(productId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewDto>> addReview(
            @PathVariable("productId") Long productId,
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateReviewRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Vui lòng đăng nhập để gửi nhận xét"));
        }
        ReviewDto dto = reviewService.addReview(userDetails.getUsername(), productId, request);
        return ResponseEntity.ok(ApiResponse.ok("Cảm ơn bạn đã gửi đánh giá!", dto));
    }
}
