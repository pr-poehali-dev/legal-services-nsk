import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ConsumerRightsSection = () => {
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

  return (
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
  );
};

export default ConsumerRightsSection;
