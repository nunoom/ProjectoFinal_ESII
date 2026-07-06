package com.eha.contentservice.controller;

import com.eha.contentservice.dto.response.ApiResponse;
import com.eha.contentservice.dto.response.ContentDetailResponse;
import com.eha.contentservice.dto.response.ContentSummaryResponse;
import com.eha.contentservice.service.ContentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contents")
public class ContentController {

    private final ContentService service;

    public ContentController(ContentService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<Page<ContentSummaryResponse>> list(Pageable pageable) {
        return ApiResponse.success(service.listContents(pageable), "OK");
    }

    @GetMapping("/{id}")
    public ApiResponse<ContentDetailResponse> detail(@PathVariable Long id) {
        return ApiResponse.success(service.getContent(id), "OK");
    }

    @PostMapping("/internal/create")
    public ApiResponse<ContentDetailResponse> createInternal(@RequestBody java.util.Map<String, Object> req) {
        return ApiResponse.success(service.createContent(req), "OK");
    }
}
