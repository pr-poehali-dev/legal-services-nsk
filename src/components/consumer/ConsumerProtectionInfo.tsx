import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const ConsumerProtectionInfo = () => {
  const { openModal } = useModal();

  const howItWorks = [
    {
      step: "01",
      title: "Бесплатная консультация",
      description: "Анализируем вашу ситуацию, документы и перспективы дела",
      icon: "MessageCircle"
    },
    {
      step: "02",
      title: "Досудебная претензия",
      description: "Направляем претензию продавцу. 70% дел решаются на этом этапе",
      icon: "FileText"
    },
    {
      step: "03",
      title: "Судебное разбирательство",
      description: "Подаем иск, представляем интересы в суде, добиваемся максимальной компенсации",
      icon: "Scale"
    },
    {
      step: "04",
      title: "Получение денег",
      description: "Исполнительное производство, взыскание судебных расходов и компенсаций",
      icon: "CheckCircle"
    }
  ];

  const advantages = [
    {
      icon: "Award",
      title: "98% выигранных дел",
      description: "Успешная практика по защите прав потребителей"
    },
    {
      icon: "DollarSign",
      title: "Без предоплаты",
      description: "Оплата после получения результата"
    },
    {
      icon: "FileCheck",
      title: "Все расходы с ответчика",
      description: "Юридические услуги оплачивает проигравшая сторона"
    },
    {
      icon: "Clock",
      title: "Быстрое решение",
      description: "70% дел решается досудебно за 10-30 дней"
    }
  ];

  return (
    <>
      {/* How It Works */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-muted-foreground">
              Простой и прозрачный процесс защиты ваших прав
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <Card key={index} className="relative border-2 hover:border-primary transition-colors">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <CardHeader className="pt-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={item.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Advantages */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Почему выбирают нас
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Часто задаваемые вопросы
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Можно ли вернуть товар без чека?",
                a: "Да, отсутствие чека не лишает права на возврат. Доказательством покупки могут служить: свидетельские показания, выписка с банковской карты, гарантийный талон, упаковка с артикулом."
              },
              {
                q: "Сколько времени дается на возврат товара?",
                a: "Качественный товар — 14 дней (не считая дня покупки). Товар с недостатками — в течение гарантийного срока, а если он не установлен — в течение 2 лет."
              },
              {
                q: "Что делать, если продавец отказывается принимать товар?",
                a: "Направляем письменную претензию с описью вложения. Если продавец игнорирует — подаем иск в суд. По закону суд взыщет с продавца штраф 50% от суммы иска в вашу пользу."
              },
              {
                q: "Кто оплачивает юридические услуги?",
                a: "Судебные расходы, включая оплату юриста, по закону взыскиваются с проигравшей стороны. Фактически услуги юриста оплачивает продавец."
              },
              {
                q: "Какие сроки рассмотрения дела?",
                a: "Досудебная претензия — 10-30 дней (70% дел решается на этом этапе). Суд — 2-6 месяцев. Исполнительное производство — 1-3 месяца."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-3">
                    <Icon name="HelpCircle" className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Стоимость услуг
            </h2>
            <p className="text-lg text-muted-foreground">
              Прозрачные цены без скрытых платежей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Консультация</CardTitle>
                <div className="text-3xl font-bold text-primary">Бесплатно</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Включает:</p>
                <ul className="space-y-2">
                  {["Анализ ситуации", "Оценка перспектив", "План действий", "Расчет компенсации"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="h-4 w-4 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" onClick={openModal}>
                  Получить консультацию
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-xl relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                Популярно
              </Badge>
              <CardHeader>
                <CardTitle>Досудебное</CardTitle>
                <div className="text-3xl font-bold text-primary">от 5 000₽</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Включает:</p>
                <ul className="space-y-2">
                  {["Составление претензии", "Переписка с продавцом", "Экспертиза (при необходимости)", "Получение денег"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="h-4 w-4 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" onClick={openModal}>
                  Заказать услугу
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Полное ведение</CardTitle>
                <div className="text-3xl font-bold text-primary">от 10 000₽</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Включает:</p>
                <ul className="space-y-2">
                  {["Досудебная претензия", "Подача иска в суд", "Представительство в суде", "Исполнительное производство"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="h-4 w-4 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" onClick={openModal}>
                  Заказать услугу
                </Button>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            * Все судебные расходы взыскиваются с проигравшей стороны
          </p>
        </div>
      </div>
    </>
  );
};

export default ConsumerProtectionInfo;
