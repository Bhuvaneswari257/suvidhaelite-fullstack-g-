package com.suvidha.backend.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record SwitchRoleRequest(@NotBlank String role) {
}
