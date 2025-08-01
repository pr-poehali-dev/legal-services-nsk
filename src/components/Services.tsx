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
      icon: "Building2",
      title: "Корпоративное право",
      description: "Сопровождение бизнеса, договоры, споры между участниками",
      price: "от 5 000 ₽",
    },
    {
      icon: "Users",
      title: "Семейное право",
      description: "Развод, раздел имущества, алименты, опека",
      price: "от 3 000 ₽",
    },
    {
      icon: "Home",
      title: "Недвижимость",
      description: "Сделки с недвижимостью, споры с застройщиками",
      price: "от 4 000 ₽",
    },
    {
      icon: "Briefcase",
      title: "Трудовое право",
      description: "Защита трудовых прав, взыскание заработной платы",
      price: "от 2 500 ₽",
    },
    {
      icon: "Shield",
      title: "Арбитражные споры",
      description: "Защита по уголовным делам, представительство в суде",
      price: "от 8 000 ₽",
    },
    {
      icon: "FileText",
      title: "Гражданские споры",
      description: "Взыскание долгов, защита прав потребителей",
      price: "от 2 000 ₽",
    },
    {
      icon: "Car",
      title: "Споры по ДТП",
      description: "Взыскание ущерба, представительство в суде по автоавариям",
      price: "от 3 000 ₽",
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description: "Возврат некачественного товара, споры с продавцами",
      price: "от 2 000 ₽",
    },
    {
      icon: "CreditCard",
      title: "Возврат долгов",
      description: "Взыскание задолженности, работа с должниками",
      price: "от 2 500 ₽",
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
            Юридическая помощь по гражданским делам в Новосибирске
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Опытный юрист в Новосибирске поможет решить любые гражданские споры. 
            Консультация от 2000₽. 95% выигранных дел!
          </p>
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