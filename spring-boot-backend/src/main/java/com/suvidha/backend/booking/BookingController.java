package com.suvidha.backend.booking;

import com.suvidha.backend.auth.Role;
import com.suvidha.backend.auth.User;
import com.suvidha.backend.booking.dto.BookingRequest;
import com.suvidha.backend.booking.dto.BookingResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<BookingResponse> getBookings(@AuthenticationPrincipal User user) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }

        List<Booking> bookings = user.getRoles().contains(Role.ADMIN) || user.getRoles().contains(Role.SUPPORT)
            ? bookingRepository.findAll()
            : bookingRepository.findByCustomerEmailIgnoreCaseOrProfessionalEmailIgnoreCase(user.getEmail(), user.getEmail());

        return bookings.stream().map(BookingResponse::from).toList();
    }

    @GetMapping("/{id}")
    public BookingResponse getBooking(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        Booking booking = findBookingForUser(id, user);
        return BookingResponse.from(booking);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse createBooking(@AuthenticationPrincipal User user,
                                         @Valid @RequestBody BookingRequest request) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }

        Booking booking = new Booking();
        booking.setCustomerEmail(user.getEmail());
        booking.setCustomerName(request.customerName() == null || request.customerName().isBlank() ? user.getName() : request.customerName());
        booking.setCustomerAddress(request.customerAddress() == null ? user.getAddress() : request.customerAddress());
        booking.setProfessionalId(request.professionalId());
        booking.setProfessionalEmail(request.professionalEmail());
        booking.setProfessionalName(request.professionalName());
        booking.setService(request.service());
        booking.setPrice(request.price() == null ? 0 : request.price());
        booking.setDate(request.date());
        booking.setTime(request.time());
        booking.setPaymentType(request.paymentType());
        booking.setStatus(request.status() == null || request.status().isBlank() ? "Confirmed" : request.status());
        booking.setPaymentStatus(request.paymentStatus() == null || request.paymentStatus().isBlank() ? "Pending" : request.paymentStatus());

        return BookingResponse.from(bookingRepository.save(booking));
    }

    @PatchMapping("/{id}/status")
    public BookingResponse updateStatus(@PathVariable UUID id,
                                        @AuthenticationPrincipal User user,
                                        @RequestBody StatusUpdateRequest request) {
        Booking booking = findBookingForUser(id, user);
        booking.setStatus(request.status());
        return BookingResponse.from(bookingRepository.save(booking));
    }

    @PatchMapping("/{id}/payment")
    public BookingResponse updatePayment(@PathVariable UUID id,
                                         @AuthenticationPrincipal User user) {
        Booking booking = findBookingForUser(id, user);
        booking.setPaymentStatus("Paid");
        return BookingResponse.from(bookingRepository.save(booking));
    }

    private Booking findBookingForUser(UUID id, User user) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }

        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        boolean ownsBooking = booking.getCustomerEmail().equalsIgnoreCase(user.getEmail())
            || booking.getProfessionalEmail().equalsIgnoreCase(user.getEmail())
            || user.getRoles().contains(Role.ADMIN)
            || user.getRoles().contains(Role.SUPPORT);

        if (!ownsBooking) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot access this booking");
        }

        return booking;
    }

    public record StatusUpdateRequest(String status) {
    }
}
