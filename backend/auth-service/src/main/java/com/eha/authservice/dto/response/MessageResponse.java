package com.eha.authservice.dto.response;

public class MessageResponse {
    private String message;
    private Long id;

    public MessageResponse(String message) {
        this.message = message;
    }

    public MessageResponse(String message, Long id) {
        this.message = message;
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }
}
