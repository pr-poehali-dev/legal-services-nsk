import Icon from "@/components/ui/icon";

const Practice = () => {
  const practices = [
    {
      icon: "Gavel",
      title: "Арбитражные споры",
      description: "Представительство в арбитражных судах всех инстанций",
      cases: "200+ дел",
    },
    {
      icon: "Scale",
      title: "Гражданские дела",
      description: "Защита гражданских прав в судах общей юрисдикции",
      cases: "180+ дел",
    },
    {
      icon: "ShieldCheck",
      title: "Административное право",
      description: "Обжалование постановлений, защита от штрафов",
      cases: "150+ дел",
    },
  ];

  return (
    <section id="practice" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Области практики
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Специализируемся на сложных делах, требующих глубоких знаний и опыта
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {practices.map((practice, index) => (
            <div key={index} className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name={practice.icon} className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {practice.title}
                </h3>
                <p className="text-muted-foreground">{practice.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                  {practice.cases}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card border border-border rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Почему выбирают нас?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircle"
                    className="h-6 w-6 text-primary mt-0.5"
                  />
                  <div>
                    <div className="font-semibold">Многолетний опыт</div>
                    <div className="text-sm text-muted-foreground">Более 2 лет успешной практики</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircle"
                    className="h-6 w-6 text-primary mt-0.5"
                  />
                  <div>
                    <div className="font-semibold">Индивидуальный подход</div>
                    <div className="text-sm text-muted-foreground">
                      Каждое дело уникально
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircle"
                    className="h-6 w-6 text-primary mt-0.5"
                  />
                  <div>
                    <div className="font-semibold">Прозрачность работы</div>
                    <div className="text-sm text-muted-foreground">
                      Полная информированность клиента
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">
                  Успешных дел
                </div>
              </div>
              <div className="bg-accent/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Поддержка клиентов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Practice;