package com.eha.forumservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateReplyRequest(
    @NotBlank @Size(min = 10, max = 5000) String content
) {}
