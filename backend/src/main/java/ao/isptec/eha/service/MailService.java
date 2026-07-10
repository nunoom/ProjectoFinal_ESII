package ao.isptec.eha.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Envio de emails. Com SMTP configurado (spring.mail.host / EHA_SMTP_HOST)
 * envia emails reais; sem SMTP, escreve o conteúdo no log — o código de
 * verificação aparece na consola do backend, útil em desenvolvimento e
 * demonstrações.
 */
@Service
public class MailService {

    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final String from;

    public MailService(ObjectProvider<JavaMailSender> mailSenderProvider,
                       @Value("${eha.mail.from:no-reply@eha.ao}") String from) {
        this.mailSenderProvider = mailSenderProvider;
        this.from = from;
    }

    public void sendVerificationCode(String to, String name, String code) {
        String subject = "EHA — Código de verificação";
        String body = """
                Olá %s,

                O seu código de verificação da plataforma Economia com História: Angola é:

                    %s

                O código é válido durante 24 horas.

                Se não criou esta conta, ignore este email.
                """.formatted(name, code);
        send(to, subject, body, code, "código de verificação");
    }

    public void sendPasswordResetCode(String to, String name, String code) {
        String subject = "EHA — Recuperação de password";
        String body = """
                Olá %s,

                Recebemos um pedido para redefinir a password da sua conta na plataforma
                Economia com História: Angola. Use o seguinte código:

                    %s

                O código é válido durante 1 hora.

                Se não pediu a recuperação da password, ignore este email — a sua conta
                permanece segura.
                """.formatted(name, code);
        send(to, subject, body, code, "código de recuperação");
    }

    private void send(String to, String subject, String body, String code, String descricao) {
        JavaMailSender sender = mailSenderProvider.getIfAvailable();
        if (sender == null) {
            log.info("SMTP não configurado — {} para {}: {}", descricao, to, code);
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            sender.send(message);
            log.info("Email ({}) enviado para {}", descricao, to);
        } catch (Exception e) {
            // Não bloquear a operação por falha de SMTP; o código fica no log
            log.warn("Falha ao enviar email para {} ({}). Código: {}", to, e.getMessage(), code);
        }
    }
}
