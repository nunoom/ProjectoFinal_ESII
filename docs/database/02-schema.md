# Schema de Base de Dados

## Diagrama ER (Texto)

```
users ||--o{ user_quiz_attempts : realiza
users ||--o{ forum_topics : cria
users ||--o{ forum_replies : escreve
users ||--o{ user_favorites : tem
users ||--o{ user_badges : conquista

contents ||--o{ user_favorites : favorit ado_por
contents }o--|| categories : pertence_a

quizzes ||--o{ questions : contém
quizzes ||--o{ user_quiz_attempts : tentado_em
quizzes }o--|| categories : pertence_a

questions ||--o{ question_options : tem
questions ||--o{ user_answers : respondida_em

forum_topics }o--|| categories : pertence_a
forum_topics ||--o{ forum_replies : tem

badges ||--o{ user_badges : atribuído_a
```

---

## SQL Schema Completo

```sql
-- ============================================
-- TABELA: users
-- Descrição: Utilizadores da plataforma
-- ============================================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    photo_url VARCHAR(500),
    birth_date DATE,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    email_confirmed BOOLEAN DEFAULT FALSE,
    email_confirmation_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_role CHECK (role IN ('USER', 'MODERATOR', 'ADMIN')),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'BLOCKED', 'DELETED')),
    CONSTRAINT chk_points CHECK (points >= 0),
    CONSTRAINT chk_level CHECK (level >= 1 AND level <= 50)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_points ON users(points DESC);
CREATE INDEX idx_users_status ON users(status);

-- ============================================
-- TABELA: categories
-- Descrição: Categorias de conteúdos
-- ============================================
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir categorias iniciais
INSERT INTO categories (name, slug, description, color) VALUES
('Petróleo', 'petroleo', 'História e economia do petróleo em Angola', '#8B0000'),
('Kwanza', 'kwanza', 'Moeda nacional e reformas monetárias', '#FFD700'),
('Guerra Civil', 'guerra-civil', 'Impacto económico da guerra civil', '#696969'),
('Agricultura', 'agricultura', 'Setor agrícola angolano', '#228B22'),
('Reformas', 'reformas', 'Reformas económicas e políticas', '#4169E1'),
('Comércio', 'comercio', 'Comércio interno e externo', '#FF8C00'),
('Indústria', 'industria', 'Desenvolvimento industrial', '#8B4513'),
('Educação', 'educacao', 'Educação e economia', '#9370DB');

-- ============================================
-- TABELA: contents
-- Descrição: Conteúdos educacionais
-- ============================================
CREATE TABLE contents (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    category_id BIGINT NOT NULL REFERENCES categories(id),
    author_id BIGINT REFERENCES users(id),
    read_time INTEGER, -- em minutos
    views INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PUBLISHED',
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_status CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

CREATE INDEX idx_contents_category ON contents(category_id);
CREATE INDEX idx_contents_status ON contents(status);
CREATE INDEX idx_contents_published ON contents(published_at DESC);
CREATE INDEX idx_contents_views ON contents(views DESC);
CREATE FULLTEXT INDEX idx_contents_search ON contents(title, summary, content);

-- ============================================
-- TABELA: content_tags
-- Descrição: Tags de conteúdos
-- ============================================
CREATE TABLE content_tags (
    content_id BIGINT REFERENCES contents(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (content_id, tag)
);

CREATE INDEX idx_content_tags_tag ON content_tags(tag);

-- ============================================
-- TABELA: quizzes
-- Descrição: Quizzes educacionais
-- ============================================
CREATE TABLE quizzes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    difficulty VARCHAR(20) NOT NULL,
    time_limit INTEGER, -- em segundos
    points INTEGER NOT NULL,
    pass_percentage INTEGER DEFAULT 70,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_difficulty CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED')),
    CONSTRAINT chk_pass_percentage CHECK (pass_percentage >= 0 AND pass_percentage <= 100)
);

CREATE INDEX idx_quizzes_category ON quizzes(category_id);
CREATE INDEX idx_quizzes_difficulty ON quizzes(difficulty);

-- ============================================
-- TABELA: questions
-- Descrição: Questões dos quizzes
-- ============================================
CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    quiz_id BIGINT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,
    explanation TEXT,
    order_num INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_type CHECK (type IN ('MULTIPLE_CHOICE', 'TRUE_FALSE'))
);

CREATE INDEX idx_questions_quiz ON questions(quiz_id);

-- ============================================
-- TABELA: question_options
-- Descrição: Opções de resposta
-- ============================================
CREATE TABLE question_options (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_num INTEGER NOT NULL
);

CREATE INDEX idx_options_question ON question_options(question_id);

-- ============================================
-- TABELA: user_quiz_attempts
-- Descrição: Tentativas de quiz pelos utilizadores
-- ============================================
CREATE TABLE user_quiz_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    quiz_id BIGINT NOT NULL REFERENCES quizzes(id),
    score INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    points_earned INTEGER NOT NULL,
    time_spent INTEGER, -- em segundos
    passed BOOLEAN NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_score CHECK (score >= 0 AND score <= 100)
);

CREATE INDEX idx_attempts_user ON user_quiz_attempts(user_id);
CREATE INDEX idx_attempts_quiz ON user_quiz_attempts(quiz_id);
CREATE INDEX idx_attempts_completed ON user_quiz_attempts(completed_at DESC);

-- ============================================
-- TABELA: user_answers
-- Descrição: Respostas individuais dos utilizadores
-- ============================================
CREATE TABLE user_answers (
    id BIGSERIAL PRIMARY KEY,
    attempt_id BIGINT NOT NULL REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id),
    selected_option_id BIGINT REFERENCES question_options(id),
    is_correct BOOLEAN NOT NULL
);

CREATE INDEX idx_answers_attempt ON user_answers(attempt_id);

-- ============================================
-- TABELA: rankings
-- Descrição: Rankings de utilizadores
-- ============================================
CREATE TABLE rankings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    category_id BIGINT REFERENCES categories(id),
    points INTEGER NOT NULL DEFAULT 0,
    rank_position INTEGER,
    period_type VARCHAR(20) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_period_type CHECK (period_type IN ('GLOBAL', 'WEEKLY', 'MONTHLY')),
    UNIQUE (user_id, category_id, period_type, period_start)
);

CREATE INDEX idx_rankings_user ON rankings(user_id);
CREATE INDEX idx_rankings_category ON rankings(category_id);
CREATE INDEX idx_rankings_period ON rankings(period_type, period_start);
CREATE INDEX idx_rankings_points ON rankings(points DESC);

-- ============================================
-- TABELA: badges
-- Descrição: Badges/Conquistas disponíveis
-- ============================================
CREATE TABLE badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    criteria TEXT NOT NULL,
    points_required INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir badges iniciais
INSERT INTO badges (name, description, icon, criteria, points_required) VALUES
('Primeiro Passo', 'Complete seu primeiro quiz', 'first_quiz', 'Complete 1 quiz', 0),
('Estudante Dedicado', 'Complete 10 quizzes', 'ten_quizzes', 'Complete 10 quizzes', 0),
('Mestre do Conhecimento', 'Complete 50 quizzes', 'fifty_quizzes', 'Complete 50 quizzes', 0),
('Iniciante', 'Alcance 100 pontos', 'hundred_points', 'Alcance 100 pontos', 100),
('Intermediário', 'Alcance 500 pontos', 'five_hundred_points', 'Alcance 500 pontos', 500),
('Avançado', 'Alcance 1000 pontos', 'thousand_points', 'Alcance 1000 pontos', 1000),
('Especialista', 'Alcance nível 10', 'level_ten', 'Alcance nível 10', 0),
('Leitor Ávido', 'Leia 20 conteúdos', 'twenty_contents', 'Leia 20 conteúdos', 0),
('Participante Ativo', 'Crie 10 posts no fórum', 'ten_posts', 'Crie 10 posts', 0);

-- ============================================
-- TABELA: user_badges
-- Descrição: Badges conquistados pelos utilizadores
-- ============================================
CREATE TABLE user_badges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    badge_id BIGINT NOT NULL REFERENCES badges(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);

-- ============================================
-- TABELA: forum_topics
-- Descrição: Tópicos do fórum
-- ============================================
CREATE TABLE forum_topics (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    author_id BIGINT NOT NULL REFERENCES users(id),
    views INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    last_reply_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'DELETED', 'ARCHIVED'))
);

CREATE INDEX idx_topics_category ON forum_topics(category_id);
CREATE INDEX idx_topics_author ON forum_topics(author_id);
CREATE INDEX idx_topics_created ON forum_topics(created_at DESC);
CREATE INDEX idx_topics_last_reply ON forum_topics(last_reply_at DESC);

-- ============================================
-- TABELA: forum_replies
-- Descrição: Respostas aos tópicos do fórum
-- ============================================
CREATE TABLE forum_replies (
    id BIGSERIAL PRIMARY KEY,
    topic_id BIGINT NOT NULL REFERENCES forum_topics(id) ON DELETE CASCADE,
    author_id BIGINT NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'DELETED'))
);

CREATE INDEX idx_replies_topic ON forum_replies(topic_id);
CREATE INDEX idx_replies_author ON forum_replies(author_id);
CREATE INDEX idx_replies_created ON forum_replies(created_at);

-- ============================================
-- TABELA: forum_reports
-- Descrição: Denúncias de posts inadequados
-- ============================================
CREATE TABLE forum_reports (
    id BIGSERIAL PRIMARY KEY,
    reporter_id BIGINT NOT NULL REFERENCES users(id),
    topic_id BIGINT REFERENCES forum_topics(id),
    reply_id BIGINT REFERENCES forum_replies(id),
    reason VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    reviewed_by BIGINT REFERENCES users(id),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_reason CHECK (reason IN ('SPAM', 'OFFENSIVE', 'OFF_TOPIC', 'OTHER')),
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'REVIEWED', 'DISMISSED')),
    CONSTRAINT chk_target CHECK ((topic_id IS NOT NULL AND reply_id IS NULL) OR (topic_id IS NULL AND reply_id IS NOT NULL))
);

CREATE INDEX idx_reports_status ON forum_reports(status);

-- ============================================
-- TABELA: user_favorites
-- Descrição: Conteúdos favoritos dos utilizadores
-- ============================================
CREATE TABLE user_favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    content_id BIGINT NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (user_id, content_id)
);

CREATE INDEX idx_favorites_user ON user_favorites(user_id);

-- ============================================
-- TABELA: user_content_progress
-- Descrição: Progresso de leitura dos utilizadores
-- ============================================
CREATE TABLE user_content_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    content_id BIGINT NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (user_id, content_id)
);

CREATE INDEX idx_progress_user ON user_content_progress(user_id);

-- ============================================
-- TABELA: notifications
-- Descrição: Notificações para utilizadores
-- ============================================
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_type CHECK (type IN ('BADGE', 'LEVEL_UP', 'FORUM_REPLY', 'QUIZ_RESULT', 'SYSTEM'))
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ============================================
-- TABELA: audit_logs
-- Descrição: Logs de auditoria
-- ============================================
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contents_updated_at BEFORE UPDATE ON contents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para atualizar reply_count em forum_topics
CREATE OR REPLACE FUNCTION update_topic_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE forum_topics 
        SET reply_count = reply_count + 1,
            last_reply_at = NEW.created_at
        WHERE id = NEW.topic_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE forum_topics 
        SET reply_count = reply_count - 1
        WHERE id = OLD.topic_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_topic_reply_count_trigger
AFTER INSERT OR DELETE ON forum_replies
FOR EACH ROW EXECUTE FUNCTION update_topic_reply_count();

-- ============================================
-- VIEWS
-- ============================================

-- View para ranking global
CREATE VIEW v_global_ranking AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY u.points DESC) as position,
    u.id,
    u.name,
    u.photo_url,
    u.points,
    u.level
FROM users u
WHERE u.status = 'ACTIVE'
ORDER BY u.points DESC
LIMIT 100;

-- View para estatísticas de utilizador
CREATE VIEW v_user_stats AS
SELECT 
    u.id as user_id,
    u.name,
    u.points,
    u.level,
    COUNT(DISTINCT uqa.id) as quizzes_completed,
    COUNT(DISTINCT ft.id) as topics_created,
    COUNT(DISTINCT fr.id) as replies_posted,
    COUNT(DISTINCT ub.id) as badges_earned
FROM users u
LEFT JOIN user_quiz_attempts uqa ON u.id = uqa.user_id
LEFT JOIN forum_topics ft ON u.id = ft.author_id
LEFT JOIN forum_replies fr ON u.id = fr.author_id
LEFT JOIN user_badges ub ON u.id = ub.user_id
GROUP BY u.id, u.name, u.points, u.level;
```

---

## Índices de Performance

Índices críticos para performance:
1. `idx_users_email` - Login rápido
2. `idx_users_points` - Rankings
3. `idx_contents_published` - Listagem de conteúdos
4. `idx_attempts_user` - Histórico de quizzes
5. `idx_rankings_points` - Rankings ordenados

---

## Estimativa de Tamanho

| Tabela | Registos Estimados | Tamanho Estimado |
|--------|-------------------|------------------|
| users | 10,000 | 5 MB |
| contents | 500 | 50 MB |
| quizzes | 200 | 2 MB |
| questions | 2,000 | 5 MB |
| user_quiz_attempts | 50,000 | 20 MB |
| forum_topics | 1,000 | 10 MB |
| forum_replies | 10,000 | 30 MB |
| **TOTAL** | | **~125 MB** |

---

## Backup e Manutenção

**Backup**:
- Diário: Backup completo às 2h da manhã
- Retenção: 30 dias
- Comando: `pg_dump eha_db > backup_$(date +%Y%m%d).sql`

**Manutenção**:
- VACUUM ANALYZE semanal
- Reindex mensal
- Limpeza de logs antigos (> 90 dias)
