package com.suvidha.backend.professional;

import com.suvidha.backend.auth.User;
import com.suvidha.backend.professional.dto.ProfessionalRequest;
import com.suvidha.backend.professional.dto.ProfessionalResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/professionals")
public class ProfessionalController {

    private final ProfessionalRepository professionalRepository;

    public ProfessionalController(ProfessionalRepository professionalRepository) {
        this.professionalRepository = professionalRepository;
    }

    @GetMapping
    public List<ProfessionalResponse> getProfessionals(@RequestParam(required = false) String q,
                                                       @RequestParam(required = false) String category) {
        List<Professional> professionals = q == null || q.isBlank()
            ? professionalRepository.findAll()
            : professionalRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(q, q);

        return professionals.stream()
            .filter(pro -> category == null || category.isBlank() || pro.getCategory().equalsIgnoreCase(category))
            .map(ProfessionalResponse::from)
            .toList();
    }

    @GetMapping("/{id}")
    public ProfessionalResponse getProfessional(@PathVariable UUID id) {
        return professionalRepository.findById(id)
            .map(ProfessionalResponse::from)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Professional not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProfessionalResponse saveProfessional(@AuthenticationPrincipal User user,
                                                 @Valid @RequestBody ProfessionalRequest request) {
        String email = user != null ? user.getEmail() : request.email();
        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }

        Professional professional = professionalRepository.findByEmailIgnoreCase(email)
            .orElseGet(Professional::new);

        applyRequest(professional, request, user, email);
        return ProfessionalResponse.from(professionalRepository.save(professional));
    }

    @PutMapping("/{id}")
    public ProfessionalResponse updateProfessional(@PathVariable UUID id,
                                                   @AuthenticationPrincipal User user,
                                                   @Valid @RequestBody ProfessionalRequest request) {
        Professional professional = professionalRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Professional not found"));

        if (user != null && professional.getEmail() != null && !professional.getEmail().equalsIgnoreCase(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can update only your profile");
        }

        String email = user != null ? user.getEmail() : professional.getEmail();
        applyRequest(professional, request, user, email);
        return ProfessionalResponse.from(professionalRepository.save(professional));
    }

    private void applyRequest(Professional professional, ProfessionalRequest request, User user, String email) {
        if (user != null) {
            professional.setUserId(user.getId());
        }
        professional.setEmail(email);
        professional.setName(request.name().trim());
        professional.setCategory(request.category().trim());
        professional.setLocation(request.location().trim());
        professional.setBio(request.bio() == null ? "" : request.bio().trim());
        professional.setExperience(request.experience() == null ? 0 : request.experience());
        professional.setPrice(request.price() == null ? 0 : request.price());
        professional.setRating(request.rating() == null ? 0 : request.rating());
        professional.setAvailable(request.available() == null || request.available());
        professional.setAvailableTimes(request.availableTimes());
    }
}
