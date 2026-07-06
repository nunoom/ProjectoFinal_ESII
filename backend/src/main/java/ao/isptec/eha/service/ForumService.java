package ao.isptec.eha.service;

import ao.isptec.eha.dto.CommonDtos.AuthorDto;
import ao.isptec.eha.dto.ForumDtos.*;
import ao.isptec.eha.exception.ApiExceptions.NotFoundException;
import ao.isptec.eha.model.ForumReply;
import ao.isptec.eha.model.ForumTopic;
import ao.isptec.eha.model.User;
import ao.isptec.eha.repository.ForumReplyRepository;
import ao.isptec.eha.repository.ForumTopicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class ForumService {

    private final ForumTopicRepository topicRepository;
    private final ForumReplyRepository replyRepository;

    public ForumService(ForumTopicRepository topicRepository, ForumReplyRepository replyRepository) {
        this.topicRepository = topicRepository;
        this.replyRepository = replyRepository;
    }

    @Transactional(readOnly = true)
    public TopicListResponse listTopics(String category) {
        List<ForumTopic> topics = (category == null || category.isBlank())
                ? topicRepository.findAllByOrderByCreatedAtDesc()
                : topicRepository.findByCategoryOrderByCreatedAtDesc(category);
        return new TopicListResponse(topics.stream()
                .map(t -> new TopicSummaryDto(t.getId(), t.getTitle(), t.getCategory(),
                        AuthorDto.from(t.getAuthor()), replyRepository.countByTopicId(t.getId()),
                        t.getViews(), t.getLastReplyAt(), t.getCreatedAt()))
                .toList());
    }

    @Transactional
    public CreateTopicResponse createTopic(CreateTopicRequest request, User author) {
        ForumTopic topic = new ForumTopic();
        topic.setTitle(request.title());
        topic.setContent(request.content());
        topic.setCategory(request.category());
        topic.setAuthor(author);
        topic = topicRepository.save(topic);
        return new CreateTopicResponse(topic.getId(), "Tópico criado com sucesso");
    }

    @Transactional
    public TopicDetailDto topicDetail(Long id) {
        ForumTopic topic = topicRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tópico não encontrado"));
        topic.setViews(topic.getViews() + 1);
        List<ReplyDto> replies = replyRepository.findByTopicIdOrderByCreatedAtAsc(id).stream()
                .map(r -> new ReplyDto(r.getId(), r.getContent(), AuthorDto.from(r.getAuthor()),
                        r.getLikes(), r.getCreatedAt()))
                .toList();
        return new TopicDetailDto(topic.getId(), topic.getTitle(), topic.getContent(),
                topic.getCategory(), AuthorDto.from(topic.getAuthor()), topic.getViews(),
                topic.getCreatedAt(), replies);
    }

    @Transactional
    public CreateReplyResponse createReply(Long topicId, CreateReplyRequest request, User author) {
        ForumTopic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new NotFoundException("Tópico não encontrado"));
        ForumReply reply = new ForumReply();
        reply.setTopic(topic);
        reply.setAuthor(author);
        reply.setContent(request.content());
        reply = replyRepository.save(reply);
        topic.setLastReplyAt(Instant.now());
        return new CreateReplyResponse(reply.getId(), "Resposta publicada com sucesso");
    }
}
