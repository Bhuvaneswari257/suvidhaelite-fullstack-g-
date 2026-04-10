package com.suvidha.backend.auth;

import com.suvidha.backend.auth.dto.AuthResponse;
import com.suvidha.backend.auth.dto.LoginRequest;
import com.suvidha.backend.auth.dto.MessageResponse;
import com.suvidha.backend.auth.dto.RefreshTokenRequest;
import com.suvidha.backend.auth.dto.RegisterRequest;
import com.suvidha.backend.auth.dto.SwitchRoleRequest;
import com.suvidha.backend.auth.dto.UpdateProfileRequest;
import com.suvidha.backend.auth.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/refresh-token")
    public AuthResponse refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return authService.refresh(request);
    }

    @GetMapping("/me")
    public UserResponse currentUser(@AuthenticationPrincipal User user) {
        return authService.currentUser(user);
    }

    @PutMapping("/profile")
    public UserResponse updateProfile(@AuthenticationPrincipal User user,
                                      @Valid @RequestBody UpdateProfileRequest request) {
        return authService.updateProfile(user, request);
    }

    @PutMapping("/switch-role")
    public UserResponse switchRole(@AuthenticationPrincipal User user,
                                   @Valid @RequestBody SwitchRoleRequest request) {
        return authService.switchRole(user, request);
    }

    @PostMapping("/logout")
    public MessageResponse logout(@AuthenticationPrincipal User user,
                                  @RequestHeader(value = "X-Refresh-Token", required = false) String refreshToken) {
        authService.logout(user, refreshToken);
        return new MessageResponse("Logged out successfully");
    }

    @PostMapping("/forgot-password")
    public MessageResponse forgotPassword() {
        return new MessageResponse("Password reset email flow is not configured in this demo backend.");
    }

    @PostMapping("/reset-password")
    public MessageResponse resetPassword() {
        return new MessageResponse("Password reset is not configured in this demo backend.");
    }
}
