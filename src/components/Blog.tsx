import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import BlogModal from "./BlogModal";
import { newsUpdater, NewsItem } from "@/utils/newsUpdater";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Загружаем новости при первом рендере
    setNews(newsUpdater.getNews(6));
    
    // Очищаем старые новости
    newsUpdater.cleanOldNews();
  }, []);

  const handleUpdateNews = async () => {
    setIsUpdating(true);
    try {
      await newsUpdater.updateFromGarant();
      setNews(newsUpdater.getNews(6));
    } catch (error) {
      console.error('Ошибка обновления новостей:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
  };

  const getReadTime = (summary: string) => {
    const wordsPerMinute = 200;
    const words = summary.split(' ').length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  return (
    <section id="blog" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Правовой блог
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Актуальная информация о изменениях в законодательстве и полезные советы
          </p>
          <div className="mt-6">
            <Button 
              onClick={handleUpdateNews}
              disabled={isUpdating}
              variant="outline"
              size="sm"
            >
              {isUpdating ? (
                <>
                  <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Обновляем...
                </>
              ) : (
                <>
                  <Icon name="RefreshCw" className="h-4 w-4 mr-2" />
                  Обновить новости
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {news.map((post, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                    {post.source === 'garant.ru' ? 'Гарант.ру' : 'Новости'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" className="h-4 w-4" />
                    <span>{getReadTime(post.summary)} мин</span>
                  </div>
                </div>
                <CardTitle
                  className="text-lg hover:text-primary transition-colors duration-200 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-primary hover:text-primary/80"
                    onClick={() => window.open(post.url, '_blank')}
                  >
                    Читать на Гарант.ру
                    <Icon name="ExternalLink" className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            <Icon name="BookOpen" className="h-5 w-5 mr-2" />
            Все статьи блога
          </Button>
        </div>

        <BlogModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      </div>
    </section>
  );
};

export default Blog;