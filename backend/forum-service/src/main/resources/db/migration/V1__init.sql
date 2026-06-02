CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forum_topics (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    author_id BIGINT NOT NULL,
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

CREATE TABLE forum_replies (
    id BIGSERIAL PRIMARY KEY,
    topic_id BIGINT NOT NULL REFERENCES forum_topics(id) ON DELETE CASCADE,
    author_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'DELETED'))
);

CREATE TABLE forum_reports (
    id BIGSERIAL PRIMARY KEY,
    reporter_id BIGINT NOT NULL,
    topic_id BIGINT REFERENCES forum_topics(id),
    reply_id BIGINT REFERENCES forum_replies(id),
    reason VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_reason CHECK (reason IN ('SPAM', 'OFFENSIVE', 'OFF_TOPIC', 'OTHER')),
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'REVIEWED', 'DISMISSED')),
    CONSTRAINT chk_target CHECK ((topic_id IS NOT NULL AND reply_id IS NULL) OR (topic_id IS NULL AND reply_id IS NOT NULL))
);

CREATE INDEX idx_topics_category ON forum_topics(category_id);
CREATE INDEX idx_topics_author ON forum_topics(author_id);
CREATE INDEX idx_replies_topic ON forum_replies(topic_id);

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
