package com.suvidha.backend.support;

import com.suvidha.backend.auth.Role;
import com.suvidha.backend.auth.User;
import com.suvidha.backend.support.dto.SupportTicketRequest;
import com.suvidha.backend.support.dto.SupportTicketResponse;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/support/tickets")
public class SupportTicketController {

    private final SupportTicketRepository supportTicketRepository;

    public SupportTicketController(SupportTicketRepository supportTicketRepository) {
        this.supportTicketRepository = supportTicketRepository;
    }

    @GetMapping
    public List<SupportTicketResponse> getTickets(@AuthenticationPrincipal User user,
                                                  @RequestParam(defaultValue = "false") boolean all,
                                                  @RequestParam(required = false) String type) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }
        boolean supportUser = user.getRoles().contains(Role.SUPPORT) || user.getRoles().contains(Role.ADMIN);
        List<SupportTicket> tickets;
        if (type != null && !type.isBlank() && supportUser) {
            tickets = supportTicketRepository.findByTypeIgnoreCase(type);
        } else if (all && supportUser) {
            tickets = supportTicketRepository.findAll();
        } else {
            tickets = supportTicketRepository.findByUserEmailIgnoreCase(user.getEmail());
        }
        return tickets.stream().map(SupportTicketResponse::from).toList();
    }

    @GetMapping("/{id}")
    public SupportTicketResponse getTicket(@AuthenticationPrincipal User user, @PathVariable UUID id) {
        return SupportTicketResponse.from(findVisibleTicket(user, id));
    }

    @PostMapping
    public SupportTicketResponse createTicket(@AuthenticationPrincipal User user,
                                              @Valid @RequestBody SupportTicketRequest request) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }
        SupportTicket ticket = new SupportTicket();
        ticket.setUserEmail(user.getEmail());
        applyRequest(ticket, request);
        return SupportTicketResponse.from(supportTicketRepository.save(ticket));
    }

    @PutMapping("/{id}")
    public SupportTicketResponse updateTicket(@AuthenticationPrincipal User user,
                                              @PathVariable UUID id,
                                              @RequestBody SupportTicketRequest request) {
        SupportTicket ticket = findVisibleTicket(user, id);
        applyRequest(ticket, request);
        return SupportTicketResponse.from(supportTicketRepository.save(ticket));
    }

    @PutMapping("/{id}/resolve")
    public SupportTicketResponse resolveTicket(@AuthenticationPrincipal User user,
                                               @PathVariable UUID id,
                                               @RequestBody ResolutionRequest request) {
        requireSupport(user);
        SupportTicket ticket = supportTicketRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        ticket.setStatus("Resolved");
        ticket.setResolution(request.resolution());
        return SupportTicketResponse.from(supportTicketRepository.save(ticket));
    }

    @PutMapping("/{id}/close")
    public SupportTicketResponse closeTicket(@AuthenticationPrincipal User user, @PathVariable UUID id) {
        SupportTicket ticket = findVisibleTicket(user, id);
        ticket.setStatus("Closed");
        return SupportTicketResponse.from(supportTicketRepository.save(ticket));
    }

    private SupportTicket findVisibleTicket(User user, UUID id) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }
        SupportTicket ticket = supportTicketRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        boolean supportUser = user.getRoles().contains(Role.SUPPORT) || user.getRoles().contains(Role.ADMIN);
        if (!supportUser && !ticket.getUserEmail().equalsIgnoreCase(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot access this ticket");
        }
        return ticket;
    }

    private void requireSupport(User user) {
        if (user == null || (!user.getRoles().contains(Role.SUPPORT) && !user.getRoles().contains(Role.ADMIN))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Support access required");
        }
    }

    private void applyRequest(SupportTicket ticket, SupportTicketRequest request) {
        if (request.title() != null) ticket.setTitle(request.title());
        if (request.description() != null) ticket.setDescription(request.description());
        if (request.type() != null) ticket.setType(request.type());
        if (request.status() != null) ticket.setStatus(request.status());
        if (request.resolution() != null) ticket.setResolution(request.resolution());
    }

    public record ResolutionRequest(String resolution) {
    }
}
