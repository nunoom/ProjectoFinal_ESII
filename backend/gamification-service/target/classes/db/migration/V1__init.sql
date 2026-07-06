CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rankings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
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

CREATE TABLE badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    criteria TEXT NOT NULL,
    points_required INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_badges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL REFERENCES badges(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, badge_id)
);

CREATE INDEX idx_rankings_user ON rankings(user_id);
CREATE INDEX idx_rankings_category ON rankings(category_id);
CREATE INDEX idx_rankings_points ON rankings(points DESC);
CREATE INDEX idx_user_badges_user ON user_badges(user_id);

-- Seed Categories
INSERT INTO categories (id, name, slug, description, color) VALUES
(1, 'Petróleo', 'petroleo', 'História e economia do petróleo em Angola', '#8B0000'),
(2, 'Kwanza', 'kwanza', 'Moeda nacional e reformas monetárias', '#FFD700'),
(3, 'Guerra Civil', 'guerra-civil', 'Impacto económico da guerra civil', '#696969'),
(4, 'Agricultura', 'agricultura', 'Setor agrícola angolano', '#228B22'),
(5, 'Reformas', 'reformas', 'Reformas económicas e políticas', '#4169E1'),
(6, 'Comércio', 'comercio', 'Comércio interno e externo', '#FF8C00'),
(7, 'Indústria', 'industria', 'Desenvolvimento industrial', '#8B4513'),
(8, 'Educação', 'educacao', 'Educação e economia', '#9370DB')
ON CONFLICT (id) DO NOTHING;

-- Seed Badges
INSERT INTO badges (id, name, description, icon, criteria, points_required) VALUES
(1, 'Primeiro Passo', 'Complete seu primeiro quiz', 'first_quiz', 'Complete 1 quiz', 0),
(2, 'Estudante Dedicado', 'Complete 10 quizzes', 'ten_quizzes', 'Complete 10 quizzes', 0),
(3, 'Mestre do Conhecimento', 'Complete 50 quizzes', 'fifty_quizzes', 'Complete 50 quizzes', 0),
(4, 'Iniciante', 'Alcance 100 pontos', 'hundred_points', 'Alcance 100 pontos', 100),
(5, 'Intermediário', 'Alcance 500 pontos', 'five_hundred_points', 'Alcance 500 pontos', 500),
(6, 'Avançado', 'Alcance 1000 pontos', 'thousand_points', 'Alcance 1000 pontos', 1000),
(7, 'Especialista', 'Alcance nível 10', 'level_ten', 'Alcance nível 10', 0),
(8, 'Leitor Ávido', 'Leia 20 conteúdos', 'twenty_contents', 'Leia 20 conteúdos', 0),
(9, 'Participante Ativo', 'Crie 10 posts no fórum', 'ten_posts', 'Crie 10 posts', 0)
ON CONFLICT (id) DO NOTHING;
