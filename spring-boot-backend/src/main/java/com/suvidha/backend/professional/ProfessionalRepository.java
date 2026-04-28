package com.suvidha.backend.professional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfessionalRepository extends JpaRepository<Professional, UUID> {
    Optional<Professional> findByEmailIgnoreCase(String email);

    List<Professional> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String name, String category);
}
