package com.suvidha.backend.notification.dto;

import com.suvidha.backend.notification.Notification;

public record NotificationResponse(
    String id,
    String message,
    String type,
    boolean isRead,
    String createdAt
) {
    public static NotificationResponse from(Notification notification) {
        return new NotificationResponse(
            notification.getId().toString(),
            notification.getMessage(),
            notification.getType(),
            notification.isRead(),
            notification.getCreatedAt().toString()
        );
    }
}
