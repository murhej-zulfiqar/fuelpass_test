package com.ucig.fuelpass.services;

import com.ucig.fuelpass.exceptions.NotFoundException;
import com.ucig.fuelpass.models.User;
import com.ucig.fuelpass.requests.LoginRequest;
import com.ucig.fuelpass.repositories.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * A service to authenticate user
 * I didn't add the signup functionality because I assumed the user should be added by another platform or manually using another dashboard
 */
@Service
public class AuthenticationService {
    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepo userRepo,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.username(),
                        loginRequest.password()
                )
        );

        return userRepo.findByUsername(loginRequest.username())
                .orElseThrow(() -> new NotFoundException("Wrong username or password"));
    }
}
