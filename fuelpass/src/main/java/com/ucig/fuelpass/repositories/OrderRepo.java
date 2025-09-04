package com.ucig.fuelpass.repositories;

import com.ucig.fuelpass.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderRepo extends JpaRepository<Order, UUID> {
}
