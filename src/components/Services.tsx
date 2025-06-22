import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import ServiceModal from "./ServiceModal";

const Services = () => {
  const { openModal } = useModal();
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const services = [
    {
      icon: "Building",
      title: "Корпоративное право",
      description:
        "Регистрация и ликвидация компаний, корпоративные споры, сделки M&A",
      features: [
        "Регистрация ООО/АО",
        "Корпоративные споры",
        "Реорганизация бизнеса",
      ],
      price: "от 15 000 ₽",
    },
    {
      icon: "Heart",
      title: "Семейное право",
      description: "Развод, алименты, раздел имущества, усыновление",
      features: [
        "Бракоразводные процессы",
        "Раздел имущества",
        "Защита прав детей",
      ],
      price: "от 8 000 ₽",
    },
    {
      icon: "Home",
      title: "Недвижимость",
      description: "Сопровождение сделок, оформление права собственности",
      features: ["Купля-продажа", "Оформление наследства", "Жилищные споры"],
      price: "от 12 000 ₽",
    },
    {
      icon: "Users",
      title: "Трудовое право",
      description:
        "Защита трудовых прав, оформление документов, споры с работодателем",
      features: [
        "Трудовые споры",
        "Восстановление на работе",
        "Взыскание зарплаты",
      ],
      price: "от 6 000 ₽",
    },
    {
      icon: "ShieldCheck",
      title: "Уголовная защита",
      description: "Защита по уголовным делам, представительство в суде",
      features: [
        "Защита в суде",
        "Обжалование приговоров",
        "Досудебная защита",
      ],
      price: "от 25 000 ₽",
    },
    {
      icon: "FileText",
      title: "Административное право",
      description: "Обжалование штрафов, защита от административных наказаний",
      features: [
        "Обжалование штрафов",
        "Лишение прав",
        "Административные споры",
      ],
      price: "от 5 000 ₽",
    },
  ];

  return (
    <section id="services" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Наши услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Полный спектр юридических услуг для физических лиц и бизнеса
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleServiceClick(service)}
            >
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <Icon name={service.icon} className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Icon
                        name="CheckCircle"
                        className="h-4 w-4 text-primary mr-2"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-semibold text-lg text-primary">
                    {service.price}
                  </span>
                  <Button variant="outline" size="sm" onClick={openModal}>
                    Консультация
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ServiceModal
          service={selectedService}
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
        />

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={openModal}
          >
            <Icon name="Phone" className="h-5 w-5 mr-2" />
            Получить бесплатную консультацию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
