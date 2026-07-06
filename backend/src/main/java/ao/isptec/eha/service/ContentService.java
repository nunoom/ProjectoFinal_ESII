package ao.isptec.eha.service;

import ao.isptec.eha.dto.ContentDtos.*;
import ao.isptec.eha.exception.ApiExceptions.NotFoundException;
import ao.isptec.eha.model.Content;
import ao.isptec.eha.repository.ContentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContentService {

    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @Transactional(readOnly = true)
    public ContentPageResponse list(int page, int size, String category, String search, String sort) {
        Sort sortOrder = switch (sort == null ? "recent" : sort) {
            case "popular" -> Sort.by(Sort.Direction.DESC, "views");
            case "alphabetical" -> Sort.by(Sort.Direction.ASC, "title");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };

        Specification<Content> spec = (root, query, cb) -> cb.conjunction();
        if (category != null && !category.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("category")), category.toLowerCase()));
        }
        if (search != null && !search.isBlank()) {
            String pattern = "%" + search.toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("title")), pattern),
                    cb.like(cb.lower(root.get("summary")), pattern)));
        }

        Page<Content> result = contentRepository.findAll(spec, PageRequest.of(page, size, sortOrder));
        return new ContentPageResponse(
                result.getContent().stream().map(ContentSummaryDto::from).toList(),
                result.getTotalElements(), result.getTotalPages(), result.getNumber());
    }

    @Transactional
    public ContentDetailDto detail(Long id) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Conteúdo não encontrado"));
        content.setViews(content.getViews() + 1);
        return ContentDetailDto.from(content);
    }
}
