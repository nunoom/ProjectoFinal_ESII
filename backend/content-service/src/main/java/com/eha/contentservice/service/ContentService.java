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
    private final com.eha.contentservice.repository.CategoryRepository categoryRepository;

    public ContentService(ContentRepository repository, com.eha.contentservice.repository.CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
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

    public ContentDetailResponse createContent(java.util.Map<String, Object> req) {
        String title = (String) req.get("title");
        String summary = (String) req.get("summary");
        String text = (String) req.get("content");
        String imageUrl = (String) req.get("imageUrl");
        String categorySlug = (String) req.get("category");
        Integer readTime = req.get("readTime") != null ? Integer.valueOf(req.get("readTime").toString()) : 5;

        com.eha.contentservice.model.Category category = categoryRepository.findBySlug(categorySlug)
            .orElseThrow(() -> new IllegalStateException("Category not found"));

        Content content = new Content();
        content.setTitle(title);
        content.setSummary(summary);
        content.setContent(text);
        content.setImageUrl(imageUrl);
        content.setCategory(category);
        content.setReadTime(readTime);
        content.setViews(0);
        content.setStatus("PUBLISHED");

        Content saved = repository.save(content);
        return toDetail(saved);
    }
}
