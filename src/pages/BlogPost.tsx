import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useBlog } from '@/contexts/BlogContext';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost, incrementViews, getPublishedPosts } = useBlog();
  const [post, setPost] = useState(getPost(id || ''));

  useEffect(() => {
    if (id) {
      const foundPost = getPost(id);
      if (foundPost && foundPost.isPublished) {
        setPost(foundPost);
        incrementViews(id);
      }
    }
  }, [id, getPost, incrementViews]);

  if (!post || !post.isPublished) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedPosts = getPublishedPosts()
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-foreground mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-foreground mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={index} className="font-semibold text-foreground mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-muted-foreground mb-1 ml-4">
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" className="h-4 w-4" />
          <Link to="/blog" className="hover:text-primary">Блог</Link>
          <Icon name="ChevronRight" className="h-4 w-4" />
          <span className="text-foreground">{post.title}</span>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.videoUrl && (
                <Badge variant="outline">
                  <Icon name="Video" className="h-3 w-3 mr-1" />
                  Видео
                </Badge>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="User" className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" className="h-4 w-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="h-4 w-4" />
                <span>{post.readTime} мин чтения</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Eye" className="h-4 w-4" />
                <span>{post.views} просмотров</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Video */}
          {post.videoUrl && (
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
                        <a href={post.videoUrl} target="_blank" rel="noopener noreferrer">
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

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA Section */}
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

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Похожие статьи
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-lg transition-all duration-300">
                    {relatedPost.image && (
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardContent className="p-4 space-y-3">
                      <Badge variant="secondary" className="text-xs">
                        {relatedPost.category}
                      </Badge>
                      
                      <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                        <Link to={`/blog/${relatedPost.id}`}>
                          {relatedPost.title}
                        </Link>
                      </h4>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatDate(relatedPost.publishDate)}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime} мин</span>
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
  );
};

export default BlogPost;