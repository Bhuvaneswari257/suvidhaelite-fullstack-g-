package com.suvidha.backend.notification.dto;

import jakarta.validation.constraints.NotBlank;

public record NotificationRequest(
    @NotBlank String message,
    String type
) {
}
