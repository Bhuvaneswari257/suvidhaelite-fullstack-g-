package com.suvidha.backend.auth.dto;

import com.suvidha.backend.auth.Role;
import com.suvidha.backend.auth.User;

import java.util.List;

public record UserResponse(
    String id,
    String name,
    String email,
    String address,
    String role,
    List<String> roles,
    boolean verified
) {
    public static UserResponse from(User user) {
        return new UserResponse(
            user.getId().toString(),
            user.getName(),
            user.getEmail(),
            user.getAddress(),
            user.getRole().toFrontendValue(),
            user.getRoles().stream().map(Role::toFrontendValue).sorted().toList(),
            user.isVerified()
        );
    }
}
