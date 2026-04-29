package com.suvidha.backend.support.dto;

import jakarta.validation.constraints.NotBlank;

public record SupportTicketRequest(
    @NotBlank String title,
    String description,
    @NotBlank String type,
    String status,
    String resolution
) {
}
