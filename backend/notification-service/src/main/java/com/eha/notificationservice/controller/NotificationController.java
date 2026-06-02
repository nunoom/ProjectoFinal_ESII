package com.eha.notificationservice.controller;

import com.eha.notificationservice.dto.response.ApiResponse;
import com.eha.notificationservice.model.Notification;
import com.eha.notificationservice.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<Notification>> list(@RequestHeader("X-User-Id") Long userId) {
        return ApiResponse.success(service.getNotifications(userId), "OK");
    }

    @PutMapping("/{id}/read")
    public ApiResponse<String> markAsRead(@RequestHeader("X-User-Id") Long userId, @PathVariable Long id) {
        service.markAsRead(id, userId);
        return ApiResponse.success("Notification marked as read", "OK");
    }

    @PostMapping("/internal")
    public Notification createInternal(@RequestBody Map<String, Object> req) {
        Long userId = Long.valueOf(req.get("userId").toString());
        String type = (String) req.get("type");
        String title = (String) req.get("title");
        String message = (String) req.get("message");
        String link = (String) req.get("link");
        return service.createNotification(userId, type, title, message, link);
    }
}
