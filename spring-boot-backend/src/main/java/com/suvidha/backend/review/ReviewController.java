package com.suvidha.backend.review;

import com.suvidha.backend.auth.User;
import com.suvidha.backend.review.dto.ReviewRequest;
import com.suvidha.backend.review.dto.ReviewResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public List<ReviewResponse> getReviews(@RequestParam(required = false) String professionalId) {
        List<Review> reviews = professionalId == null || professionalId.isBlank()
            ? reviewRepository.findAll()
            : reviewRepository.findByProfessionalIdOrProfessionalName(professionalId, professionalId);
        return reviews.stream().map(ReviewResponse::from).toList();
    }

    @PostMapping
    public ReviewResponse addReview(@AuthenticationPrincipal User user,
                                    @Valid @RequestBody ReviewRequest request) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }
        Review review = new Review();
        applyRequest(review, request);
        review.setCustomerEmail(user.getEmail());
        review.setCustomerName(user.getName());
        return ReviewResponse.from(reviewRepository.save(review));
    }

    @PutMapping("/{id}")
    public ReviewResponse updateReview(@PathVariable UUID id,
                                       @AuthenticationPrincipal User user,
                                       @Valid @RequestBody ReviewRequest request) {
        Review review = findOwnedReview(id, user);
        applyRequest(review, request);
        return ReviewResponse.from(reviewRepository.save(review));
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        Review review = findOwnedReview(id, user);
        reviewRepository.delete(review);
    }

    private Review findOwnedReview(UUID id, User user) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
        if (!review.getCustomerEmail().equalsIgnoreCase(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can update only your review");
        }
        return review;
    }

    private void applyRequest(Review review, ReviewRequest request) {
        review.setBookingId(request.bookingId());
        review.setProfessionalId(request.professionalId());
        review.setProfessionalName(request.professionalName());
        review.setRating(request.rating());
        review.setComment(request.comment() == null ? "" : request.comment());
    }
}
