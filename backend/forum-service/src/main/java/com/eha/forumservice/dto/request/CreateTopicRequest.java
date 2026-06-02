package com.eha.forumservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateTopicRequest(
    @NotBlank @Size(min = 10, max = 200) String title,
    @NotBlank @Size(min = 20, max = 10000) String content,
    @NotBlank String category
) {}
