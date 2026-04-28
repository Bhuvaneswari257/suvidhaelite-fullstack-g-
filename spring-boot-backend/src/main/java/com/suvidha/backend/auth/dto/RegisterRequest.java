package com.suvidha.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank @Email String email,
    @NotBlank @Size(min = 6, max = 100) String password,
    @NotBlank @Size(max = 120) String name,
    @Size(max = 500) String address,
    @NotBlank String role
) {
}
