package com.suvidha.backend.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record BookingRequest(
    @NotNull UUID professionalId,
    @NotBlank String professionalEmail,
    @NotBlank String professionalName,
    @NotBlank String service,
    Double price,
    @NotBlank String date,
    @NotBlank String time,
    @NotBlank String paymentType,
    String customerName,
    String customerAddress,
    String status,
    String paymentStatus
) {
}
