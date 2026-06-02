package com.eha.userservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @NotBlank @Size(min = 3, max = 100) String name,
    @Size(max = 500) String bio
) {}
