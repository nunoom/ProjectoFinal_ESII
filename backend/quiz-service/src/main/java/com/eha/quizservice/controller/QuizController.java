package com.eha.quizservice.controller;

import com.eha.quizservice.dto.request.SubmitQuizRequest;
import com.eha.quizservice.dto.response.*;
import com.eha.quizservice.model.Quiz;
import com.eha.quizservice.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService service;

    public QuizController(QuizService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<QuizSummaryResponse>> list(
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty) {
        return ApiResponse.success(service.getQuizzes(category, difficulty, userId), "OK");
    }

    @GetMapping("/{id}")
    public ApiResponse<QuizDetailResponse> detail(@PathVariable Long id) {
        return ApiResponse.success(service.getQuiz(id), "OK");
    }

    @PostMapping("/{id}/submit")
    public ApiResponse<SubmitQuizResponse> submit(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody SubmitQuizRequest request) {
        return ApiResponse.success(service.submitQuiz(id, userId, request), "OK");
    }

    @GetMapping("/history")
    public ApiResponse<List<QuizAttemptResponse>> history(@RequestHeader("X-User-Id") Long userId) {
        return ApiResponse.success(service.getAttemptsHistory(userId), "OK");
    }

    @PostMapping("/internal/create")
    public Quiz createInternal(@RequestBody Quiz quiz) {
        return service.saveQuiz(quiz);
    }
}
