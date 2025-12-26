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

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Юридические услуги для граждан
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Решаем любые правовые вопросы — от консультации до защиты в суде
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceCategories.map((service, index) => (
            <Link key={index} to={service.link}>
              <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-block p-4 bg-primary/10 rounded-xl">
                    <Icon name={service.icon} className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold">
                Не нашли нужную услугу?
              </h3>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Полный каталог услуг с ценами и сроками — на странице услуг
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link to="/services">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 px-8"
                  >
                    <Icon name="ListChecks" className="h-5 w-5 mr-2" />
                    Все услуги и цены
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
