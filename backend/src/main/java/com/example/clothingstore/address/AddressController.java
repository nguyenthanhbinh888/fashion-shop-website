package com.example.clothingstore.address;

import com.example.clothingstore.address.dto.AddressDto;
import com.example.clothingstore.address.dto.AddressRequest;
import com.example.clothingstore.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AddressDto>>> getAddresses(@AuthenticationPrincipal UserDetails userDetails) {
        List<AddressDto> list = addressService.getUserAddresses(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AddressDto>> addAddress(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AddressRequest request) {
        AddressDto dto = addressService.addAddress(userDetails.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.ok("Thêm địa chỉ thành công", dto));
    }

    @PutMapping("/{id}/default")
    public ResponseEntity<ApiResponse<Void>> setDefault(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") Long id) {
        addressService.setDefaultAddress(userDetails.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật địa chỉ mặc định thành công", null));
    }
}
