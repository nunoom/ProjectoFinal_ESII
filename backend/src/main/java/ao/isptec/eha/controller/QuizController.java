package ao.isptec.eha.controller;

import ao.isptec.eha.dto.QuizDtos.*;
import ao.isptec.eha.model.User;
import ao.isptec.eha.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public QuizListResponse list(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @AuthenticationPrincipal User user) {
        return quizService.list(category, difficulty, user);
    }

    @GetMapping("/history")
    public QuizHistoryResponse history(@AuthenticationPrincipal User user) {
        return quizService.history(user);
    }

    @GetMapping("/{id}")
    public QuizDetailDto detail(@PathVariable Long id) {
        return quizService.detail(id);
    }

    @PostMapping("/{id}/submit")
    public SubmitQuizResponse submit(@PathVariable Long id,
                                     @Valid @RequestBody SubmitQuizRequest request,
                                     @AuthenticationPrincipal User user) {
        return quizService.submit(id, request, user);
    }
}
