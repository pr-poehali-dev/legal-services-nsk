-- Добавляем недостающие таблицы для системы управления

-- Таблица блога (используем UUID для связи с users)
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url TEXT,
    author_id UUID NOT NULL REFERENCES users(id),
    published BOOLEAN NOT NULL DEFAULT false,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица комментариев к статьям
CREATE TABLE blog_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES blog_posts(id),
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Дополнительные индексы
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_comments_post_id ON blog_comments(post_id);

-- Добавляем аватар к пользователям
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Обновляем таблицу дел для работы с UUID
ALTER TABLE cases ADD COLUMN IF NOT EXISTS priority VARCHAR(10) DEFAULT 'medium';
ALTER TABLE cases ADD CONSTRAINT check_case_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent'));

-- Изменяем foreign key для работы с UUID
ALTER TABLE cases ALTER COLUMN client_id TYPE UUID USING client_id::UUID;
ALTER TABLE cases ALTER COLUMN lawyer_id TYPE UUID USING lawyer_id::UUID;