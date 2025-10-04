import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import BlogModal from "./BlogModal";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  author: string;
  category: string;
  image_url: string;
  published_at: string;
}

const API_URL = 'https://functions.poehali.dev/5f51a5f5-c821-46dc-80eb-996d07934d5a';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch(`${API_URL}?published=true`);
      if (response.ok) {
        const data = await response.json();
        setPosts(Array.isArray(data) ? data.slice(0, 3) : []);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Правовой блог
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Актуальная информация о изменениях в законодательстве и полезные
            советы
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            <div className="col-span-3 text-center py-12">
              <Icon name="Loader2" className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-spin" />
              <p className="text-muted-foreground text-lg">Загрузка статей...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <Icon name="BookOpen" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">Пока нет опубликованных статей</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card
                key={post.id}
                className="border-border hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg hover:text-primary transition-colors duration-200">
                    <Link to={`/blog/${post.slug}`} className="block">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.image_url && (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" className="h-4 w-4" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto text-primary hover:text-primary/80"
                      >
                        Читать далее
                        <Icon name="ArrowRight" className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {posts.length > 0 && (
          <div className="text-center">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                <Icon name="BookOpen" className="h-5 w-5 mr-2" />
                Все статьи блога
              </Button>
            </Link>
          </div>
        )}

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