import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
}

const API_URL = 'https://functions.poehali.dev/1d4361c6-c539-45fe-b3bd-af4b53bce6c9';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch(`${API_URL}?published=true`);
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Все категории', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Все категории' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime();
        case 'oldest':
          return new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

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

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Загрузка постов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Правовой блог
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Актуальная информация о изменениях в законодательстве, практические советы и разборы сложных правовых вопросов от наших экспертов.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
              <option value="popular">По популярности</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            Найдено статей: <span className="font-semibold text-foreground">{filteredPosts.length}</span>
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                {post.image_url && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {post.video_url && !post.image_url && (
                  <div className="aspect-video bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <Icon name="Play" className="h-12 w-12 text-white" />
                  </div>
                )}

                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" className="h-4 w-4" />
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                    <span>•</span>
                    <Icon name="Clock" className="h-4 w-4" />
                    <span>{getReadTime(post.content)} мин</span>
                    {post.views !== undefined && (
                      <>
                        <span>•</span>
                        <Icon name="Eye" className="h-4 w-4" />
                        <span>{post.views}</span>
                      </>
                    )}
                  </div>

                  <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    {post.category && (
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    )}
                    {post.video_url && (
                      <Badge variant="outline" className="text-xs">
                        <Icon name="Video" className="h-3 w-3 mr-1" />
                        Видео
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {post.description || post.content.substring(0, 150) + '...'}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {post.author}
                    </span>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/blog/${post.slug}`}>
                        Читать далее
                        <Icon name="ArrowRight" className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon name="FileText" className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {posts.length === 0 ? 'Постов пока нет' : 'Статьи не найдены'}
            </h3>
            <p className="text-muted-foreground">
              {posts.length === 0 
                ? 'Создайте первый пост через админ-панель' 
                : 'Попробуйте изменить параметры поиска или выбрать другую категорию'}
            </p>
          </div>
        )}

        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Подпишитесь на обновления
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Получайте новые статьи и важные изменения в законодательстве первыми. 
              Никакого спама, только полезная информация.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Ваш email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                <Icon name="Bell" className="h-4 w-4 mr-2" />
                Подписаться
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
