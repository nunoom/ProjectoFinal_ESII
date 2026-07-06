package com.eha.userservice.service;

import com.eha.userservice.dto.request.UpdateProfileRequest;
import com.eha.userservice.dto.response.UserProfileResponse;
import com.eha.userservice.model.UserProfile;
import com.eha.userservice.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import java.util.List;

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

    public List<UserProfileResponse> getAllProfiles() {
        return repository.findAll().stream()
            .map(this::toResponse)
            .toList();
    }

    public UserProfileResponse createProfile(Long id, String name, String email, String birthDateStr) {
        UserProfile profile = new UserProfile();
        profile.setId(id);
        profile.setName(name);
        profile.setEmail(email);
        profile.setBio("");
        profile.setRole("ROLE_STUDENT");
        profile.setPoints(0);
        profile.setLevel(1);
        profile.setStatus("ACTIVE");
        repository.save(profile);
        return toResponse(profile);
    }

    public UserProfileResponse addPoints(Long userId, int pointsToAdd) {
        UserProfile profile = repository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));
        int newPoints = profile.getPoints() + pointsToAdd;
        profile.setPoints(newPoints);
        profile.setLevel(calculateLevel(newPoints));
        repository.save(profile);
        return toResponse(profile);
    }

    private int calculateLevel(int points) {
        int level = 1;
        while (level < 50) {
            int nextLevelPoints = (int) (100 * Math.pow(level, 1.5));
            if (points < nextLevelPoints) {
                break;
            }
            level++;
        }
        return level;
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
