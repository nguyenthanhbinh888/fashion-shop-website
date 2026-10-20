package com.example.clothingstore.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderCode(String orderCode);

    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE (:status IS NULL OR o.orderStatus = :status) ORDER BY o.createdAt DESC")
    Page<Order> findByOrderStatus(@Param("status") String status, Pageable pageable);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.orderStatus NOT IN ('CANCELLED')")
    BigDecimal calculateTotalRevenue();

    long countByOrderStatus(String orderStatus);
}
