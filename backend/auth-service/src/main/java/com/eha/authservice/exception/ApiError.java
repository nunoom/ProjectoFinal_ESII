package com.eha.authservice.exception;

import java.time.Instant;
import java.util.List;

public record ApiError(String code, String message, List<String> details, String timestamp) {
    public static ApiError of(String code, String message, List<String> details) {
        return new ApiError(code, message, details, Instant.now().toString());
    }
}
