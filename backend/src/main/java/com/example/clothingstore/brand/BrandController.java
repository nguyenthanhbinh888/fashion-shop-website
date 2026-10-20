package com.example.clothingstore.brand;

import com.example.clothingstore.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<Brand>>> getAllBrands() {
        return ResponseEntity.ok(ApiResponse.ok(brandService.getAllBrands()));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<Brand>> getBrandBySlug(@PathVariable("slug") String slug) {
        return ResponseEntity.ok(ApiResponse.ok(brandService.getBrandBySlug(slug)));
    }
}
