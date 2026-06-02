package com.eha.gamificationservice.controller;

import com.eha.gamificationservice.dto.response.ApiResponse;
import com.eha.gamificationservice.dto.response.UserBadgeResponse;
import com.eha.gamificationservice.service.GamificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gamification")
public class GamificationController {

    private final GamificationService service;

    public GamificationController(GamificationService service) {
        this.service = service;
    }

    @GetMapping("/me/badges")
    public ApiResponse<List<UserBadgeResponse>> me(@RequestHeader("X-User-Id") Long userId) {
        return ApiResponse.success(service.getUserBadges(userId), "OK");
    }

    @GetMapping("/user/{userId}/badges")
    public ApiResponse<List<UserBadgeResponse>> userBadges(@PathVariable Long userId) {
        return ApiResponse.success(service.getUserBadges(userId), "OK");
    }
}
