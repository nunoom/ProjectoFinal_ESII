package ao.isptec.eha.controller;

import ao.isptec.eha.dto.ContentDtos.*;
import ao.isptec.eha.service.ContentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contents")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public ContentPageResponse list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "recent") String sort) {
        return contentService.list(page, size, category, search, sort);
    }

    @GetMapping("/{id}")
    public ContentDetailDto detail(@PathVariable Long id) {
        return contentService.detail(id);
    }
}
