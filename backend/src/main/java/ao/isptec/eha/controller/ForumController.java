package ao.isptec.eha.controller;

import ao.isptec.eha.dto.ForumDtos.*;
import ao.isptec.eha.model.User;
import ao.isptec.eha.service.ForumService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forum")
public class ForumController {

    private final ForumService forumService;

    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    @GetMapping("/topics")
    public TopicListResponse listTopics(@RequestParam(required = false) String category) {
        return forumService.listTopics(category);
    }

    @PostMapping("/topics")
    public ResponseEntity<CreateTopicResponse> createTopic(@Valid @RequestBody CreateTopicRequest request,
                                                           @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(forumService.createTopic(request, user));
    }

    @GetMapping("/topics/{id}")
    public TopicDetailDto topicDetail(@PathVariable Long id) {
        return forumService.topicDetail(id);
    }

    @PostMapping("/topics/{id}/replies")
    public ResponseEntity<CreateReplyResponse> createReply(@PathVariable Long id,
                                                           @Valid @RequestBody CreateReplyRequest request,
                                                           @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(forumService.createReply(id, request, user));
    }
}
