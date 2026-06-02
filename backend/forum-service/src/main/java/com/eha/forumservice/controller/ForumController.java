package com.eha.forumservice.controller;

import com.eha.forumservice.dto.request.CreateReplyRequest;
import com.eha.forumservice.dto.request.CreateTopicRequest;
import com.eha.forumservice.dto.response.*;
import com.eha.forumservice.service.ForumService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forum")
public class ForumController {

    private final ForumService service;

    public ForumController(ForumService service) {
        this.service = service;
    }

    @GetMapping("/topics")
    public ApiResponse<Page<TopicSummaryResponse>> getTopics(
            @RequestParam(required = false) String category,
            Pageable pageable) {
        return ApiResponse.success(service.getTopics(category, pageable), "OK");
    }

    @GetMapping("/topics/{id}")
    public ApiResponse<TopicDetailResponse> getTopicDetail(@PathVariable Long id) {
        return ApiResponse.success(service.getTopicDetail(id), "OK");
    }

    @PostMapping("/topics")
    public ApiResponse<TopicSummaryResponse> createTopic(
            @RequestHeader("X-User-Id") Long authorId,
            @RequestBody @Valid CreateTopicRequest request) {
        return ApiResponse.success(service.createTopic(authorId, request), "OK");
    }

    @PostMapping("/topics/{id}/replies")
    public ApiResponse<ReplyResponse> createReply(
            @RequestHeader("X-User-Id") Long authorId,
            @PathVariable Long id,
            @RequestBody @Valid CreateReplyRequest request) {
        return ApiResponse.success(service.createReply(authorId, id, request), "OK");
    }

    @DeleteMapping("/posts/{id}")
    public ApiResponse<String> deletePost(
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role,
            @PathVariable Long id) {
        service.deletePost(userId, id, role);
        return ApiResponse.success("Post deleted", "OK");
    }
}
