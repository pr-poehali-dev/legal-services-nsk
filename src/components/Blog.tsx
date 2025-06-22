import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const Blog = () => {
  const { openModal } = useModal();

  const articles = [
    {
      title: "Новые изменения в трудовом законодательстве 2024",
      excerpt:
        "Рассматриваем ключевые изменения в ТК РФ, которые влияют на работников и работодателей",
      date: "15 марта 2024",
      readTime: "5 мин",
      category: "Трудовое право",
    },
    {
      title: "Как правильно оформить наследство в 2024 году",
      excerpt:
        "Пошаговая инструкция по оформлению наследственных прав и избежанию типичных ошибок",
      date: "10 марта 2024",
      readTime: "7 мин",
      category: "Наследственное право",
    },
    {
      title: "Защита прав потребителей: актуальная практика",
      excerpt:
        "Разбираем последние решения судов по защите прав потребителей и способы возврата товаров",
      date: "8 марта 2024",
      readTime: "4 мин",
      category: "Потребительское право",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Полезные статьи
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Актуальная информация о изменениях в законодательстве и юридической
            практике
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {article.date}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Icon name="ArrowRight" className="h-4 w-4 ml-1" />
                    Читать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              Нужна персональная консультация?
            </h3>
            <p className="text-muted-foreground">
              Получите профессиональный совет по вашей ситуации
            </p>
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={openModal}
          >
            <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
            Задать вопрос юристу
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
