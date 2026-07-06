package com.eha.backofficeservice.service;

import com.eha.backofficeservice.model.AuditLog;
import com.eha.backofficeservice.repository.AuditLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.List;

@Service
@Transactional
public class BackofficeService {

    private final AuditLogRepository auditLogRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public BackofficeService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public Object getAllUsers(Long adminId) {
        logAction(adminId, "LIST_USERS", "USER", null, "Listed all users");
        try {
            return restTemplate.getForObject("http://user-service:8082/api/users/internal/all", Object.class);
        } catch (Exception e) {
            System.err.println("Failed to fetch users from user-service: " + e.getMessage());
            return Map.of("users", List.of());
        }
    }

    public void updateUserRole(Long adminId, Long userId, String role) {
        logAction(adminId, "UPDATE_ROLE", "USER", userId, "Updated role to: " + role);
        try {
            restTemplate.put(
                "http://auth-service:8081/api/auth/internal/role?userId=" + userId + "&role=" + role,
                null
            );
        } catch (Exception e) {
            System.err.println("Failed to update user role in auth-service: " + e.getMessage());
        }
    }

    public Object createContent(Long adminId, Map<String, Object> request) {
        Object response = null;
        try {
            response = restTemplate.postForObject(
                "http://content-service:8083/api/contents/internal/create",
                request,
                Object.class
            );
            
            Long entityId = null;
            if (response instanceof Map) {
                Map<?, ?> map = (Map<?, ?>) response;
                Object dataObj = map.get("data");
                if (dataObj instanceof Map) {
                    Object idVal = ((Map<?, ?>) dataObj).get("id");
                    if (idVal != null) {
                        entityId = Long.valueOf(idVal.toString());
                    }
                }
            }

            logAction(adminId, "CREATE_CONTENT", "CONTENT", entityId, "Created content: " + request.get("title"));
        } catch (Exception e) {
            System.err.println("Failed to create content in content-service: " + e.getMessage());
        }
        return response;
    }

    public Object createQuiz(Long adminId, Map<String, Object> request) {
        Object response = null;
        try {
            response = restTemplate.postForObject(
                "http://quiz-service:8084/api/quizzes/internal/create",
                request,
                Object.class
            );

            Long entityId = null;
            if (response instanceof Map) {
                Map<?, ?> map = (Map<?, ?>) response;
                Object idVal = map.get("id");
                if (idVal != null) {
                    entityId = Long.valueOf(idVal.toString());
                }
            }

            logAction(adminId, "CREATE_QUIZ", "QUIZ", entityId, "Created quiz: " + request.get("title"));
        } catch (Exception e) {
            System.err.println("Failed to create quiz in quiz-service: " + e.getMessage());
        }
        return response;
    }

    private void logAction(Long adminId, String action, String entityType, Long entityId, String details) {
        AuditLog log = new AuditLog();
        log.setUserId(adminId);
        log.setAction(action);
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setDetails(details);
        auditLogRepository.save(log);
    }
}
