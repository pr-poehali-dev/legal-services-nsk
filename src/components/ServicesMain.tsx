import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const ServicesMain = () => {
  const mainServices = [
    {
      icon: "Car",
      title: "Автоюрист",
      description: "Взыскание по ОСАГО, споры со страховыми, лишение прав, административные дела по ДТП",
      link: "/dtp-lawyer",
      color: "bg-blue-500",
      features: ["Взыскание ущерба", "Споры со страховыми", "Защита от лишения прав"]
    },
    {
      icon: "Scale",
      title: "Гражданский юрист",
      description: "Семейные споры, наследство, защита прав потребителей, недвижимость",
      link: "/services",
      color: "bg-purple-500",
      features: ["Семейные дела", "Наследство", "Недвижимость"]
    },
    {
      icon: "FileText",
      title: "Административные дела",
      description: "Обжалование постановлений ГИБДД, штрафов, защита прав граждан",
      link: "/services",
      color: "bg-orange-500",
      features: ["Обжалование штрафов", "Защита в ГИБДД", "Миграционные споры"]
    },
    {
      icon: "Briefcase",
      title: "Бизнес-юрист",
      description: "Сопровождение бизнеса, договоры, регистрация компаний, корпоративные споры",
      link: "/services",
      color: "bg-green-500",
      features: ["Регистрация бизнеса", "Договоры", "Корпоративные споры"]
    },
    {
      icon: "Shield",
      title: "Адвокат по уголовным делам",
      description: "Защита в уголовных делах, представительство в суде, обжалование приговоров",
      link: "/services",
      color: "bg-red-500",
      features: ["Защита в суде", "Следствие", "Апелляция"]
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
            Наши услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Профессиональная юридическая помощь по всем направлениям права
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary"
            >
              <CardHeader className="space-y-4">
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center`}>
                  <Icon name={service.icon} className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Check" className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={service.link}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-2">
                    Подробнее
                    <Icon name="ArrowRight" className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-3xl font-bold">
                Не нашли нужную услугу?
              </h3>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Мы оказываем весь спектр юридических услуг. Позвоните или оставьте заявку — подберём решение для вашей ситуации.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                  Бесплатная консультация
                </Button>
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
