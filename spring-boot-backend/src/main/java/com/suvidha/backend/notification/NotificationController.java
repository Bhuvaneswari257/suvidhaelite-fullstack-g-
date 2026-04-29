package com.suvidha.backend.notification;

import com.suvidha.backend.auth.User;
import com.suvidha.backend.notification.dto.NotificationRequest;
import com.suvidha.backend.notification.dto.NotificationResponse;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<NotificationResponse> getNotifications(@AuthenticationPrincipal User user) {
        requireLogin(user);
        return notificationRepository.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(user.getEmail())
            .stream()
            .map(NotificationResponse::from)
            .toList();
    }

    @PostMapping
    public NotificationResponse createNotification(@AuthenticationPrincipal User user,
                                                   @Valid @RequestBody NotificationRequest request) {
        requireLogin(user);
        Notification notification = new Notification();
        notification.setUserEmail(user.getEmail());
        notification.setMessage(request.message());
        notification.setType(request.type() == null || request.type().isBlank() ? "NOTIFICATION" : request.type());
        return NotificationResponse.from(notificationRepository.save(notification));
    }

    @PutMapping("/{id}/read")
    public NotificationResponse markAsRead(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        Notification notification = findOwnedNotification(id, user);
        notification.setRead(true);
        return NotificationResponse.from(notificationRepository.save(notification));
    }

    @PutMapping("/read-all")
    public List<NotificationResponse> markAllAsRead(@AuthenticationPrincipal User user) {
        requireLogin(user);
        List<Notification> notifications = notificationRepository.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(user.getEmail());
        notifications.forEach(notification -> notification.setRead(true));
        return notificationRepository.saveAll(notifications).stream().map(NotificationResponse::from).toList();
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        Notification notification = findOwnedNotification(id, user);
        notificationRepository.delete(notification);
    }

    private Notification findOwnedNotification(UUID id, User user) {
        requireLogin(user);
        Notification notification = notificationRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found"));
        if (!notification.getUserEmail().equalsIgnoreCase(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot access this notification");
        }
        return notification;
    }

    private void requireLogin(User user) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required");
        }
    }
}
