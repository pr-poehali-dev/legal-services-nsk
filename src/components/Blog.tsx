import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import BlogModal from "./BlogModal";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const posts = [
    {
      title: "Новые изменения в трудовом законодательстве 2024",
      excerpt:
        "Разбираем ключевые изменения, которые коснутся работодателей и сотрудников в новом году",
      date: "15 декабря 2024",
      readTime: "5 мин",
      category: "Трудовое право",
    },
    {
      title: "Как правильно оформить увольнение по соглашению сторон",
      excerpt:
        "Пошаговая инструкция и важные нюансы, которые нужно учесть при увольнении",
      date: "10 декабря 2024",
      readTime: "7 мин",
      category: "HR-право",
    },
    {
      title: "Защита прав потребителей при покупке недвижимости",
      excerpt:
        "Что делать, если застройщик нарушает сроки или обязательства по договору долевого участия",
      date: "5 декабря 2024",
      readTime: "8 мин",
      category: "Недвижимость",
    },
  ];

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
          {posts.map((post, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" className="h-4 w-4" />
                    <span>{post.readTime}</span>
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
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-primary hover:text-primary/80"
                    onClick={() => setSelectedPost(post)}
                  >
                    Читать далее
                    <Icon name="ArrowRight" className="h-4 w-4 ml-1" />
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
