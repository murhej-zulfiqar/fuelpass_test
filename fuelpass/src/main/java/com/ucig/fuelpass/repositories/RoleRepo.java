package com.ucig.fuelpass.repositories;

import com.ucig.fuelpass.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepo extends JpaRepository<Role, UUID> {
}
