-- Добавление SEO полей для статей блога
ALTER TABLE t_p52877782_legal_services_nsk.blog_posts 
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS seo_h1 VARCHAR(255);

-- Комментарии для полей
COMMENT ON COLUMN t_p52877782_legal_services_nsk.blog_posts.seo_title IS 'SEO тег <title> для страницы статьи';
COMMENT ON COLUMN t_p52877782_legal_services_nsk.blog_posts.seo_description IS 'SEO мета-описание для страницы статьи';
COMMENT ON COLUMN t_p52877782_legal_services_nsk.blog_posts.seo_h1 IS 'SEO заголовок H1 для страницы статьи';