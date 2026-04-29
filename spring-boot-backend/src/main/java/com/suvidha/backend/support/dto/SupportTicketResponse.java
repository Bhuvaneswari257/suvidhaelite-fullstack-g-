package com.suvidha.backend.support.dto;

import com.suvidha.backend.support.SupportTicket;

public record SupportTicketResponse(
    String id,
    String userEmail,
    String title,
    String description,
    String type,
    String status,
    String resolution,
    String date
) {
    public static SupportTicketResponse from(SupportTicket ticket) {
        return new SupportTicketResponse(
            ticket.getId().toString(),
            ticket.getUserEmail(),
            ticket.getTitle(),
            ticket.getDescription(),
            ticket.getType(),
            ticket.getStatus(),
            ticket.getResolution(),
            ticket.getDate()
        );
    }
}
