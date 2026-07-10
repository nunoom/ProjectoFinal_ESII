# 📧 Guia de Configuração do Serviço de Email

**Data**: 1 de junho de 2026  
**Status**: ✅ Implementado e Pronto

---

## 🎯 O Que Foi Implementado

Sistema completo de entrega de emails com suporte para:
- ✅ Verificação de email
- ✅ Recuperação de senha
- ✅ Email de boas-vindas
- ✅ Templates HTML responsivos
- ✅ Envio assíncrono (não bloqueia a aplicação)
- ✅ Suporte para múltiplos provedores de email

---

## 📁 Arquivos Criados

### Backend (Java/Spring Boot)

```
notification-service/
├── src/main/java/com/eha/notificationservice/
│   ├── config/
│   │   └── AsyncConfig.java                    ✅ NOVO
│   ├── controller/
│   │   └── EmailController.java                ✅ NOVO
│   ├── dto/request/
│   │   ├── EmailVerificationRequest.java       ✅ NOVO
│   │   └── PasswordResetRequest.java           ✅ NOVO
│   └── service/
│       └── EmailService.java                    ✅ NOVO
├── src/main/resources/
│   ├── templates/
│   │   ├── email-verification.html             ✅ NOVO
│   │   ├── password-reset.html                 ✅ NOVO
│   │   └── welcome-email.html                  ✅ NOVO
│   └── application.yml                          ✅ ATUALIZADO
├── pom.xml                                      ✅ ATUALIZADO
├── .env.example                                 ✅ NOVO
└── EMAIL_SETUP_GUIDE.md                         ✅ NOVO (este arquivo)
```

**Total**: 10 arquivos novos + 2 atualizados

---

## 🚀 Como Configurar

### Opção 1: Gmail (Recomendado para Desenvolvimento)

#### Passo 1: Configurar Gmail

1. Acesse sua conta Google
2. Ative a **Verificação em 2 etapas**:
   - Vá para: https://myaccount.google.com/security
   - Clique em "Verificação em duas etapas"
   - Siga as instruções

3. Crie uma **Senha de App**:
   - Vá para: https://myaccount.google.com/apppasswords
   - Selecione "Aplicativo": Correio
   - Selecione "Dispositivo": Outro (nome personalizado)
   - Digite: "EHA Backend"
   - Clique em "Gerar"
   - **Copie a senha de 16 caracteres** (sem espaços)

#### Passo 2: Configurar Variáveis de Ambiente

Crie ou edite o arquivo `.env` no diretório `notification-service`:

```env
# Email Configuration (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu-email@gmail.com
MAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Senha de App de 16 caracteres
MAIL_FROM=noreply@eha.ao
MAIL_FROM_NAME=EHA - Economia com História Angola

# Application URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8080
```

---

### Opção 2: Outlook/Hotmail

```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USERNAME=seu-email@outlook.com
MAIL_PASSWORD=sua-senha
MAIL_FROM=noreply@eha.ao
MAIL_FROM_NAME=EHA - Economia com História Angola
```

---

### Opção 3: SendGrid (Produção Recomendado)

#### Passo 1: Criar Conta SendGrid
1. Acesse: https://sendgrid.com
2. Crie uma conta gratuita (100 emails/dia)
3. Verifique seu email

#### Passo 2: Criar API Key
1. Vá para: Settings → API Keys
2. Clique em "Create API Key"
3. Nome: "EHA Backend"
4. Permissões: "Full Access" ou "Mail Send"
5. Copie a API Key

#### Passo 3: Configurar
```env
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=SG.xxxxxxxxxxxxxxxxxxxxxx  # Sua API Key
MAIL_FROM=noreply@eha.ao
MAIL_FROM_NAME=EHA - Economia com História Angola
```

---

### Opção 4: Amazon SES (Produção - Alta Escala)

```env
MAIL_HOST=email-smtp.us-east-1.amazonaws.com
MAIL_PORT=587
MAIL_USERNAME=seu-ses-smtp-username
MAIL_PASSWORD=sua-ses-smtp-password
MAIL_FROM=noreply@eha.ao
MAIL_FROM_NAME=EHA - Economia com História Angola
```

**Nota**: Requer configuração na AWS Console e verificação de domínio.

---

## 📝 Dependências Adicionadas

No `pom.xml`, foram adicionadas:

