package com.suvidha.backend.review.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record ReviewRequest(
    String bookingId,
    @NotBlank String professionalId,
    @NotBlank String professionalName,
    @Min(1) @Max(5) int rating,
    String comment
) {
}
