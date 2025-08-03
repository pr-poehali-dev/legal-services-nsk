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
  const [activeTab, setActiveTab] = useState('popular');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(new Array(services.length).fill(true));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'popular', label: 'ПОПУЛЯРНЫЕ' },
    { id: 'citizens', label: 'УСЛУГИ ДЛЯ ГРАЖДАН' },
    { id: 'business', label: 'УСЛУГИ ДЛЯ БИЗНЕСА' },
    { id: 'realestate', label: 'НЕДВИЖИМОСТЬ' },
    { id: 'bankruptcy', label: 'БАНКРОТСТВО' },
  ];

  const allServices = [
    {
      icon: "Building2",
      title: "Сопровождение бизнеса",
      description: "Полное юридическое сопровождение деятельности компании",
      price: "от 15 000 ₽",
      category: ['popular', 'business']
    },
    {
      icon: "Users",
      title: "Семейный юрист",
      description: "Развод, раздел имущества, алименты, опека",
      price: "от 10 000 ₽",
      category: ['popular', 'citizens']
    },
    {
      icon: "TrendingDown",
      title: "Банкротство физических лиц",
      description: "Процедура банкротства для граждан, списание долгов",
      price: "от 30 000 ₽",
      category: ['popular', 'bankruptcy', 'citizens']
    },
    {
      icon: "Home",
      title: "Недвижимость и перепланировки",
      description: "Сделки с недвижимостью, узаконивание перепланировок",
      price: "от 12 000 ₽",
      category: ['popular', 'realestate']
    },
    {
      icon: "CreditCard",
      title: "Взыскание долгов",
      description: "Взыскание задолженности, работа с должниками",
      price: "от 8 500 ₽",
      category: ['popular', 'business', 'citizens']
    },
    {
      icon: "FileCheck",
      title: "Регистрация бизнеса",
      description: "Регистрация ООО, ИП, изменение учредительных документов",
      price: "от 5 000 ₽",
      category: ['popular', 'business']
    },
    {
      icon: "FileText",
      title: "Составление и анализ документов",
      description: "Подготовка договоров, анализ документации, правовая экспертиза",
      price: "от 3 000 ₽",
      category: ['popular', 'business', 'citizens']
    },
    {
      icon: "Shield",
      title: "Представительство и защита в суде",
      description: "Представительство интересов в судах всех инстанций",
      price: "от 25 000 ₽",
      category: ['popular', 'business', 'citizens']
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description: "Возврат некачественного товара, споры с продавцами",
      price: "от 6 000 ₽",
      category: ['popular', 'citizens']
    },
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description: "Взыскание ущерба, представительство в суде по автоавариям",
      price: "от 9 000 ₽",
      category: ['popular', 'citizens']
    },
    {
      icon: "Building",
      title: "Споры с застройщиками",
      description: "Защита прав дольщиков, взыскание неустойки, возврат средств",
      price: "от 15 000 ₽",
      category: ['popular', 'realestate', 'citizens']
    },
    {
      icon: "Briefcase",
      title: "Трудовое право",
      description: "Защита трудовых прав, взыскание заработной платы",
      price: "от 8 000 ₽",
      category: ['citizens']
    },
    {
      icon: "Building",
      title: "Банкротство юридических лиц",
      description: "Ликвидация предприятий, банкротство организаций",
      price: "от 50 000 ₽",
      category: ['bankruptcy', 'business']
    },
    {
      icon: "MapPin",
      title: "Земельное право",
      description: "Оформление земельных участков, споры по межеванию",
      price: "от 15 000 ₽",
      category: ['realestate']
    },
  ];

  const getFilteredServices = () => {
    if (activeTab === 'popular') {
      return allServices.filter(service => service.category.includes('popular'));
    }
    return allServices.filter(service => service.category.includes(activeTab));
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
            Предоставляем полный спектр юридических услуг для физических лиц и
            предприятий
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold text-primary">
                    {service.price}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedService(service)}
                  >
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => consultationModal.open()}
          >
            <Icon name="Calendar" className="h-5 w-5 mr-2" />
            Записаться на консультацию
          </Button>
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