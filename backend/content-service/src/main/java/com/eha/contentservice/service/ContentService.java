package com.eha.contentservice.service;

import com.eha.contentservice.dto.response.ContentDetailResponse;
import com.eha.contentservice.dto.response.ContentSummaryResponse;
import com.eha.contentservice.model.Content;
import com.eha.contentservice.repository.ContentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {

    private final ContentRepository repository;

    public ContentService(ContentRepository repository) {
        this.repository = repository;
    }

    public Page<ContentSummaryResponse> listContents(Pageable pageable) {
        return repository.findByStatus("PUBLISHED", pageable)
            .map(this::toSummary);
    }

    public ContentDetailResponse getContent(Long id) {
        Content content = repository.findById(id)
            .orElseThrow(() -> new IllegalStateException("Content not found"));
        return toDetail(content);
    }

    private ContentSummaryResponse toSummary(Content content) {
        return new ContentSummaryResponse(
            content.getId(),
            content.getTitle(),
            content.getSummary(),
            content.getImageUrl(),
            content.getCategory().getSlug(),
            content.getReadTime(),
            content.getViews(),
            content.getCreatedAt()
        );
    }

    private ContentDetailResponse toDetail(Content content) {
        return new ContentDetailResponse(
            content.getId(),
            content.getTitle(),
            content.getContent(),
            content.getSummary(),
            content.getImageUrl(),
            content.getCategory().getSlug(),
            List.of(),
            content.getReadTime(),
            content.getViews(),
            content.getCreatedAt()
        );
    }
}
