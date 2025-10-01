ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author VARCHAR(200);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP;

UPDATE blog_posts SET author = 'Администратор' WHERE author IS NULL;
UPDATE blog_posts SET category = 'Новости' WHERE category IS NULL;