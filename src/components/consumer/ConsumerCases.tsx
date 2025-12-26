import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const ConsumerCases = () => {
  const { openModal } = useModal();
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  const cases = [
    {
      icon: "Paintbrush",
      title: "Споры по некачественному ремонту квартиры",
      description: "Застройщик или подрядчик выполнили ремонт с нарушениями: трещины, кривые стены, некачественная отделка, протечки",
      whatWeDo: [
        "Проводим строительную экспертизу дефектов",
        "Взыскиваем стоимость устранения недостатков",
        "Требуем неустойку за каждый день просрочки",
        "Компенсируем моральный вред и судебные расходы"
      ],
      results: "Возврат до 150% от стоимости ремонта + судебные расходы",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "Tv",
      title: "Защита при покупке бытовой техники",
      description: "Телевизор, холодильник, стиральная машина сломались в течение гарантии. Магазин отказывается ремонтировать или возвращать деньги",
      whatWeDo: [
        "Организуем независимую экспертизу товара",
        "Доказываем наличие заводского брака",
        "Взыскиваем полную стоимость техники",
        "Требуем неустойку 1% в день от цены товара"
      ],
      results: "Возврат 100% стоимости + неустойка + моральный вред до 5000₽",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "Car",
      title: "Споры с автосалоном по купле-продаже",
      description: "Автосалон продал машину с дефектами, скрыл информацию о ДТП, отказывается расторгать договор или не возвращает предоплату",
      whatWeDo: [
        "Проверяем юридическую чистоту сделки",
        "Проводим автотехническую экспертизу",
        "Расторгаем договор купли-продажи",
        "Взыскиваем неустойку 0,5% за каждый день просрочки"
      ],
      results: "Возврат денег за авто + неустойка до 500 000₽ + моральный вред",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "Armchair",
      title: "Защита при дефектах мебели",
      description: "Купленная мебель: диван, кухня, шкаф — имеет дефекты, несоответствие размерам, неправильную сборку или брак материала",
      whatWeDo: [
        "Фиксируем все недостатки актом и фото",
        "Проводим товароведческую экспертизу",
        "Требуем замену, ремонт или возврат денег",
        "Взыскиваем неустойку и компенсацию морального вреда"
      ],
      results: "Возврат 100% + неустойка 1% в день + моральный вред до 3000₽",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "HeartPulse",
      title: "Медицинские и косметологические услуги",
      description: "Некачественное лечение зубов, неудачная пластическая операция, осложнения после косметологии, вред здоровью",
      whatWeDo: [
        "Организуем медицинскую экспертизу качества",
        "Взыскиваем стоимость повторного лечения",
        "Компенсируем затраты на восстановление здоровья",
        "Требуем моральный вред (от 50 000₽ до 500 000₽)"
      ],
      results: "Возврат + лечение + моральный вред до 500 000₽",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      icon: "ShieldCheck",
      title: "Споры по страхованию и гарантии",
      description: "Страховая или продавец отказываются выплачивать страховку, не признают гарантийный случай, затягивают сроки ремонта",
      whatWeDo: [
        "Анализируем договор и гарантийные обязательства",
        "Доказываем страховой/гарантийный случай",
        "Взыскиваем штраф 50% от суммы требований",
        "Компенсируем все судебные расходы"
      ],
      results: "Выплата страховки + штраф 50% + судебные расходы",
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(new Array(cases.length).fill(true));
    }, 100);
    return () => clearTimeout(timer);
  }, [cases.length]);

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Icon name="Briefcase" className="h-4 w-4 mr-2" />
            Популярные кейсы
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            В каких случаях мы помогаем
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Защищаем права потребителей в самых распространенных спорах. 
            Каждый случай — это реальная возможность получить компенсацию.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary overflow-hidden ${
                visibleCards[index] 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`h-2 bg-gradient-to-r ${caseItem.gradient}`} />
              
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 bg-gradient-to-br ${caseItem.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={caseItem.icon} className="h-7 w-7 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Icon name="TrendingUp" className="h-3 w-3 mr-1" />
                    Высокий шанс
                  </Badge>
                </div>
                
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {caseItem.title}
                </CardTitle>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {caseItem.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Icon name="CheckSquare" className="h-4 w-4" />
                    Что мы делаем:
                  </p>
                  <ul className="space-y-2">
                    {caseItem.whatWeDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="ArrowRight" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-green-800 mb-1 flex items-center gap-1">
                      <Icon name="DollarSign" className="h-3 w-3" />
                      Возможный результат:
                    </p>
                    <p className="text-sm font-bold text-green-700">
                      {caseItem.results}
                    </p>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 group-hover:shadow-lg transition-all"
                    onClick={openModal}
                  >
                    <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                    Бесплатная консультация
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block bg-gradient-to-r from-primary/5 to-blue-50 border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground mb-1">
                    Не нашли свою ситуацию?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Опишите проблему — мы найдём способ защитить ваши права
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white flex-shrink-0"
                  onClick={openModal}
                >
                  <Icon name="Phone" className="h-4 w-4 mr-2" />
                  Связаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsumerCases;
