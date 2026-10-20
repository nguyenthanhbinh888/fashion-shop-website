package com.example.clothingstore.review.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ReviewDto {
    private Long id;
    private String userName;
    private String userAvatar;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;


    public ReviewDto() {
    }

    public ReviewDto(Long id, String userName, String userAvatar, Integer rating, String comment, LocalDateTime createdAt) {
        this.id = id;
        this.userName = userName;
        this.userAvatar = userAvatar;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

}
