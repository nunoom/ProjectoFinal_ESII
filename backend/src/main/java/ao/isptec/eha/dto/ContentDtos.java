package ao.isptec.eha.dto;

import ao.isptec.eha.model.Content;

import java.time.Instant;
import java.util.List;

public final class ContentDtos {

    private ContentDtos() {}

    public record ContentSummaryDto(Long id, String title, String summary, String imageUrl,
                                    String category, int readTime, long views, Instant createdAt) {
        public static ContentSummaryDto from(Content content) {
            return new ContentSummaryDto(content.getId(), content.getTitle(), content.getSummary(),
                    content.getImageUrl(), content.getCategory(), content.getReadTime(),
                    content.getViews(), content.getCreatedAt());
        }
    }

    public record ContentDetailDto(Long id, String title, String summary, String content,
                                   String imageUrl, String category, int readTime, long views,
                                   Instant createdAt) {
        public static ContentDetailDto from(Content content) {
            return new ContentDetailDto(content.getId(), content.getTitle(), content.getSummary(),
                    content.getBody(), content.getImageUrl(), content.getCategory(),
                    content.getReadTime(), content.getViews(), content.getCreatedAt());
        }
    }

    public record ContentPageResponse(List<ContentSummaryDto> content, long totalElements,
                                      int totalPages, int currentPage) {}
}
