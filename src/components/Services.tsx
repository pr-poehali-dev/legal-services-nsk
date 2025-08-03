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

  const tabs = [
    { id: 'popular', label: 'ПОПУЛЯРНЫЕ' },
    { id: 'citizens', label: 'УСЛУГИ ДЛЯ ГРАЖДАН' },
    { id: 'business', label: 'УСЛУГИ ДЛЯ БИЗНЕСА' },
    { id: 'realestate', label: 'НЕДВИЖИМОСТЬ' },
    { id: 'bankruptcy', label: 'БАНКРОТСТВО' },
  ];

  const allServices = [
    {
      icon: "TrendingUp",
      title: "Сопровождение бизнеса",
      description: "Комплексное юридическое обслуживание. Правовой аудит",
      category: ['popular', 'business']
    },
    {
      icon: "Users",
      title: "Семейный юрист",
      description: "Бракоразводный процесс, алименты, установление отцовства",
      category: ['popular', 'citizens']
    },
    {
      icon: "Users",
      title: "Банкротство и ликвидация юр. лиц",
      description: "Анализ ситуации, подготовка документов, публикации в СМИ, уведомление кредиторов",
      category: ['business', 'bankruptcy']
    },
    {
      icon: "Settings",
      title: "Банкротство физических лиц",
      description: "Анализ ситуации, подготовка документов, публикации в СМИ, уведомление кредиторов",
      category: ['citizens', 'bankruptcy']
    },
    {
      icon: "Building",
      title: "Недвижимость и перепланировки",
      description: "Оформление и сопровождение сделок по недвижимости. Узаконивание перепланировок",
      category: ['realestate']
    },
    {
      icon: "CreditCard",
      title: "Взыскание долгов",
      description: "Взыскание дебиторской задолженности, долгов по договорам и распискам",
      category: ['popular', 'business', 'citizens']
    },
    {
      icon: "Building2",
      title: "Регистрация бизнеса",
      description: "Регистрация ООО, ИП и другие процедуры",
      category: ['business']
    },
    {
      icon: "FileText",
      title: "Составление и анализ документов",
      description: "Разработка и анализ любых договоров, соглашений, исков, заявлений",
      category: ['popular', 'business', 'citizens']
    },
    {
      icon: "Gavel",
      title: "Представительство и защита в суде",
      description: "Представляем ваши интересы в арбитраже и судах общей юрисдикции",
      category: ['business', 'citizens']
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description: "Расторжение договора о покупке или оформлении услуги, возврат денежных средств",
      category: ['citizens']
    },
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description: "Экспертиза и оценка ущерба после ДТП. Претензии по качеству ремонта авто. Споры с ГИБДД",
      category: ['citizens']
    },
    {
      icon: "Scale",
      title: "Споры с застройщиками",
      description: "Взыскание неустойки по ДДУ. Споры по качеству строительства",
      category: ['realestate', 'citizens']
    },
  ];

  const getFilteredServices = () => {
    if (activeTab === 'popular') {
      return allServices.filter(service => service.category.includes('popular'));
    }
    return allServices.filter(service => service.category.includes(activeTab));
  };

  const services = getFilteredServices();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(new Array(services.length).fill(true));
    }, 100);
    return () => clearTimeout(timer);
  }, [services.length]);

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
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-border transform ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4 pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon name={service.icon} className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
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