package com.Medic.Medic.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Medic.Medic.Entity.Order;
import com.Medic.Medic.Entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}