import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "insurance-dispute",
    title: "Спор со страховой",
    description: "Страховая занижает выплату или отказывает в возмещении",
    icon: "FileText",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
    cta: "Узнать цену вопроса"
  },
  {
    id: "damage-claim",
    title: "Взыскание ущерба от ДТП",
    description: "Виновник не платит за ремонт или вред здоровью",
    icon: "Car",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    cta: "Бесплатная консультация"
  },
  {
    id: "license-alcohol",
    title: "Лишают прав за алкоголь",
    description: "Обжалование протокола и защита в суде",
    icon: "ShieldAlert",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    cta: "Оценить мои шансы"
  },
  {
    id: "illegal-fine",
    title: "Незаконный штраф ГИБДД",
    description: "Обжалование необоснованных штрафов и постановлений",
    icon: "AlertCircle",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    cta: "Узнать, как решить"
  },
  {
    id: "bad-repair",
    title: "СТО сделала плохой ремонт",
    description: "Взыскание убытков за некачественный ремонт автомобиля",
    icon: "Wrench",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    cta: "Проконсультироваться сейчас"
  }
];

const DTPLawyerChoice = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const seo = getSEOConfig('dtpChoice');

  const handleServiceClick = (serviceId: string) => {
    navigate(`/dtp-lawyer/${serviceId}`);
  };

  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Icon name="Scale" size={40} className="text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              С какой ситуацией вы столкнулись?
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Выберите вашу проблему — получите экспертную помощь и решение
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mt-8">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <span>Бесплатная консультация</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <span>Опыт 15+ лет</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <span>98% выигранных дел</span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`${service.color} border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${service.iconColor} bg-white rounded-full flex items-center justify-center mb-4 transition-transform duration-300 ${hoveredId === service.id ? 'scale-110' : ''}`}>
                    <Icon name={service.icon} size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {service.cta}
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Почему выбирают нас?
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Выигранных дел</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15 лет</div>
                  <div className="text-gray-600">Опыт работы</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">Успешных дел</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Поддержка клиентов</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white max-w-4xl mx-auto">
              <Icon name="Phone" size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Не нашли свою ситуацию?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Позвоните нам — проконсультируем по любому вопросу бесплатно
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  onClick={() => window.location.href = 'tel:+79994523500'}
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Позвонить юристу
                </Button>
                <Button 
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600 font-semibold"
                  onClick={() => window.open('https://wa.me/79994523500', '_blank')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DTPLawyerChoice;