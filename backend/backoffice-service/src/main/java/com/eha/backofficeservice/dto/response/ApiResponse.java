package com.eha.backofficeservice.dto.response;

import java.time.Instant;

public record ApiResponse<T>(boolean success, T data, String message, String timestamp) {
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, data, message, Instant.now().toString());
    }
}
