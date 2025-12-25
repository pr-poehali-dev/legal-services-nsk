import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import { useDynamicSEO } from "@/hooks/useDynamicSEO";

const Services = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const { openModal } = useModal();
  const seo = getSEOConfig('services');
  
  useDynamicSEO();

  const tabs = [
    { id: "popular", label: "ПОПУЛЯРНЫЕ" },
    { id: "citizens", label: "УСЛУГИ ДЛЯ ГРАЖДАН" },
    { id: "business", label: "УСЛУГИ ДЛЯ БИЗНЕСА" },
    { id: "realestate", label: "НЕДВИЖИМОСТЬ" },
    { id: "bankruptcy", label: "БАНКРОТСТВО" },
  ];

  const allServices = [
    {
      icon: "Users",
      title: "Семейный юрист",
      description: "Развод, раздел имущества, алименты, опека",
      category: ["popular", "citizens"],
      price: "от 15 000₽",
      duration: "1-3 месяца"
    },
    {
      icon: "TrendingDown",
      title: "Банкротство физических лиц",
      description: "Процедура банкротства для граждан, списание долгов",
      category: ["popular", "bankruptcy", "citizens"],
      price: "от 50 000₽",
      duration: "6-12 месяцев"
    },
    {
      icon: "Home",
      title: "Недвижимость и перепланировки",
      description: "Сделки с недвижимостью, узаконивание перепланировок",
      category: ["popular", "realestate"],
      price: "от 20 000₽",
      duration: "1-4 месяца"
    },
    {
      icon: "CreditCard",
      title: "Взыскание долгов",
      description: "Взыскание задолженности, работа с должниками",
      category: ["popular", "business", "citizens"],
      price: "от 15 000₽",
      duration: "2-6 месяцев"
    },
    {
      icon: "FileText",
      title: "Составление и анализ документов",
      description: "Подготовка договоров, анализ документации, правовая экспертиза",
      category: ["popular", "business", "citizens"],
      price: "от 5 000₽",
      duration: "1-5 дней"
    },
    {
      icon: "Shield",
      title: "Представительство и защита в суде",
      description: "Представительство интересов в судах всех инстанций",
      category: ["popular", "business", "citizens"],
      price: "от 30 000₽",
      duration: "3-24 месяца"
    },
    {
      icon: "ShieldCheck",
      title: "Защита прав потребителей",
      description: "Возврат некачественного товара, споры с продавцами",
      category: ["popular", "citizens"],
      price: "от 10 000₽",
      duration: "1-6 месяцев"
    },
    {
      icon: "Car",
      title: "Автоюрист. Споры по ДТП",
      description: "Взыскание ущерба, представительство в суде по автоавариям",
      category: ["popular", "citizens"],
      price: "от 18 000₽",
      duration: "2-12 месяцев"
    },
    {
      icon: "Building",
      title: "Споры с застройщиками",
      description: "Защита прав дольщиков, взыскание неустойки, возврат средств",
      category: ["popular", "realestate", "citizens"],
      price: "от 25 000₽",
      duration: "6-18 месяцев"
    },
    {
      icon: "Briefcase",
      title: "Трудовое право",
      description: "Защита трудовых прав, взыскание заработной платы",
      category: ["citizens"],
      price: "от 8 000₽",
      duration: "1-8 месяцев"
    },
    {
      icon: "Building",
      title: "Банкротство юридических лиц",
      description: "Ликвидация предприятий, банкротство организаций",
      category: ["bankruptcy", "business"],
      price: "от 80 000₽",
      duration: "12-24 месяца"
    },
    {
      icon: "MapPin",
      title: "Земельное право",
      description: "Оформление земельных участков, споры по межеванию",
      category: ["realestate"],
      price: "от 15 000₽",
      duration: "1-6 месяцев"
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
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Наши услуги
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Предоставляем полный спектр юридических услуг для физических лиц и предприятий. 
            Прозрачные цены, профессиональное качество, гарантия результата.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border group"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Стоимость:</span>
                    <Badge variant="secondary" className="text-lg font-semibold text-primary">
                      {service.price}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Срок:</span>
                    <span className="text-sm font-medium">{service.duration}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => openModal()}
                >
                  <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                  Получить консультацию
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Не нашли нужную услугу?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Мы предоставляем индивидуальные решения для сложных юридических задач. 
              Обратитесь за персональной консультацией.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
              onClick={() => openModal()}
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Персональная консультация
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Services;