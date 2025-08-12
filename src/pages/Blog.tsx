import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useBlog } from '@/contexts/BlogContext';

const Blog = () => {
  const { getPublishedPosts, categories } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [sortBy, setSortBy] = useState('newest');

  const posts = getPublishedPosts();

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'Все категории' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'oldest':
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case 'popular':
          return b.views - a.views;
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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Правовой блог
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Актуальная информация о изменениях в законодательстве, практические советы и разборы сложных правовых вопросов от наших экспертов.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
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

            {/* Sort */}
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

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Найдено статей: <span className="font-semibold text-foreground">{filteredPosts.length}</span>
          </p>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Image or Video Thumbnail */}
                {post.image && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {post.videoUrl && !post.image && (
                  <div className="aspect-video bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <Icon name="Play" className="h-12 w-12 text-white" />
                  </div>
                )}

                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" className="h-4 w-4" />
                    <span>{formatDate(post.publishDate)}</span>
                    <span>•</span>
                    <Icon name="Clock" className="h-4 w-4" />
                    <span>{post.readTime} мин</span>
                    <span>•</span>
                    <Icon name="Eye" className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>

                  <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    {post.videoUrl && (
                      <Badge variant="outline" className="text-xs">
                        <Icon name="Video" className="h-3 w-3 mr-1" />
                        Видео
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {post.author}
                    </span>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/blog/${post.id}`}>
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
            <h3 className="text-xl font-semibold text-foreground mb-2">Статьи не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или выбрать другую категорию
            </p>
          </div>
        )}

        {/* Newsletter Subscription */}
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