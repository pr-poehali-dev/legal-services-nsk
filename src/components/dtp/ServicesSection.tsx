import React from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServicesSectionProps {
  onConsultationClick: () => void;
}

const ServicesSection = ({ onConsultationClick }: ServicesSectionProps) => {
  const services = [
    {
      icon: "Shield",
      title: "Взыскание ущерба по ОСАГО",
      description: "Добиваемся полной выплаты от страховой компании",
      price: "от 5 000 ₽",
      features: [
        "Независимая оценка ущерба",
        "Досудебная претензия",
        "Взыскание недоплаты",
        "Штрафы и неустойка до 50%",
        "Компенсация морального вреда"
      ],
      tag: "Популярное"
    },
    {
      icon: "UserX",
      title: "Взыскание вне ОСАГО",
      description: "Взыскание с виновника при отсутствии страховки",
      price: "от 7 000 ₽",
      features: [
        "Установление виновника",
        "Полная оценка всех повреждений",
        "Утрата товарной стоимости (УТС)",
        "Исковое заявление в суд",
        "Представительство в суде"
      ]
    },
    {
      icon: "Gavel",
      title: "Споры со страховыми",
      description: "Защита ваших прав при отказах страховых",
      price: "от 4 000 ₽",
      features: [
        "Обжалование отказов",
        "Пересмотр суммы выплаты",
        "Взыскание неустойки",
        "Экспертиза повреждений",
        "Судебная защита интересов"
      ]
    },
    {
      icon: "Ban",
      title: "Лишение прав",
      description: "Защита от лишения за алкогольное опьянение",
      price: "от 15 000 ₽",
      features: [
        "Анализ протокола ГИБДД",
        "Оспаривание результатов теста",
        "Защита в суде",
        "Смягчение наказания",
        "Возврат водительских прав"
      ],
      tag: "Срочно"
    },
    {
      icon: "FileText",
      title: "Административные дела",
      description: "Обжалование штрафов и постановлений ГИБДД",
      price: "от 3 000 ₽",
      features: [
        "Обжалование постановлений",
        "Отмена штрафов",
        "Снятие баллов",
        "Защита от незаконных действий",
        "Представительство в ГИБДД"
      ]
    },
    {
      icon: "Wrench",
      title: "Некачественный ремонт",
      description: "Взыскание за плохой ремонт на СТО",
      price: "от 5 000 ₽",
      features: [
        "Экспертиза качества ремонта",
        "Досудебная претензия СТО",
        "Взыскание стоимости переделки",
        "Возврат денег за услуги",
        "Компенсация убытков"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Услуги автоюриста
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Защищаем права автомобилистов по всем направлениям. Работаем на результат — оплата только при успехе.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
              {service.tag && (
                <div className="absolute -top-3 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {service.tag}
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name={service.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {service.price}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={onConsultationClick}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Получить консультацию
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Icon name="Clock" className="h-6 w-6" />
                <h3 className="text-2xl font-bold">Работаем на результат</h3>
              </div>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Оплата по факту успешного завершения дела. Если не выиграем — ничего не платите.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-300" />
                  <span>Бесплатная консультация</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-300" />
                  <span>Выезд на место ДТП 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-300" />
                  <span>Оплата от выплаты</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesSection;
