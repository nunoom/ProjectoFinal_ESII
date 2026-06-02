package com.eha.notificationservice.service;

import com.eha.notificationservice.model.Notification;
import com.eha.notificationservice.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<Notification> getNotifications(Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(Long id, Long userId) {
        Notification notification = repository.findById(id)
            .orElseThrow(() -> new IllegalStateException("Notification not found"));
        if (!notification.getUserId().equals(userId)) {
            throw new IllegalStateException("Unauthorized access to notification");
        }
        notification.setIsRead(true);
        repository.save(notification);
    }

    public Notification createNotification(Long userId, String type, String title, String message, String link) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setType(type);
        n.setTitle(title);
        n.setMessage(message);
        n.setLink(link);
        n.setIsRead(false);
        return repository.save(n);
    }
}