```xml
<!-- Email Support -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

<!-- HTML Templates -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

---

## 🔌 API Endpoints

### 1. Enviar Email de Verificação

```http
POST http://localhost:8087/api/emails/verification
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "userName": "João Silva",
  "token": "abc123xyz789"
}
```

**Resposta**:
```json
{
  "success": true,
  "message": "Verification email sent successfully",
  "data": null
}
```

---

### 2. Enviar Email de Recuperação de Senha

```http
POST http://localhost:8087/api/emails/password-reset
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "userName": "João Silva",
  "token": "xyz789abc123"
}
```

**Resposta**:
```json
{
  "success": true,
  "message": "Password reset email sent successfully",
  "data": null
}
```

---

### 3. Enviar Email de Boas-Vindas

```http
POST http://localhost:8087/api/emails/welcome
    ?email=usuario@exemplo.com
    &userName=João Silva
```

**Resposta**:
```json
{
  "success": true,
  "message": "Welcome email sent successfully",
  "data": null
}
```

---

## 🎨 Templates de Email

### 1. **email-verification.html**
- Design moderno com gradiente Bordeaux
- Botão de verificação destacado
- Informações de segurança (expira em 24h)
- Link alternativo caso o botão não funcione
- Responsivo para mobile

### 2. **password-reset.html**
- Avisos de segurança destacados
- Botão de redefinição
- Informações sobre expiração (1 hora)
- Dicas de segurança
- Responsivo para mobile

### 3. **welcome-email.html**
- Mensagem de boas-vindas
- Features da plataforma (4 cards)
- Botão para aceder à plataforma
- Dicas para começar
- Responsivo para mobile

**Design Comum**:
- Header com logo EHA e gradiente
- Cores: Bordeaux (#8B0000)
- Tipografia moderna
- Footer com links
- Totalmente responsivo

---

## 🧪 Como Testar

### 1. Testar Localmente

#### Opção A: curl
```bash
curl -X POST http://localhost:8087/api/emails/verification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu-email@gmail.com",
    "userName": "Seu Nome",
    "token": "test-token-123"
  }'
```

#### Opção B: Postman / Insomnia
1. Crie uma requisição POST
2. URL: `http://localhost:8087/api/emails/verification`
3. Body (JSON):
```json
{
  "email": "seu-email@gmail.com",
  "userName": "Seu Nome",
  "token": "test-token-123"
}
```

---

### 2. Verificar Email Recebido

1. Verifique sua caixa de entrada
2. Se não encontrar, verifique SPAM
3. Abra o email
4. Verifique:
   - ✅ Design aparece corretamente
   - ✅ Botão funciona (abre link)
   - ✅ Links alternativos funcionam
   - ✅ Responsivo no mobile

---

### 3. Testar em Produção

Altere as URLs no `.env`:

```env
FRONTEND_URL=https://eha.ao
BACKEND_URL=https://api.eha.ao
```

---

## 🔧 Integração com Auth Service

Para integrar com o `auth-service`, adicione chamadas ao notification-service:

### Exemplo: Ao Registar Usuário

```java
// No auth-service, após criar usuário
@Autowired
private RestTemplate restTemplate;

public void registerUser(RegisterRequest request) {
    // 1. Criar usuário
    User user = createUser(request);
    
    // 2. Gerar token de verificação
    String token = generateVerificationToken(user);
    
    // 3. Enviar email de verificação
    EmailVerificationRequest emailRequest = new EmailVerificationRequest();
    emailRequest.setEmail(user.getEmail());
    emailRequest.setUserName(user.getName());
    emailRequest.setToken(token);
    
    restTemplate.postForEntity(
        "http://notification-service:8087/api/emails/verification",
        emailRequest,
        ApiResponse.class
    );
}
```

### Exemplo: Recuperação de Senha

```java
public void requestPasswordReset(String email) {
    // 1. Buscar usuário
    User user = findByEmail(email);
    
    // 2. Gerar token de reset
    String token = generateResetToken(user);
    
    // 3. Enviar email de reset
    PasswordResetRequest emailRequest = new PasswordResetRequest();
    emailRequest.setEmail(user.getEmail());
    emailRequest.setUserName(user.getName());
    emailRequest.setToken(token);
    
    restTemplate.postForEntity(
        "http://notification-service:8087/api/emails/password-reset",
        emailRequest,
        ApiResponse.class
    );
}
```

