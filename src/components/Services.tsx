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

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(new Array(services.length).fill(true));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: "TrendingUp",
      title: "Сопровождение бизнеса",
      description: "Комплексное юридическое обслуживание. Правовой аудит",
      price: "от 25 000 ₽",
    },
    {
      icon: "Users",
      title: "Семейный юрист",
      description: "Бракоразводный процесс, алименты, установление отцовства",
      price: "от 15 000 ₽",
    },
    {
      icon: "Users",
      title: "Банкротство и ликвидация юр. лиц",
      description: "Анализ ситуации, подготовка документов, публикации в СМИ, уведомление кредиторов",
      price: "от 35 000 ₽",
    },
    {
      icon: "Settings",
      title: "Банкротство физических лиц",
      description: "Анализ ситуации, подготовка документов, публикации в СМИ, уведомление кредиторов",
      price: "от 30 000 ₽",
    },
    {
      icon: "Building",
      title: "Недвижимость и перепланировки",
      description: "Оформление и сопровождение сделок по недвижимости. Узаконивание перепланировок",
      price: "от 20 000 ₽",
    },
    {
      icon: "CreditCard",
      title: "Взыскание долгов",
      description: "Взыскание дебиторской задолженности, долгов по договорам и распискам",
      price: "от 12 000 ₽",
    },
    {
      icon: "Building2",
      title: "Регистрация бизнеса",
      description: "Регистрация ООО, ИП и другие процедуры",
      price: "от 8 000 ₽",
    },
    {
      icon: "FileText",
      title: "Составление и анализ документов",
      description: "Разработка и анализ любых договоров, соглашений, исков, заявлений",
      price: "от 5 000 ₽",
    },
    {
      icon: "Gavel",
      title: "Представительство и защита в суде",
      description: "Представляем ваши интересы в арбитраже и судах общей юрисдикции",
      price: "от 20 000 ₽",
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description: "Расторжение договора о покупке или оформлении услуги, возврат денежных средств",
      price: "от 10 000 ₽",
    },
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description: "Экспертиза и оценка ущерба после ДТП. Претензии по качеству ремонта авто. Споры с ГИБДД",
      price: "от 15 000 ₽",
    },
    {
      icon: "Scale",
      title: "Споры с застройщиками",
      description: "Взыскание неустойки по ДДУ. Споры по качеству строительства",
      price: "от 18 000 ₽",
    },
  ];

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
        <div className="text-center space-y-4 mb-16">
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