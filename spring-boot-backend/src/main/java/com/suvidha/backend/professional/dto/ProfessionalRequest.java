package com.suvidha.backend.professional.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record ProfessionalRequest(
    String email,
    @NotBlank String name,
    @NotBlank String category,
    @NotBlank String location,
    String bio,
    Integer experience,
    Double price,
    Double rating,
    Boolean available,
    List<String> availableTimes
) {
}
