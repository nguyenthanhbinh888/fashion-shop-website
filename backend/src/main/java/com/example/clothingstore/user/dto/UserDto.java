package com.example.clothingstore.user.dto;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String role;
    private String avatarUrl;


    public UserDto() {
    }

    public UserDto(Long id, String fullName, String email, String phone, String role, String avatarUrl) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.avatarUrl = avatarUrl;
    }

}
