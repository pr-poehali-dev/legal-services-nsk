import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const ServicesMain = () => {
  const serviceCategories = [
    {
      icon: "Car",
      title: "Автоюрист",
      description: "ДТП, ОСАГО, лишение прав",
      link: "/dtp-lawyer"
    },
    {
      icon: "Users",
      title: "Семейные споры",
      description: "Развод, алименты, раздел имущества",
      link: "/services"
    },
    {
      icon: "TrendingDown",
      title: "Банкротство",
      description: "Списание долгов физ. лиц",
      link: "/services"
    },
    {
      icon: "FileText",
      title: "Миграционные дела",
      description: "РВП, ВНЖ, гражданство",
      link: "/migration"
    },
    {
      icon: "Home",
      title: "Недвижимость",
      description: "Сделки, перепланировки, споры",
      link: "/services"
    },
    {
      icon: "Shield",
      title: "Уголовная защита",
      description: "Защита в суде, следствие",
      link: "/services"
    }
  ];

  const advantages = [
    {
      icon: "Award",
      title: "Широкая экспертиза",
      description: "15+ направлений права — от семейных споров до уголовной защиты"
    },
    {
      icon: "UserCheck",
      title: "Индивидуальный подход",
      description: "Решение под вашу ситуацию, а не шаблонные консультации"
    },
    {
      icon: "Target",
      title: "Полное сопровождение",
      description: "От первой консультации до получения результата в суде"
    },
    {
      icon: "FileCheck",
      title: "Прозрачность",
      description: "Понятные цены, чёткие сроки, отчёт на каждом этапе"
    }
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Решаем любые юридические вопросы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексная правовая поддержка для граждан — от консультации до защиты в суде
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((advantage, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              <CardContent className="p-6 space-y-4">
                <div className="inline-block p-4 bg-gradient-to-br from-primary to-blue-600 rounded-xl">
                  <Icon name={advantage.icon} className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold">
                Нужна юридическая помощь?
              </h3>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Узнайте, чем мы можем помочь — полный каталог направлений работы с ценами и сроками
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link to="/services">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 px-8"
                  >
                    <Icon name="ListChecks" className="h-5 w-5 mr-2" />
                    Смотреть направления работы
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => window.open('tel:+79994523500', '_self')}
                >
                  <Icon name="Phone" className="h-5 w-5 mr-2" />
                  +7 999 452 35 00
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" className="h-5 w-5" />
                  <span>Работаем 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" className="h-5 w-5" />
                  <span>Выезд в любой район</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" className="h-5 w-5" />
                  <span>Конфиденциальность</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesMain;