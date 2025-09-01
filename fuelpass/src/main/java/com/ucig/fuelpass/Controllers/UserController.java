package com.ucig.fuelpass.Controllers;

import com.ucig.fuelpass.Forms.FormGenerator;
import com.ucig.fuelpass.Models.Order;
import com.ucig.fuelpass.Models.User;
import com.ucig.fuelpass.Requests.LoginRequest;
import com.ucig.fuelpass.Responses.LoginResponse;
import com.ucig.fuelpass.services.AuthenticationService;
import com.ucig.fuelpass.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {


    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public UserController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    // todo add full authentication functionality
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){

        User authenticatedUser = authenticationService.authenticate(loginRequest);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);

    }


}
