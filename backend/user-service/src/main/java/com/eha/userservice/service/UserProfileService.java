package com.eha.userservice.service;

import com.eha.userservice.dto.request.UpdateProfileRequest;
import com.eha.userservice.dto.response.UserProfileResponse;
import com.eha.userservice.model.UserProfile;
import com.eha.userservice.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {
        this.repository = repository;
    }

    public UserProfileResponse getProfile(Long userId) {
        UserProfile profile = repository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));
        return toResponse(profile);
    }

    public UserProfileResponse updateProfile(Long userId, UpdateProfileRequest request) {
        UserProfile profile = repository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));
        profile.setName(request.name());
        profile.setBio(request.bio());
        repository.save(profile);
        return toResponse(profile);
    }

    private UserProfileResponse toResponse(UserProfile profile) {
        return new UserProfileResponse(
            profile.getId(),
            profile.getName(),
            profile.getEmail(),
            profile.getBio(),
            profile.getPhotoUrl(),
            profile.getPoints(),
            profile.getLevel(),
            profile.getRole(),
            profile.getCreatedAt()
        );
    }
}
