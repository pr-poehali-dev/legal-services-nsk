import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  author: string;
  category: string;
  image_url: string;
  video_url: string;
  thumbnail_url: string;
  published: boolean;
  created_at: string;
  published_at: string;
  views?: number;
  seo_title?: string;
  seo_description?: string;
  seo_h1?: string;
}

const API_URL = 'https://functions.poehali.dev/5f51a5f5-c821-46dc-80eb-996d07934d5a';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (slug: string) => {
    try {
      const response = await fetch(`${API_URL}?slug=${slug}&published=true`);
      const data = await response.json();
      
      if (data && data.published) {
        setPost(data);
        loadRelatedPosts(data.category, data.id);
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Ошибка загрузки поста:', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedPosts = async (category: string, currentId: number) => {
    try {
      const response = await fetch(`${API_URL}?published=true`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const related = data
          .filter((p: BlogPost) => p.category === category && p.id !== currentId)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Ошибка загрузки похожих постов:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const renderContent = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Загрузка поста...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.seo_title || post.title} | ЮрСервис НСК</title>
        <meta name="description" content={post.seo_description || post.description} />
        <meta property="og:title" content={post.seo_title || post.title} />
        <meta property="og:description" content={post.seo_description || post.description} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://юридический-сервис.рф/blog/${post.slug}`} />
      </Helmet>
      
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" className="h-4 w-4" />
          <Link to="/blog" className="hover:text-primary">Блог</Link>
          <Icon name="ChevronRight" className="h-4 w-4" />
          <span className="text-foreground">{post.title}</span>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {post.category && <Badge variant="secondary">{post.category}</Badge>}
              {post.video_url && (
                <Badge variant="outline">
                  <Icon name="Video" className="h-3 w-3 mr-1" />
                  Видео
                </Badge>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.seo_h1 || post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="User" className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" className="h-4 w-4" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="h-4 w-4" />
                <span>{getReadTime(post.content)} мин чтения</span>
              </div>
              {post.views !== undefined && (
                <div className="flex items-center gap-2">
                  <Icon name="Eye" className="h-4 w-4" />
                  <span>{post.views} просмотров</span>
                </div>
              )}
            </div>
          </div>

          {post.image_url && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.image_url} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          {post.video_url && (
            <div className="mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Video" className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Видео по теме</h3>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Icon name="Play" className="h-12 w-12 text-primary mx-auto" />
                      <p className="text-muted-foreground">Видео материал</p>
                      <Button asChild>
                        <a href={post.video_url} target="_blank" rel="noopener noreferrer">
                          <Icon name="ExternalLink" className="h-4 w-4 mr-2" />
                          Смотреть видео
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8 ql-editor">
            {renderContent(post.content)}
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Нужна консультация по данному вопросу?
                </h3>
                <p className="text-muted-foreground">
                  Наши юристы помогут разобраться в вашей ситуации и предоставят персональные рекомендации
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                  Получить консультацию
                </Button>
              </div>
            </CardContent>
          </Card>

          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Похожие статьи
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-lg transition-all duration-300">
                    {relatedPost.image_url && (
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img 
                          src={relatedPost.image_url} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardContent className="p-4 space-y-3">
                      {relatedPost.category && (
                        <Badge variant="secondary" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                      )}
                      
                      <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                        <Link to={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h4>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description || relatedPost.content.substring(0, 100) + '...'}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatDate(relatedPost.published_at || relatedPost.created_at)}</span>
                        <span>•</span>
                        <span>{getReadTime(relatedPost.content)} мин</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;