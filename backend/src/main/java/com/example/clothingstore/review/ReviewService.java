package com.example.clothingstore.review;

import com.example.clothingstore.common.ResourceNotFoundException;
import com.example.clothingstore.product.Product;
import com.example.clothingstore.product.ProductRepository;
import com.example.clothingstore.review.dto.CreateReviewRequest;
import com.example.clothingstore.review.dto.ReviewDto;
import com.example.clothingstore.user.User;
import com.example.clothingstore.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }


    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream()
                .map(r -> ReviewDto.builder()
                        .id(r.getId())
                        .userName(r.getUser() != null ? r.getUser().getFullName() : "Khách hàng ẩn danh")
                        .userAvatar(r.getUser() != null ? r.getUser().getAvatarUrl() : null)
                        .rating(r.getRating())
                        .comment(r.getComment())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto addReview(String email, Long productId, CreateReviewRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm không tồn tại: " + productId));

        Review review = Review.builder()
                .product(product)
                .user(user)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        review = reviewRepository.save(review);

        return ReviewDto.builder()
                .id(review.getId())
                .userName(user.getFullName())
                .userAvatar(user.getAvatarUrl())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