---

## 🐛 Troubleshooting

### Erro: "Authentication failed"

**Causa**: Senha incorreta ou 2FA não configurado  
**Solução**:
- Gmail: Certifique-se de usar **Senha de App**, não a senha normal
- Verifique se a Verificação em 2 etapas está ativada
- Copie a senha sem espaços

---

### Erro: "Connection timeout"

**Causa**: Firewall bloqueando porta 587  
**Solução**:
- Tente porta 465 (SSL) em vez de 587 (TLS)
- Verifique firewall/antivírus
- Teste com outro provedor

---

### Email não chega

**Possíveis causas**:
1. Email está na pasta SPAM
2. Endereço de destino inválido
3. Provedor bloqueou o envio
4. Limite de envios atingido (Gmail: 500/dia)

**Soluções**:
- Verifique logs do backend
- Teste com email diferente
- Use SendGrid para produção

---

### Email chega sem formatação

**Causa**: Cliente de email não suporta HTML  
**Solução**: O template já é responsivo, mas alguns clientes antigos podem não renderizar CSS inline. Use SendGrid que converte automaticamente.

---

## 📊 Limites por Provedor

| Provedor | Limite Gratuito | Custo Adicional |
|----------|-----------------|-----------------|
| Gmail | 500 emails/dia | N/A (uso pessoal) |
| Outlook | 300 emails/dia | N/A |
| SendGrid | 100 emails/dia | $0.0000085/email |
| Mailgun | 5,000 emails/mês | $0.0008/email |
| Amazon SES | 62,000 emails/mês* | $0.10/1,000 emails |

*Se hospedado na AWS

---

## 🚀 Deploy em Produção

### 1. Configure Variáveis de Ambiente

**Docker Compose**:
```yaml
notification-service:
  environment:
    - MAIL_HOST=smtp.sendgrid.net
    - MAIL_PORT=587
    - MAIL_USERNAME=apikey
    - MAIL_PASSWORD=${SENDGRID_API_KEY}
    - MAIL_FROM=noreply@eha.ao
    - MAIL_FROM_NAME=EHA
    - FRONTEND_URL=https://eha.ao
    - BACKEND_URL=https://api.eha.ao
```

**Kubernetes**:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: email-secrets
type: Opaque
data:
  mail-password: <base64-encoded-password>
```

---

### 2. Verificar Domínio (Produção)

Para evitar emails irem para SPAM:

1. **Configure SPF Record**:
```
TXT @ "v=spf1 include:_spf.google.com ~all"
```

2. **Configure DKIM** (SendGrid faz automaticamente)

3. **Configure DMARC**:
```
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@eha.ao"
```

---

## ✅ Checklist Final

### Desenvolvimento
- [ ] Configurar variáveis de ambiente
- [ ] Testar envio de email de verificação
- [ ] Testar envio de email de reset
- [ ] Testar email de boas-vindas
- [ ] Verificar emails chegam corretamente
- [ ] Testar links nos emails
- [ ] Verificar responsividade no mobile

### Produção
- [ ] Escolher provedor de email (SendGrid recomendado)
- [ ] Configurar domínio (SPF, DKIM, DMARC)
- [ ] Configurar variáveis de ambiente de produção
- [ ] Testar em staging
- [ ] Monitorar taxa de entrega
- [ ] Configurar alertas de falha

---

## 📚 Recursos Úteis

- [Spring Boot Mail](https://docs.spring.io/spring-boot/docs/current/reference/html/io.html#io.email)
- [Thymeleaf](https://www.thymeleaf.org/documentation.html)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Email HTML Best Practices](https://www.campaignmonitor.com/css/)

---

## 🎉 Conclusão

**O serviço de email está completo e pronto para usar!**

✅ **Configuração**: 5 minutos (Gmail) ou 15 minutos (SendGrid)  
✅ **Templates**: 3 templates HTML profissionais  
✅ **API**: 3 endpoints prontos  
✅ **Integração**: Fácil com auth-service  
✅ **Produção**: Pronto para deploy  

**Próximo passo**: Configure suas credenciais de email e teste! 📧✨

---

**Desenvolvido por**: Kiro AI  
**Data**: 1 de junho de 2026  
**Status**: ✅ Implementado e Documentado

