package com.example.clothingstore.product;

import com.example.clothingstore.brand.Brand;
import com.example.clothingstore.brand.BrandRepository;
import com.example.clothingstore.category.Category;
import com.example.clothingstore.category.CategoryRepository;
import com.example.clothingstore.common.PagedResponse;
import com.example.clothingstore.common.ResourceNotFoundException;
import com.example.clothingstore.product.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final ProductImageRepository imageRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public ProductService(
            ProductRepository productRepository,
            ProductVariantRepository variantRepository,
            ProductImageRepository imageRepository,
            CategoryRepository categoryRepository,
            BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
        this.imageRepository = imageRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
    }

    @Transactional
    public ProductDetailDto createProduct(CreateProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Danh mục không tồn tại: " + request.getCategoryId()));

        Brand brand = null;
        if (request.getBrandId() != null) {
            brand = brandRepository.findById(request.getBrandId()).orElse(null);
        }

        String slug = request.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = slugify(request.getName());
        } else {
            slug = slugify(slug);
        }

        if (productRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        Product product = Product.builder()
                .name(request.getName().trim())
                .slug(slug)
                .description(request.getDescription())
                .material(request.getMaterial())
                .careInstructions(request.getCareInstructions())
                .basePrice(request.getBasePrice())
                .originalPrice(request.getOriginalPrice())
                .category(category)
                .brand(brand)
                .isFeatured(Boolean.TRUE.equals(request.getIsFeatured()))
                .isActive(true)
                .variants(new ArrayList<>())
                .images(new ArrayList<>())
                .build();

        Product savedProduct = productRepository.save(product);

        // Primary Image
        if (request.getPrimaryImageUrl() != null && !request.getPrimaryImageUrl().trim().isEmpty()) {
            ProductImage primaryImg = ProductImage.builder()
                    .product(savedProduct)
                    .imageUrl(request.getPrimaryImageUrl().trim())
                    .colorName("Chính")
                    .isPrimary(true)
                    .displayOrder(0)
                    .build();
            imageRepository.save(primaryImg);
        }

        // Additional Images
        if (request.getAdditionalImages() != null) {
            int order = 1;
            for (String imgUrl : request.getAdditionalImages()) {
                if (imgUrl != null && !imgUrl.trim().isEmpty()) {
                    ProductImage img = ProductImage.builder()
                            .product(savedProduct)
                            .imageUrl(imgUrl.trim())
                            .colorName("Chi tiết")
                            .isPrimary(false)
                            .displayOrder(order++)
                            .build();
                    imageRepository.save(img);
                }
            }
        }

        // Variants
        if (request.getVariants() != null && !request.getVariants().isEmpty()) {
            int vIdx = 1;
            for (CreateProductRequest.VariantRequest vr : request.getVariants()) {
                String sku = vr.getSku();
                if (sku == null || sku.trim().isEmpty()) {
                    sku = "SKU-" + savedProduct.getId() + "-" + (vr.getSize() != null ? vr.getSize() : "STD") + "-" + vIdx++;
                }
                ProductVariant variant = ProductVariant.builder()
                        .product(savedProduct)
                        .sku(sku.toUpperCase())
                        .colorName(vr.getColorName() != null && !vr.getColorName().trim().isEmpty() ? vr.getColorName().trim() : "Màu tiêu chuẩn")
                        .colorCode(vr.getColorCode() != null && !vr.getColorCode().trim().isEmpty() ? vr.getColorCode().trim() : "#000000")
                        .size(vr.getSize() != null && !vr.getSize().trim().isEmpty() ? vr.getSize().trim() : "Freesize")
                        .price(vr.getPrice() != null ? vr.getPrice() : savedProduct.getBasePrice())
                        .stockQuantity(vr.getStockQuantity() != null ? vr.getStockQuantity() : 0)
                        .imageUrl(vr.getImageUrl() != null && !vr.getImageUrl().trim().isEmpty() ? vr.getImageUrl().trim() : request.getPrimaryImageUrl())
                        .isActive(true)
                        .build();
                variantRepository.save(variant);
            }
        } else {
            // Default variant with 30 items
            ProductVariant defaultVariant = ProductVariant.builder()
                    .product(savedProduct)
                    .sku("SKU-" + savedProduct.getId() + "-FREE")
                    .colorName("Tiêu chuẩn")
                    .colorCode("#000000")
                    .size("Freesize")
                    .price(savedProduct.getBasePrice())
                    .stockQuantity(30)
                    .imageUrl(request.getPrimaryImageUrl())
                    .isActive(true)
                    .build();
            variantRepository.save(defaultVariant);
        }

        return mapToDetailDto(savedProduct);
    }

    private String slugify(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "san-pham-" + System.currentTimeMillis();
        }
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String slug = pattern.matcher(normalized).replaceAll("")
                .toLowerCase(Locale.ENGLISH)
                .replaceAll("đ", "d")
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
        return slug.isEmpty() ? "san-pham-" + System.currentTimeMillis() : slug;
    }


    @Transactional(readOnly = true)
    public PagedResponse<ProductListDto> getProducts(
            Long categoryId,
            Long brandId,
            Boolean featured,
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sortBy,
            int page,
            int size) {

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        if ("price_asc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.ASC, "basePrice");
        } else if ("price_desc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "basePrice");
        }

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> productPage = productRepository.searchProducts(
                categoryId, brandId, featured, keyword, minPrice, maxPrice, pageable);

        List<ProductListDto> content = productPage.getContent().stream()
                .map(this::mapToListDto)
                .collect(Collectors.toList());

        return PagedResponse.<ProductListDto>builder()
                .content(content)
                .page(productPage.getNumber())
                .size(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    public List<ProductListDto> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue().stream()
                .map(this::mapToListDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDetailDto getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với slug: " + slug));
        return mapToDetailDto(product);
    }

    @Transactional(readOnly = true)
    public ProductDetailDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với ID: " + id));
        return mapToDetailDto(product);
    }

    public ProductListDto mapToListDto(Product product) {
        List<ProductVariant> variants = variantRepository.findByProductIdAndIsActiveTrue(product.getId());
        List<ProductImage> images = imageRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());

        String primaryImage = images.stream()
                .filter(img -> Boolean.TRUE.equals(img.getIsPrimary()))
                .map(ProductImage::getImageUrl)
                .findFirst()
                .orElse(images.isEmpty() ? (variants.isEmpty() ? "" : variants.get(0).getImageUrl()) : images.get(0).getImageUrl());

        List<String> colors = variants.stream()
                .map(ProductVariant::getColorName)
                .distinct()
                .collect(Collectors.toList());

        List<String> sizes = variants.stream()
                .map(ProductVariant::getSize)
                .distinct()
                .collect(Collectors.toList());

        int totalStock = variants.stream()
                .mapToInt(ProductVariant::getStockQuantity)
                .sum();

        return ProductListDto.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : "")
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .brandName(product.getBrand() != null ? product.getBrand().getName() : "")
                .brandId(product.getBrand() != null ? product.getBrand().getId() : null)
                .basePrice(product.getBasePrice())
                .originalPrice(product.getOriginalPrice())
                .primaryImageUrl(primaryImage)
                .isFeatured(product.getIsFeatured())
                .availableColors(colors)
                .availableSizes(sizes)
                .totalStock(totalStock)
                .build();
    }

    public ProductDetailDto mapToDetailDto(Product product) {
        List<ProductVariant> variants = variantRepository.findByProductIdAndIsActiveTrue(product.getId());
        List<ProductImage> images = imageRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());

        List<ProductVariantDto> variantDtos = variants.stream()
                .map(v -> ProductVariantDto.builder()
                        .id(v.getId())
                        .sku(v.getSku())
                        .colorName(v.getColorName())
                        .colorCode(v.getColorCode())
                        .size(v.getSize())
                        .price(v.getPrice())
                        .stockQuantity(v.getStockQuantity())
                        .imageUrl(v.getImageUrl())
                        .isActive(v.getIsActive())
                        .build())
                .collect(Collectors.toList());

        List<ProductImageDto> imageDtos = images.stream()
                .map(img -> ProductImageDto.builder()
                        .id(img.getId())
                        .imageUrl(img.getImageUrl())
                        .colorName(img.getColorName())
                        .isPrimary(img.getIsPrimary())
                        .displayOrder(img.getDisplayOrder())
                        .build())
                .collect(Collectors.toList());

        return ProductDetailDto.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .material(product.getMaterial())
                .careInstructions(product.getCareInstructions())
                .basePrice(product.getBasePrice())
                .originalPrice(product.getOriginalPrice())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : "")
                .brandId(product.getBrand() != null ? product.getBrand().getId() : null)
                .brandName(product.getBrand() != null ? product.getBrand().getName() : "")
                .isFeatured(product.getIsFeatured())
                .variants(variantDtos)
                .images(imageDtos)
                .build();
    }
}
