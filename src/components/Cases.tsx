import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Cases = () => {
  const cases = [
    {
      title: "Корпоративный спор о выделе доли",
      amount: "15 млн ₽",
      description:
        "Успешно защитили интересы участника ООО, взыскали компенсацию за принудительный выкуп доли",
      result: "Победа в суде",
    },
    {
      title: "Семейный спор о разделе имущества",
      amount: "8 млн ₽",
      description:
        "Добились справедливого раздела совместно нажитого имущества супругов",
      result: "Мировое соглашение",
    },
    {
      title: "Трудовой спор о восстановлении",
      amount: "450 тыс. ₽",
      description:
        "Восстановили незаконно уволенного сотрудника, взыскали компенсацию морального вреда",
      result: "Полное восстановление",
    },
  ];

  const testimonials = [
    {
      name: "Анна Петрова",
      role: "Директор ООО",
      text: "Профессиональный подход, четкая стратегия и отличный результат. Рекомендую!",
      rating: 5,
    },
    {
      name: "Михаил Иванов",
      role: "Частный клиент",
      text: "Помогли решить сложную семейную ситуацию. Спасибо за поддержку и понимание.",
      rating: 5,
    },
    {
      name: "ООО 'ТехСервис'",
      role: "Корпоративный клиент",
      text: "Постоянно сотрудничаем уже 3 года. Всегда качественно и в срок.",
      rating: 5,
    },
  ];

  return (
    <section id="cases" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Success Cases */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Успешные кейсы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Примеры наших побед в суде и достигнутых результатов для клиентов
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {cases.map((case_, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Icon name="Trophy" className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold text-primary">
                    {case_.amount}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {case_.title}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {case_.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <Icon name="CheckCircle" className="h-4 w-4 mr-1" />
                  {case_.result}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
            Отзывы клиентов
          </h3>
          <p className="text-muted-foreground">Что говорят о нашей работе</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      className="h-5 w-5 text-accent fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
                <div className="space-y-1">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
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

export default Cases;
