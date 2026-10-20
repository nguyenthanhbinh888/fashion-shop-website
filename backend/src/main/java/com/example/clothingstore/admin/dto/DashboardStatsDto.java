package com.example.clothingstore.admin.dto;

import com.example.clothingstore.order.dto.OrderDto;
import com.example.clothingstore.product.dto.ProductVariantDto;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class DashboardStatsDto {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private long pendingOrders;
    private long totalProducts;
    private long totalCustomers;
    private List<OrderDto> recentOrders;
    private List<ProductVariantDto> lowStockVariants;


    public DashboardStatsDto() {
    }

    public DashboardStatsDto(BigDecimal totalRevenue, long totalOrders, long pendingOrders, long totalProducts, long totalCustomers, List<OrderDto> recentOrders, List<ProductVariantDto> lowStockVariants) {
        this.totalRevenue = totalRevenue;
        this.totalOrders = totalOrders;
        this.pendingOrders = pendingOrders;
        this.totalProducts = totalProducts;
        this.totalCustomers = totalCustomers;
        this.recentOrders = recentOrders;
        this.lowStockVariants = lowStockVariants;
    }

}
