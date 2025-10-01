ALTER TABLE blog_posts ALTER COLUMN author_id SET DEFAULT gen_random_uuid();
UPDATE blog_posts SET author_id = gen_random_uuid() WHERE author_id IS NULL;