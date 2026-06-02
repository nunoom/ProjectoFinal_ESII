CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quizzes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    difficulty VARCHAR(20) NOT NULL,
    time_limit INTEGER, -- in seconds
    points INTEGER NOT NULL,
    pass_percentage INTEGER DEFAULT 70,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    quiz_id BIGINT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,
    explanation TEXT,
    order_num INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_options (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_num INTEGER NOT NULL
);

CREATE TABLE user_quiz_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    quiz_id BIGINT NOT NULL REFERENCES quizzes(id),
    score INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    points_earned INTEGER NOT NULL,
    time_spent INTEGER,
    passed BOOLEAN NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_answers (
    id BIGSERIAL PRIMARY KEY,
    attempt_id BIGINT NOT NULL REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id),
    selected_option_id BIGINT REFERENCES question_options(id),
    is_correct BOOLEAN NOT NULL
);

CREATE INDEX idx_quizzes_category ON quizzes(category_id);
CREATE INDEX idx_attempts_user ON user_quiz_attempts(user_id);
CREATE INDEX idx_attempts_quiz ON user_quiz_attempts(quiz_id);

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

-- Seed Sample Quiz
INSERT INTO quizzes (id, title, description, category_id, difficulty, time_limit, points, pass_percentage, status) VALUES
(1, 'Quiz: Petróleo em Angola', 'Teste seus conhecimentos sobre a história e economia do petróleo em Angola.', 1, 'MEDIUM', 600, 25, 70, 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Question
INSERT INTO questions (id, quiz_id, text, type, explanation, order_num) VALUES
(1, 1, 'Em que ano foi descoberto petróleo em Angola?', 'MULTIPLE_CHOICE', 'O petróleo foi descoberto em Angola em 1955, no vale do Cuanza.', 1)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Options
INSERT INTO question_options (id, question_id, text, is_correct, order_num) VALUES
(1, 1, '1955', TRUE, 1),
(2, 1, '1966', FALSE, 2),
(3, 1, '1975', FALSE, 3),
(4, 1, '1985', FALSE, 4)
ON CONFLICT (id) DO NOTHING;
