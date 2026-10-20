package com.example.clothingstore.product;

import com.example.clothingstore.common.ApiResponse;
import com.example.clothingstore.common.PagedResponse;
import com.example.clothingstore.product.dto.ProductDetailDto;
import com.example.clothingstore.product.dto.ProductListDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<ProductListDto>>> getProducts(
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @RequestParam(name = "brandId", required = false) Long brandId,
            @RequestParam(name = "featured", required = false) Boolean featured,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(name = "maxPrice", required = false) BigDecimal maxPrice,
            @RequestParam(name = "sortBy", defaultValue = "newest") String sortBy,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "12") int size) {

        PagedResponse<ProductListDto> response = productService.getProducts(
                categoryId, brandId, featured, keyword, minPrice, maxPrice, sortBy, page, size);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductListDto>>> getFeaturedProducts() {
        return ResponseEntity.ok(ApiResponse.ok(productService.getFeaturedProducts()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDetailDto>> getProductById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getProductById(id)));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<ProductDetailDto>> getProductBySlug(@PathVariable("slug") String slug) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getProductBySlug(slug)));
    }
}
