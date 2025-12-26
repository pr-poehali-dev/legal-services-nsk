import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ConsumerProtection = () => {
  const { openModal } = useModal();
  const [productCost, setProductCost] = useState<string>("");
  const [caseType, setCaseType] = useState<string>("");
  const [hasEvidence, setHasEvidence] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const calculateCompensation = () => {
    const cost = parseFloat(productCost);
    if (!cost || !caseType || !hasEvidence) return;

    let successChance = 0;
    const penalty = cost * 0.5; // Неустойка 50% от стоимости
    let moralDamage = 0;
    let totalCompensation = cost;

    // Расчет шансов на успех
    if (hasEvidence === "full") {
      successChance = caseType === "quality" ? 95 : caseType === "service" ? 90 : 85;
    } else if (hasEvidence === "partial") {
      successChance = caseType === "quality" ? 80 : caseType === "service" ? 75 : 70;
    } else {
      successChance = caseType === "quality" ? 60 : caseType === "service" ? 55 : 50;
    }

    // Расчет компенсаций
    if (caseType === "quality") {
      moralDamage = Math.min(cost * 0.3, 10000);
      totalCompensation = cost + penalty + moralDamage;
    } else if (caseType === "service") {
      moralDamage = Math.min(cost * 0.25, 8000);
      totalCompensation = cost + penalty + moralDamage;
    } else {
      moralDamage = Math.min(cost * 0.2, 5000);
      totalCompensation = cost + penalty + moralDamage;
    }

    setCalculationResult({
      successChance,
      refund: cost,
      penalty,
      moralDamage,
      totalCompensation,
    });
  };

  const caseTypes = [
    {
      icon: "ShoppingCart",
      title: "Некачественный товар",
      description: "Возврат или обмен товара ненадлежащего качества",
      rights: [
        "Замена на товар аналогичной марки",
        "Замена на товар другой марки с перерасчетом",
        "Соразмерное уменьшение цены",
        "Незамедлительное устранение недостатков",
        "Возврат денег за товар"
      ],
      law: "Статья 18 Закона о защите прав потребителей"
    },
    {
      icon: "Wrench",
      title: "Некачественная услуга",
      description: "Защита при оказании услуг ненадлежащего качества",
      rights: [
        "Безвозмездное устранение недостатков",
        "Уменьшение цены за выполненную работу",
        "Повторное выполнение работы",
        "Возмещение расходов на устранение недостатков",
        "Полный возврат денежных средств"
      ],
      law: "Статья 29 Закона о защите прав потребителей"
    },
    {
      icon: "AlertCircle",
      title: "Нарушение сроков",
      description: "Задержка доставки, установки или выполнения услуг",
      rights: [
        "Неустойка 0.5% за каждый день просрочки",
        "Расторжение договора",
        "Возврат уплаченной суммы",
        "Компенсация морального вреда",
        "Возмещение убытков"
      ],
      law: "Статья 23.1 Закона о защите прав потребителей"
    }
  ];

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
      <SEOHead 
        title="Защита прав потребителей в Новосибирске - возврат денег за товар и услуги"
        description="Юридическая помощь по защите прав потребителей: возврат некачественного товара, услуг, компенсация морального вреда. Бесплатная консультация."
        keywords="защита прав потребителей, возврат товара, некачественная услуга, претензия продавцу, компенсация морального вреда"
        canonical="https://юрсервиснск.рф/consumer-protection"
      />
      
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/citizens">Главная</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/services">Услуги</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Защита прав потребителей</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="text-sm">
                  <Icon name="Shield" className="h-4 w-4 mr-2" />
                  Закон на вашей стороне
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Защита прав потребителей
                </h1>
                <p className="text-lg text-muted-foreground">
                  Вернём деньги за некачественный товар или услугу. Взыщем неустойку, 
                  штраф и компенсацию морального вреда. <strong>98% выигранных дел.</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={openModal} className="bg-primary hover:bg-primary/90">
                    <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                    Бесплатная консультация
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open('tel:+79994523500', '_self')}
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    +7 999 452 35 00
                  </Button>
                </div>
              </div>

              <Card className="bg-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calculator" className="h-6 w-6 text-primary" />
                    Калькулятор компенсации
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Рассчитайте возможную сумму выплат и шансы на успех
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Стоимость товара/услуги (₽)</Label>
                    <Input 
                      type="number" 
                      placeholder="Например: 50000"
                      value={productCost}
                      onChange={(e) => setProductCost(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Тип нарушения</Label>
                    <Select value={caseType} onValueChange={setCaseType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quality">Некачественный товар</SelectItem>
                        <SelectItem value="service">Некачественная услуга</SelectItem>
                        <SelectItem value="delay">Нарушение сроков</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Наличие доказательств</Label>
                    <Select value={hasEvidence} onValueChange={setHasEvidence}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите вариант" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Полный пакет (чек, договор, фото/видео)</SelectItem>
                        <SelectItem value="partial">Частичные доказательства</SelectItem>
                        <SelectItem value="minimal">Минимальные</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={calculateCompensation}
                    disabled={!productCost || !caseType || !hasEvidence}
                  >
                    <Icon name="TrendingUp" className="h-4 w-4 mr-2" />
                    Рассчитать
                  </Button>

                  {calculationResult && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg space-y-3 border-2 border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">Шанс выигрыша:</span>
                        <Badge className="text-lg bg-green-600">
                          {calculationResult.successChance}%
                        </Badge>
                      </div>
                      <div className="border-t pt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Возврат стоимости:</span>
                          <span className="font-semibold">{calculationResult.refund.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Неустойка (50%):</span>
                          <span className="font-semibold">{calculationResult.penalty.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Моральный вред:</span>
                          <span className="font-semibold">{calculationResult.moralDamage.toLocaleString()} ₽</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between text-base font-bold text-green-700">
                          <span>ИТОГО к получению:</span>
                          <span>{calculationResult.totalCompensation.toLocaleString()} ₽</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        * Предварительный расчет. Точная сумма зависит от обстоятельств дела.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Your Rights Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ваши права как потребителя
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                По закону РФ вы можете требовать компенсацию в следующих случаях
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {caseTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={type.icon} className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary">Вы можете требовать:</p>
                      <ul className="space-y-1">
                        {type.rights.map((right, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Icon name="CheckCircle" className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{right}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <Icon name="Scale" className="h-3 w-3 inline mr-1" />
                        {type.law}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

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

        {/* Final CTA */}
        <div className="py-20 bg-gradient-to-r from-primary to-blue-600">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur border-none shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold">
                    Не дайте нарушить ваши права!
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Бесплатная консультация за 15 минут. Узнайте, сколько денег вы можете получить 
                    и какие у вас шансы на успех.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={openModal}
                    >
                      <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                      Получить консультацию
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => window.open('tel:+79994523500', '_self')}
                    >
                      <Icon name="Phone" className="h-5 w-5 mr-2" />
                      +7 999 452 35 00
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 pt-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="h-5 w-5 text-primary" />
                      <span>Ответ в течение часа</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" className="h-5 w-5 text-primary" />
                      <span>Конфиденциальность</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Award" className="h-5 w-5 text-primary" />
                      <span>98% выигранных дел</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ConsumerProtection;
