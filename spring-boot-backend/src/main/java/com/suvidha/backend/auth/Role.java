package com.suvidha.backend.auth;

public enum Role {
    USER,
    PROFESSIONAL,
    ADMIN,
    SUPPORT;

    public String toFrontendValue() {
        return name().toLowerCase();
    }

    public static Role fromValue(String value) {
        return Role.valueOf(value.trim().toUpperCase());
    }
}
