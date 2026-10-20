package com.example.clothingstore.cart;

import com.example.clothingstore.cart.dto.*;
import com.example.clothingstore.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<CartDto>> getCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(name = "sessionId", required = false) String sessionId) {
        String email = userDetails != null ? userDetails.getUsername() : null;
        return ResponseEntity.ok(ApiResponse.ok(cartService.getCartDto(email, sessionId)));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartDto>> addItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AddToCartRequest request) {
        String email = userDetails != null ? userDetails.getUsername() : null;
        CartDto cartDto = cartService.addItem(email, request);
        return ResponseEntity.ok(ApiResponse.ok("Đã thêm sản phẩm vào túi", cartDto));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartDto>> updateItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("itemId") Long itemId,
            @RequestParam(name = "sessionId", required = false) String sessionId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        String email = userDetails != null ? userDetails.getUsername() : null;
        CartDto cartDto = cartService.updateItem(email, sessionId, itemId, request);
        return ResponseEntity.ok(ApiResponse.ok("Đã cập nhật số lượng", cartDto));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartDto>> removeItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("itemId") Long itemId,
            @RequestParam(name = "sessionId", required = false) String sessionId) {
        String email = userDetails != null ? userDetails.getUsername() : null;
        CartDto cartDto = cartService.removeItem(email, sessionId, itemId);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa sản phẩm khỏi túi", cartDto));
    }
}
