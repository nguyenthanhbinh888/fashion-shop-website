package com.example.clothingstore.user.dto;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class AuthResponse {
    private String token;
    @Builder.Default
    private String type = "Bearer";
    private UserDto user;


    public AuthResponse() {
    }

    public AuthResponse(String token, String type, UserDto user) {
        this.token = token;
        this.type = type;
        this.user = user;
    }

}
