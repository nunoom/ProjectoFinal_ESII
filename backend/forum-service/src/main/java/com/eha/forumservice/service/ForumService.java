package com.eha.forumservice.service;

import com.eha.forumservice.dto.request.CreateReplyRequest;
import com.eha.forumservice.dto.request.CreateTopicRequest;
import com.eha.forumservice.dto.response.*;
import com.eha.forumservice.model.*;
import com.eha.forumservice.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ForumService {

    private final ForumTopicRepository topicRepository;
    private final ForumReplyRepository replyRepository;
    private final CategoryRepository categoryRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public ForumService(ForumTopicRepository topicRepository,
                        ForumReplyRepository replyRepository,
                        CategoryRepository categoryRepository) {
        this.topicRepository = topicRepository;
        this.replyRepository = replyRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<TopicSummaryResponse> getTopics(String categorySlug, Pageable pageable) {
        Page<ForumTopic> topics;
        if (categorySlug != null && !categorySlug.isEmpty()) {
            topics = topicRepository.findActiveByCategory(categorySlug, pageable);
        } else {
            topics = topicRepository.findAllActive(pageable);
        }

        return topics.map(this::toSummaryResponse);
    }

    public TopicDetailResponse getTopicDetail(Long topicId) {
        ForumTopic topic = topicRepository.findById(topicId)
            .orElseThrow(() -> new IllegalStateException("Topic not found"));

        if (!"ACTIVE".equals(topic.getStatus())) {
            throw new IllegalStateException("Topic is not active");
        }

        // Increment views
        topic.setViews(topic.getViews() + 1);
        topicRepository.save(topic);

        List<ForumReply> replies = replyRepository.findByTopicIdAndStatusOrderByCreatedAtAsc(topicId, "ACTIVE");
        List<ReplyResponse> replyResponses = replies.stream()
            .map(this::toReplyResponse)
            .toList();

        return new TopicDetailResponse(
            topic.getId(),
            topic.getTitle(),
            topic.getContent(),
            topic.getCategory().getName(),
            fetchAuthor(topic.getAuthorId()),
            topic.getCreatedAt(),
            replyResponses
        );
    }

    public TopicSummaryResponse createTopic(Long authorId, CreateTopicRequest request) {
        Category category = categoryRepository.findBySlug(request.category())
            .orElseThrow(() -> new IllegalStateException("Category not found"));

        ForumTopic topic = new ForumTopic();
        topic.setTitle(request.title());
        topic.setContent(request.content());
        topic.setCategory(category);
        topic.setAuthorId(authorId);
        topic.setViews(0);
        topic.setReplyCount(0);
        topic.setIsPinned(false);
        topic.setIsLocked(false);
        topic.setStatus("ACTIVE");

        ForumTopic saved = topicRepository.save(topic);

        // Credit 2 points in user-service
        try {
            restTemplate.postForObject(
                "http://user-service:8082/api/users/internal/" + authorId + "/points/add?points=2",
                null,
                Object.class
            );
        } catch (Exception e) {
            System.err.println("Failed to award points to user " + authorId + ": " + e.getMessage());
        }

        // Trigger points update in gamification-service
        try {
            restTemplate.postForObject(
                "http://gamification-service:8085/api/ranking/internal/update?userId=" + authorId +
                "&categoryId=" + category.getId() + "&points=2",
                null,
                Object.class
            );
        } catch (Exception e) {
            System.err.println("Failed to update rankings in gamification-service: " + e.getMessage());
        }

        return toSummaryResponse(saved);
    }

    public ReplyResponse createReply(Long authorId, Long topicId, CreateReplyRequest request) {
        ForumTopic topic = topicRepository.findById(topicId)
            .orElseThrow(() -> new IllegalStateException("Topic not found"));

        if (topic.getIsLocked()) {
            throw new IllegalStateException("Topic is locked");
        }

        ForumReply reply = new ForumReply();
        reply.setTopic(topic);
        reply.setAuthorId(authorId);
        reply.setContent(request.content());
        reply.setStatus("ACTIVE");

        ForumReply saved = replyRepository.save(reply);

        // Update topic reply count and last reply timestamp
        topic.setReplyCount(topic.getReplyCount() + 1);
        topic.setLastReplyAt(Instant.now());
        topicRepository.save(topic);

        // Credit 1 point in user-service
        try {
            restTemplate.postForObject(
                "http://user-service:8082/api/users/internal/" + authorId + "/points/add?points=1",
                null,
                Object.class
            );
        } catch (Exception e) {
            System.err.println("Failed to award point to user " + authorId + ": " + e.getMessage());
        }

        // Trigger points update in gamification-service
        try {
            restTemplate.postForObject(
                "http://gamification-service:8085/api/ranking/internal/update?userId=" + authorId +
                "&categoryId=" + topic.getCategory().getId() + "&points=1",
                null,
                Object.class
            );
        } catch (Exception e) {
            System.err.println("Failed to update rankings in gamification-service: " + e.getMessage());
        }

        // Notify author of topic
        if (!topic.getAuthorId().equals(authorId)) {
            try {
                Map<String, Object> notif = Map.of(
                    "userId", topic.getAuthorId(),
                    "type", "FORUM_REPLY",
                    "title", "Nova resposta no fórum!",
                    "message", "O seu tópico '" + topic.getTitle() + "' recebeu uma nova resposta.",
                    "link", "/forum/topics/" + topic.getId()
                );
                restTemplate.postForObject("http://notification-service:8087/api/notifications/internal", notif, Object.class);
            } catch (Exception e) {
                System.err.println("Failed to send forum reply notification: " + e.getMessage());
            }
        }

        return toReplyResponse(saved);
    }

    public void deletePost(Long userId, Long postId, String role) {
        Optional<ForumReply> replyOpt = replyRepository.findById(postId);
        if (replyOpt.isPresent()) {
            ForumReply reply = replyOpt.get();
            if (reply.getAuthorId().equals(userId) || "ROLE_ADMIN".equalsIgnoreCase(role) || "ROLE_MODERATOR".equalsIgnoreCase(role)) {
                reply.setStatus("DELETED");
                replyRepository.save(reply);

                ForumTopic topic = reply.getTopic();
                topic.setReplyCount(Math.max(0, topic.getReplyCount() - 1));
                topicRepository.save(topic);
            } else {
                throw new IllegalStateException("Unauthorized to delete this post");
            }
            return;
        }

        Optional<ForumTopic> topicOpt = topicRepository.findById(postId);
        if (topicOpt.isPresent()) {
            ForumTopic topic = topicOpt.get();
            if (topic.getAuthorId().equals(userId) || "ROLE_ADMIN".equalsIgnoreCase(role) || "ROLE_MODERATOR".equalsIgnoreCase(role)) {
                topic.setStatus("DELETED");
                topicRepository.save(topic);
            } else {
                throw new IllegalStateException("Unauthorized to delete this topic");
            }
            return;
        }

        throw new IllegalStateException("Post not found");
    }

    private TopicSummaryResponse toSummaryResponse(ForumTopic topic) {
        return new TopicSummaryResponse(
            topic.getId(),
            topic.getTitle(),
            topic.getCategory().getName(),
            fetchAuthor(topic.getAuthorId()),
            topic.getReplyCount(),
            topic.getViews(),
            topic.getLastReplyAt(),
            topic.getCreatedAt()
        );
    }

    private ReplyResponse toReplyResponse(ForumReply reply) {
        return new ReplyResponse(
            reply.getId(),
            reply.getContent(),
            fetchAuthor(reply.getAuthorId()),
            reply.getCreatedAt()
        );
    }

    private TopicSummaryResponse.AuthorDto fetchAuthor(Long authorId) {
        String name = "Utilizador " + authorId;
        String photo = null;
        try {
            Map<?, ?> profile = restTemplate.getForObject(
                "http://user-service:8082/api/users/internal/profile/" + authorId,
                Map.class
            );
            if (profile != null) {
                name = (String) profile.get("name");
                photo = (String) profile.get("photoUrl");
            }
        } catch (Exception e) {
            // Ignore Profile Service Fetch Error
        }
        return new TopicSummaryResponse.AuthorDto(authorId, name, photo);
    }
}
