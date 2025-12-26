import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const WhyUs = () => {
  const stats = [
    {
      value: "500+",
      label: "Выигранных дел",
      icon: "Award"
    },
    {
      value: "10+",
      label: "Лет опыта",
      icon: "Calendar"
    },
    {
      value: "98%",
      label: "Довольных клиентов",
      icon: "ThumbsUp"
    }
  ];

  const reasons = [
    {
      icon: "Scale",
      title: "Защита в любых инстанциях",
      description: "Представляем интересы в судах всех уровней — от районного до Верховного суда РФ"
    },
    {
      icon: "FileCheck",
      title: "Все расходы с ответчика",
      description: "Юридические услуги и судебные издержки взыскиваются с проигравшей стороны"
    },
    {
      icon: "MessageCircle",
      title: "Постоянная связь",
      description: "Вы всегда в курсе происходящего — отчёты на каждом этапе ведения дела"
    },
    {
      icon: "Users",
      title: "Команда специалистов",
      description: "Юристы узкой специализации в каждой категории дел для максимального результата"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Результаты нашей работы говорят сами за себя
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 hover:border-primary transition-colors">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name={stat.icon} className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={reason.icon} className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
