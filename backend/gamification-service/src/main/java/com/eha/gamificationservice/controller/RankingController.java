package com.eha.gamificationservice.controller;

import com.eha.gamificationservice.dto.response.ApiResponse;
import com.eha.gamificationservice.dto.response.RankingResponse;
import com.eha.gamificationservice.service.GamificationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    private final GamificationService service;

    public RankingController(GamificationService service) {
        this.service = service;
    }

    @GetMapping("/global")
    public ApiResponse<RankingResponse> global(@RequestHeader(value = "X-User-Id", required = false) Long userId) {
        return ApiResponse.success(service.getGlobalRankings(userId), "OK");
    }

    @GetMapping("/weekly")
    public ApiResponse<RankingResponse> weekly(@RequestHeader(value = "X-User-Id", required = false) Long userId) {
        // Simple mock of weekly (returning global rankings)
        return ApiResponse.success(service.getGlobalRankings(userId), "OK");
    }

    @GetMapping("/category/{category}")
    public ApiResponse<RankingResponse> category(
            @PathVariable String category,
            @RequestHeader(value = "X-User-Id", required = false) Long userId) {
        return ApiResponse.success(service.getCategoryRankings(category, userId), "OK");
    }

    @PostMapping("/internal/update")
    public void updatePointsInternal(
            @RequestParam Long userId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam int points) {
        service.updatePoints(userId, categoryId, points);
    }
}
