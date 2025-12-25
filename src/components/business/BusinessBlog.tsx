import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const BusinessBlog = () => {
  const articles = [
    {
      title: "Как защитить бизнес от необоснованных исков",
      category: "Арбитраж",
      date: "15 декабря 2024",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
    },
    {
      title: "Налоговая проверка: как подготовиться и избежать штрафов",
      category: "Налоги",
      date: "12 декабря 2024",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
    },
    {
      title: "Банкротство компании: пошаговая инструкция 2024",
      category: "Банкротство",
      date: "10 декабря 2024",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block">
            <div className="flex items-center gap-2 bg-blue-100 rounded-full px-6 py-2 mb-4">
              <Icon name="BookOpen" size={20} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Блог для бизнеса</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-900">
            Полезные статьи и новости
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Актуальная информация о законодательстве и судебной практике
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Icon name="Calendar" size={16} />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Читать статью
                  <Icon name="ArrowRight" className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            Все статьи блога
            <Icon name="ArrowRight" className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BusinessBlog;
