package com.suvidha.backend.auth;

import com.suvidha.backend.auth.dto.AuthResponse;
import com.suvidha.backend.auth.dto.LoginRequest;
import com.suvidha.backend.auth.dto.RefreshTokenRequest;
import com.suvidha.backend.auth.dto.RegisterRequest;
import com.suvidha.backend.auth.dto.SwitchRoleRequest;
import com.suvidha.backend.auth.dto.UpdateProfileRequest;
import com.suvidha.backend.auth.dto.UserResponse;
import com.suvidha.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.EnumSet;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final long refreshExpiration;

    public AuthService(UserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService,
                       @Value("${app.jwt.refresh-expiration}") long refreshExpiration) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshExpiration = refreshExpiration;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        userRepository.findByEmailIgnoreCase(request.email()).ifPresent(existing -> {
            throw new ResponseStatusException(CONFLICT, "User already exists with this email");
        });

        Role requestedRole = parseRole(request.role());

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setAddress(request.address() != null ? request.address().trim() : null);
        user.setRole(requestedRole);
        user.setRoles(EnumSet.of(requestedRole));
        user.setVerified(true);

        userRepository.save(user);
        return buildAuthResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        User user = userRepository.findByEmailIgnoreCase(request.email())
            .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Invalid credentials"));
        return buildAuthResponse(user);
    }

    @Transactional
    public AuthResponse refresh(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.refreshToken())
            .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Invalid refresh token"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new ResponseStatusException(UNAUTHORIZED, "Refresh token expired");
        }

        return buildAuthResponse(refreshToken.getUser());
    }

    @Transactional(readOnly = true)
    public UserResponse currentUser(User user) {
        return UserResponse.from(user);
    }

    @Transactional
    public UserResponse updateProfile(User user, UpdateProfileRequest request) {
        if (request.name() != null && !request.name().isBlank()) {
            user.setName(request.name().trim());
        }
        if (request.address() != null) {
            user.setAddress(request.address().trim());
        }
        userRepository.save(user);
        return UserResponse.from(user);
    }

    @Transactional
    public UserResponse switchRole(User user, SwitchRoleRequest request) {
        Role role = parseRole(request.role());
        if (!user.getRoles().contains(role) && role == Role.USER && user.getRoles().contains(Role.PROFESSIONAL)) {
            user.getRoles().add(role);
        }
        if (!user.getRoles().contains(role)) {
            throw new ResponseStatusException(BAD_REQUEST, "This account does not have that role");
        }
        user.setRole(role);
        userRepository.save(user);
        return UserResponse.from(user);
    }

    @Transactional
    public void logout(User user, String refreshToken) {
        if (refreshToken != null && !refreshToken.isBlank()) {
            refreshTokenRepository.findByToken(refreshToken).ifPresent(refreshTokenRepository::delete);
            return;
        }
        refreshTokenRepository.deleteByUser(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String accessToken = jwtService.generateToken(
            user.getEmail(),
            Map.of(
                "role", user.getRole().toFrontendValue(),
                "roles", user.getRoles().stream().map(Role::toFrontendValue).sorted().toList(),
                "userId", user.getId().toString()
            )
        );

        refreshTokenRepository.deleteByUser(user);
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshExpiration));
        refreshTokenRepository.save(refreshToken);

        return new AuthResponse(accessToken, refreshToken.getToken(), UserResponse.from(user));
    }

    private Role parseRole(String role) {
        try {
            return Role.fromValue(role);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid role");
        }
    }
}
