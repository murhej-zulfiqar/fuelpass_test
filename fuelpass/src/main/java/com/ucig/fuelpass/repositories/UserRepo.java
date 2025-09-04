package com.ucig.fuelpass.repositories;

import com.ucig.fuelpass.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepo extends CrudRepository<User, UUID> {
    Optional<User> findByUsername(String username);
}
