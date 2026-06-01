package com.eha.userservice.controller;

import com.eha.userservice.dto.request.UpdateProfileRequest;
import com.eha.userservice.dto.response.ApiResponse;
import com.eha.userservice.dto.response.UserProfileResponse;
import com.eha.userservice.service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService service;

    public UserProfileController(UserProfileService service) {
        this.service = service;
    }

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> me(@RequestHeader("X-User-Id") Long userId) {
        return ApiResponse.success(service.getProfile(userId), "OK");
    }

    @PutMapping("/me")
    public ApiResponse<UserProfileResponse> update(@RequestHeader("X-User-Id") Long userId,
                                                   @Valid @RequestBody UpdateProfileRequest request) {
        return ApiResponse.success(service.updateProfile(userId, request), "OK");
    }
}
