package com.suvidha.backend.professional.dto;

import com.suvidha.backend.professional.Professional;

import java.util.List;
import java.util.UUID;

public record ProfessionalResponse(
    UUID id,
    UUID userId,
    String email,
    String name,
    String category,
    String location,
    String bio,
    int experience,
    double price,
    double rating,
    boolean available,
    String availability,
    List<String> availableTimes
) {
    public static ProfessionalResponse from(Professional professional) {
        return new ProfessionalResponse(
            professional.getId(),
            professional.getUserId(),
            professional.getEmail(),
            professional.getName(),
            professional.getCategory(),
            professional.getLocation(),
            professional.getBio(),
            professional.getExperience(),
            professional.getPrice(),
            professional.getRating(),
            professional.isAvailable(),
            professional.isAvailable() ? "Available" : "Unavailable",
            professional.getAvailableTimes()
        );
    }
}
