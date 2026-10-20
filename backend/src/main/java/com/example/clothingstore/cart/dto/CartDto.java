package com.example.clothingstore.cart.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CartDto {
    private Long id;
    private List<CartItemDto> items;
    private int totalItems;
    private BigDecimal subtotal;


    public CartDto() {
    }

    public CartDto(Long id, List<CartItemDto> items, int totalItems, BigDecimal subtotal) {
        this.id = id;
        this.items = items;
        this.totalItems = totalItems;
        this.subtotal = subtotal;
    }

}
