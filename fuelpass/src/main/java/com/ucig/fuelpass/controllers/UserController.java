package com.ucig.fuelpass.controllers;

import com.ucig.fuelpass.exceptions.NotFoundException;
import com.ucig.fuelpass.exceptions.UnAuthorizedException;
import com.ucig.fuelpass.models.User;
import com.ucig.fuelpass.requests.LoginRequest;
import com.ucig.fuelpass.responses.ErrorResponse;
import com.ucig.fuelpass.responses.LoginResponse;
import com.ucig.fuelpass.services.AuthenticationService;
import com.ucig.fuelpass.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {


    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public UserController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){

        User authenticatedUser = authenticationService.authenticate(loginRequest);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);

    }
}
