package com.suvidha.backend.booking.dto;

import com.suvidha.backend.booking.Booking;

import java.util.UUID;

public record BookingResponse(
    UUID id,
    String customerEmail,
    String customerName,
    String customerAddress,
    UUID professionalId,
    String professionalEmail,
    String professionalName,
    String service,
    double price,
    String date,
    String time,
    String paymentType,
    String status,
    String paymentStatus
) {
    public static BookingResponse from(Booking booking) {
        return new BookingResponse(
            booking.getId(),
            booking.getCustomerEmail(),
            booking.getCustomerName(),
            booking.getCustomerAddress(),
            booking.getProfessionalId(),
            booking.getProfessionalEmail(),
            booking.getProfessionalName(),
            booking.getService(),
            booking.getPrice(),
            booking.getDate(),
            booking.getTime(),
            booking.getPaymentType(),
            booking.getStatus(),
            booking.getPaymentStatus()
        );
    }
}
