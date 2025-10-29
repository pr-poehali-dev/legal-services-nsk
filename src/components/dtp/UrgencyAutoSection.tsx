import React from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

const UrgencyAutoSection = () => {
  const urgencyItems = [
    {
      icon: "Clock",
      title: "10 дней на обжалование",
      loss: "Потеря: 50-500 тыс. ₽",
      description: "Срок обжалования отказа страховой — 10 дней. Пропустили — теряете право на доплату и неустойку. Страховая знает и намеренно тянет время.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: "Ban",
      title: "Лишение прав через 2 месяца",
      loss: "Потеря: работа + доход",
      description: "После суда у вас 10 дней на апелляцию. Не подали — лишают прав на 1,5-2 года. Потеря работы, клиентов, бизнеса. Цена промедления — сотни тысяч.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: "TrendingDown",
      title: "Неустойка растёт каждый день",
      loss: "Потеря: +1% в день",
      description: "Каждый день просрочки — это 1% от суммы долга. За 3 месяца неустойка = 90% от выплаты. Чем раньше обратитесь — тем больше получите сверху.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: "FileX",
      title: "Документы потеряются",
      loss: "Потеря: всё дело",
      description: "Страховая 'теряет' документы через 3 года. СТО удаляет акты. Свидетели забывают. Без доказательств — нет дела. Откладывание = потеря шансов на выигрыш.",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-red-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-100 text-red-700 px-6 py-2 rounded-full font-bold mb-4">
            ⏰ ВРЕМЯ РАБОТАЕТ ПРОТИВ ВАС
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Что теряете, откладывая звонок юристу
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Каждый день промедления стоит вам денег. Сроки горят — действуйте сейчас
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {urgencyItems.map((item, index) => (
            <Card key={index} className={`border-2 ${item.borderColor} hover:shadow-2xl transition-all duration-300`}>
              <CardContent className="p-6">
                <div className={`bg-gradient-to-r ${item.color} text-white rounded-xl p-6 mb-4`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon name={item.icon} className="h-8 w-8" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium opacity-90">Потери</div>
                      <div className="text-lg font-bold">{item.loss}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/30 p-4 rounded-full">
                <Icon name="AlertCircle" className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-3xl font-bold text-white mb-2">
                  Позвоните прямо сейчас — консультация бесплатно
                </p>
                <p className="text-white/90 text-lg">
                  Скажем реальные шансы, посчитаем сумму взыскания, расскажем как действовать. 
                  Не откладывайте — сроки горят каждый день.
                </p>
              </div>
              <a
                href="tel:+79994523500"
                className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-3 whitespace-nowrap"
              >
                <Icon name="Phone" size={24} />
                +7 (999) 452-35-00
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UrgencyAutoSection;
