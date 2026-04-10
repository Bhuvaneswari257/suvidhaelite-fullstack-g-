package com.suvidha.backend.auth.dto;

import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @Size(max = 120) String name,
    @Size(max = 500) String address
) {
}
