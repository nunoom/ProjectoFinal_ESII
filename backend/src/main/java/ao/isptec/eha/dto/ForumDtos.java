package ao.isptec.eha.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.List;

public final class ForumDtos {

    private ForumDtos() {}

    public record TopicSummaryDto(Long id, String title, String category, CommonDtos.AuthorDto author,
                                  long replyCount, long views, Instant lastReplyAt, Instant createdAt) {}

    public record TopicListResponse(List<TopicSummaryDto> topics) {}

    public record ReplyDto(Long id, String content, CommonDtos.AuthorDto author, int likes,
                           Instant createdAt) {}

    public record TopicDetailDto(Long id, String title, String content, String category,
                                 CommonDtos.AuthorDto author, long views, Instant createdAt,
                                 List<ReplyDto> replies) {}

    public record CreateTopicRequest(
            @NotBlank @Size(min = 5, max = 200) String title,
            @NotBlank @Size(min = 10, max = 4000) String content,
            @NotBlank String category) {}

    public record CreateTopicResponse(Long id, String message) {}

    public record CreateReplyRequest(@NotBlank @Size(min = 3, max = 4000) String content) {}

    public record CreateReplyResponse(Long id, String message) {}
}
