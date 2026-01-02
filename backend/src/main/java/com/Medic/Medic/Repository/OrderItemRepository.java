package com.Medic.Medic.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Medic.Medic.Entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}