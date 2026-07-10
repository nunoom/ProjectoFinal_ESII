package com.eha.notificationservice.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.mail.from-name}")
    private String fromName;

    @Value("${app.url.frontend}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendVerificationEmail(String toEmail, String userName, String token) {
        try {
            String verificationUrl = frontendUrl + "/verify-email?token=" + token;
            
            Context context = new Context();
            context.setVariable("userName", userName);
            context.setVariable("verificationUrl", verificationUrl);
            context.setVariable("frontendUrl", frontendUrl);
            
            String htmlContent = templateEngine.process("email-verification", context);
            
            sendHtmlEmail(toEmail, "Verifique seu email - EHA", htmlContent);
            
            log.info("Verification email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Error sending verification email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    @Async
    public void sendPasswordResetEmail(String toEmail, String userName, String token) {
        try {
            String resetUrl = frontendUrl + "/reset-password?token=" + token;
            
            Context context = new Context();
            context.setVariable("userName", userName);
            context.setVariable("resetUrl", resetUrl);
            context.setVariable("frontendUrl", frontendUrl);
            
            String htmlContent = templateEngine.process("password-reset", context);
            
            sendHtmlEmail(toEmail, "Redefinir sua senha - EHA", htmlContent);
            
            log.info("Password reset email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Error sending password reset email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    @Async
    public void sendWelcomeEmail(String toEmail, String userName) {
        try {
            Context context = new Context();
            context.setVariable("userName", userName);
            context.setVariable("frontendUrl", frontendUrl);
            
            String htmlContent = templateEngine.process("welcome-email", context);
            
            sendHtmlEmail(toEmail, "Bem-vindo ao EHA! 🎉", htmlContent);
            
            log.info("Welcome email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Error sending welcome email to: {}", toEmail, e);
        }
    }

    @Async
    public void sendCustomEmail(String toEmail, String subject, String templateName, Map<String, Object> variables) {
        try {
            Context context = new Context();
            context.setVariable("frontendUrl", frontendUrl);
            variables.forEach(context::setVariable);
            
            String htmlContent = templateEngine.process(templateName, context);
            
            sendHtmlEmail(toEmail, subject, htmlContent);
            
            log.info("Custom email sent to: {} with template: {}", toEmail, templateName);
        } catch (Exception e) {
            log.error("Error sending custom email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send custom email", e);
        }
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom(fromEmail, fromName);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
}
