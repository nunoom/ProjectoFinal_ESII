package com.eha.backofficeservice.controller;

import com.eha.backofficeservice.dto.response.ApiResponse;
import com.eha.backofficeservice.service.BackofficeService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BackofficeService service;

    public AdminController(BackofficeService service) {
        this.service = service;
    }

    @GetMapping("/users")
    public ApiResponse<Object> listUsers(@RequestHeader("X-User-Id") Long adminId) {
        return ApiResponse.success(service.getAllUsers(adminId), "OK");
    }

    @PutMapping("/users/{id}/role")
    public ApiResponse<String> changeRole(
            @RequestHeader("X-User-Id") Long adminId,
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String role = request.get("role");
        service.updateUserRole(adminId, id, role);
        return ApiResponse.success("Role updated successfully", "OK");
    }

    @PostMapping("/contents")
    public ApiResponse<Object> createContent(
            @RequestHeader("X-User-Id") Long adminId,
            @RequestBody Map<String, Object> request) {
        return ApiResponse.success(service.createContent(adminId, request), "OK");
    }

    @PostMapping("/quizzes")
    public ApiResponse<Object> createQuiz(
            @RequestHeader("X-User-Id") Long adminId,
            @RequestBody Map<String, Object> request) {
        return ApiResponse.success(service.createQuiz(adminId, request), "OK");
    }
}
