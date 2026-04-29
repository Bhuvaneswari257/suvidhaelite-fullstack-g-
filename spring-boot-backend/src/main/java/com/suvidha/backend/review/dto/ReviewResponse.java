package com.suvidha.backend.review.dto;

import com.suvidha.backend.review.Review;

public record ReviewResponse(
    String id,
    String bookingId,
    String customerEmail,
    String customerName,
    String professionalId,
    String professionalName,
    int rating,
    String comment,
    String date
) {
    public static ReviewResponse from(Review review) {
        return new ReviewResponse(
            review.getId().toString(),
            review.getBookingId(),
            review.getCustomerEmail(),
            review.getCustomerName(),
            review.getProfessionalId(),
            review.getProfessionalName(),
            review.getRating(),
            review.getComment(),
            review.getDate().toString()
        );
    }
}
