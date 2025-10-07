import React from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

const ProcessSection = () => {
  const processSteps = [
    {
      step: "01",
      icon: "MessageSquare",
      title: "Бесплатная консультация",
      desc: "Анализируем документы, оцениваем перспективы дела и рассчитываем возможную сумму взыскания. Выезжаем на место ДТП 24/7."
    },
    {
      step: "02",
      icon: "FileSearch",
      title: "Сбор доказательств",
      desc: "Независимая оценка ущерба, запрос документов из ГИБДД, получение видео с камер, поиск свидетелей происшествия."
    },
    {
      step: "03",
      icon: "FileText",
      title: "Досудебная претензия",
      desc: "Направляем претензию страховой компании или виновнику. В 40% случаев вопрос решается без суда с полной выплатой."
    },
    {
      step: "04",
      icon: "Scale",
      title: "Судебное взыскание",
      desc: "Готовим иск, представляем интересы в суде. Взыскиваем полную сумму ущерба + штраф 50% + неустойку + моральный вред."
    },
    {
      step: "05",
      icon: "TrendingUp",
      title: "Исполнение решения",
      desc: "Контролируем выплату по решению суда. При необходимости работаем с приставами для принудительного взыскания."
    },
    {
      step: "06",
      icon: "CheckCircle",
      title: "Получение денег",
      desc: "Вы получаете полную сумму компенсации. Оплата наших услуг — только процент от взысканных средств. Без результата — бесплатно."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Как мы работаем
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Прозрачный процесс от консультации до получения денег. Держим в курсе на каждом этапе.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {processSteps.map((item, index) => (
            <Card key={index} className="relative hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon name={item.icon} className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Icon name="Shield" className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Работаем по договору</h3>
              <p className="text-sm text-muted-foreground">
                Официальное оформление с гарантиями
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <Icon name="Clock" className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Выезд 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Срочный выезд на место ДТП в любое время
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <Icon name="DollarSign" className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Оплата от выплаты</h3>
              <p className="text-sm text-muted-foreground">
                Платите только % от взысканных денег
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
