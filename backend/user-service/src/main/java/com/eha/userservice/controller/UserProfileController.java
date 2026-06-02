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

    @PostMapping("/internal/create")
    public ApiResponse<UserProfileResponse> createInternal(@RequestBody java.util.Map<String, Object> request) {
        Long id = Long.valueOf(request.get("id").toString());
        String name = (String) request.get("name");
        String email = (String) request.get("email");
        String birthDateStr = (String) request.get("birthDate");
        return ApiResponse.success(service.createProfile(id, name, email, birthDateStr), "Profile Created");
    }

    @PostMapping("/internal/{id}/points/add")
    public ApiResponse<UserProfileResponse> addPointsInternal(@PathVariable Long id, @RequestParam int points) {
        return ApiResponse.success(service.addPoints(id, points), "Points Added");
    }

    @GetMapping("/internal/profile/{id}")
    public UserProfileResponse getProfileInternal(@PathVariable Long id) {
        return service.getProfile(id);
    }

    @GetMapping("/internal/all")
    public java.util.List<UserProfileResponse> getAllProfilesInternal() {
        return service.getAllProfiles();
    }
}
