import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import ServiceModal from "./ServiceModal";
import { useModal } from "@/hooks/useModal";

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const { consultationModal } = useModal();
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [activeTab, setActiveTab] = useState("popular");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(new Array(services.length).fill(true));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "popular", label: "ПОПУЛЯРНЫЕ" },
    { id: "citizens", label: "УСЛУГИ ДЛЯ ГРАЖДАН" },
    { id: "business", label: "УСЛУГИ ДЛЯ БИЗНЕСА" },
    { id: "realestate", label: "НЕДВИЖИМОСТЬ" },
    { id: "bankruptcy", label: "БАНКРОТСТВО" },
  ];

  const allServices = [
    {
      icon: "Building2",
      title: "Сопровождение бизнеса",
      description: "Полное юридическое сопровождение деятельности компании",
      category: ["popular", "business"],
    },
    {
      icon: "Users",
      title: "Семейный юрист",
      description: "Развод, раздел имущества, алименты, опека",
      category: ["popular", "citizens"],
    },
    {
      icon: "TrendingDown",
      title: "Банкротство физических лиц",
      description: "Процедура банкротства для граждан, списание долгов",
      category: ["popular", "bankruptcy", "citizens"],
    },
    {
      icon: "Home",
      title: "Недвижимость и перепланировки",
      description: "Сделки с недвижимостью, узаконивание перепланировок",
      category: ["popular", "realestate"],
    },
    {
      icon: "CreditCard",
      title: "Взыскание долгов",
      description: "Взыскание задолженности, работа с должниками",
      category: ["popular", "business", "citizens"],
    },
    {
      icon: "FileCheck",
      title: "Регистрация бизнеса",
      description: "Регистрация ООО, ИП, изменение учредительных документов",
      category: ["popular", "business"],
    },
    {
      icon: "FileText",
      title: "Составление и анализ документов",
      description:
        "Подготовка договоров, анализ документации, правовая экспертиза",
      category: ["popular", "business", "citizens"],
    },
    {
      icon: "Shield",
      title: "Представительство и защита в суде",
      description: "Представительство интересов в судах всех инстанций",
      category: ["popular", "business", "citizens"],
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description: "Возврат некачественного товара, споры с продавцами",
      category: ["popular", "citizens"],
    },
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description: "Взыскание ущерба, представительство в суде по автоавариям",
      category: ["popular", "citizens"],
    },
    {
      icon: "Building",
      title: "Споры с застройщиками",
      description:
        "Защита прав дольщиков, взыскание неустойки, возврат средств",
      category: ["popular", "realestate", "citizens"],
    },
    {
      icon: "Briefcase",
      title: "Трудовое право",
      description: "Защита трудовых прав, взыскание заработной платы",
      category: ["citizens"],
    },
    {
      icon: "Building",
      title: "Банкротство юридических лиц",
      description: "Ликвидация предприятий, банкротство организаций",
      category: ["bankruptcy", "business"],
    },
    {
      icon: "MapPin",
      title: "Земельное право",
      description: "Оформление земельных участков, споры по межеванию",
      category: ["realestate"],
    },
  ];

  const getFilteredServices = () => {
    if (activeTab === "popular") {
      return allServices.filter((service) =>
        service.category.includes("popular"),
      );
    }
    return allServices.filter((service) =>
      service.category.includes(activeTab),
    );
  };

  const services = getFilteredServices();

  return (
    <section
      id="services"
      className="py-20 bg-background"
      role="region"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-8">
          <h2
            id="services-heading"
            className="text-3xl lg:text-4xl font-bold text-foreground"
          >
            Наши услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Профессиональная юридическая помощь по всем направлениям права
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-border transform ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4 pb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name={service.icon} className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => consultationModal.open()}
                  >
                    <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                    ЗАКАЗАТЬ УСЛУГУ
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open('tel:+79994523500', '_self')}
                    >
                      <Icon name="Phone" className="h-4 w-4 mr-1" />
                      Позвонить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedService(service)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Нужна срочная помощь?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => consultationModal.open()}
              >
                <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ
              </Button>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">или звоните прямо сейчас</div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('tel:+79994523500', '_self')}
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold"
                >
                  <Icon name="Phone" className="h-5 w-5 mr-2" />
                  +7 999 452 35 00
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Icon name="Clock" className="h-4 w-4 mr-1" />
                24/7 прием звонков
              </div>
              <div className="flex items-center">
                <Icon name="MapPin" className="h-4 w-4 mr-1" />
                Выезд в любой район НСК
              </div>
              <div className="flex items-center">
                <Icon name="Shield" className="h-4 w-4 mr-1" />
                Конфиденциальность
              </div>
            </div>
          </div>
        </div>

        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      </div>
    </section>
  );
};

export default Services;