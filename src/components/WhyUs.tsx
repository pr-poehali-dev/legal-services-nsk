import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const WhyUs = () => {
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
            Профессиональная защита ваших прав и интересов
          </p>
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