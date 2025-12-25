import BusinessNavigation from "@/components/business/BusinessNavigation";
import BusinessFooter from "@/components/business/BusinessFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";

const BusinessPricing = () => {
  const plans = [
    {
      name: "Базовый",
      price: "50 000 ₽",
      period: "месяц",
      description: "Для малого бизнеса и стартапов",
      color: "emerald",
      features: [
        "До 10 часов консультаций",
        "Экспертиза до 5 документов",
        "Телефонная поддержка",
        "Ответ в течение 24 часов",
        "Досудебная работа"
      ]
    },
    {
      name: "Профессиональный",
      price: "90 000 ₽",
      period: "месяц",
      description: "Для среднего бизнеса",
      color: "teal",
      popular: true,
      features: [
        "До 20 часов консультаций",
        "Безлимитная экспертиза документов",
        "Поддержка 24/7",
        "Ответ в течение 4 часов",
        "Представительство в суде",
        "Личный юрист",
        "Кадровый аудит"
      ]
    },
    {
      name: "Корпоративный",
      price: "от 150 000 ₽",
      period: "месяц",
      description: "Для крупных компаний",
      color: "cyan",
      features: [
        "Безлимитные консультации",
        "Полное юридическое сопровождение",
        "Команда юристов",
        "Приоритетная поддержка 24/7",
        "Все виды споров",
        "Выделенный юрист в офисе",
        "Корпоративное обучение"
      ]
    }
  ];

  const services = [
    { name: "Консультация юриста", price: "5 000 ₽", unit: "час" },
    { name: "Составление договора", price: "от 15 000 ₽", unit: "" },
    { name: "Экспертиза договора", price: "от 10 000 ₽", unit: "" },
    { name: "Досудебная претензия", price: "от 8 000 ₽", unit: "" },
    { name: "Исковое заявление", price: "от 25 000 ₽", unit: "" },
    { name: "Представительство в суде", price: "от 30 000 ₽", unit: "заседание" },
    { name: "Обжалование решения суда", price: "от 40 000 ₽", unit: "" },
    { name: "Регистрация ООО", price: "от 15 000 ₽", unit: "" },
    { name: "Кадровый аудит", price: "от 30 000 ₽", unit: "" },
    { name: "Налоговая проверка", price: "от 60 000 ₽", unit: "" }
  ];

  const colorMap: Record<string, { border: string; bg: string; text: string; button: string }> = {
    emerald: { border: "border-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", button: "bg-emerald-600 hover:bg-emerald-700" },
    teal: { border: "border-teal-500", bg: "bg-teal-50", text: "text-teal-600", button: "bg-teal-600 hover:bg-teal-700" },
    cyan: { border: "border-cyan-500", bg: "bg-cyan-50", text: "text-cyan-600", button: "bg-cyan-600 hover:bg-cyan-700" }
  };

  return (
    <>
      <SEOHead 
        title="Тарифы и цены на юридические услуги для бизнеса | Калуга"
        description="Прозрачные цены на юридическое сопровождение бизнеса. Абонентское обслуживание и разовые услуги"
        keywords="цены на юридические услуги, тарифы юриста, стоимость абонентского обслуживания"
      />
      <BusinessNavigation />
      
      <div className="min-h-screen bg-slate-50 pt-20">
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Тарифы и цены
              </h1>
              <p className="text-lg text-slate-300">
                Прозрачное ценообразование для вашего бизнеса
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Абонентское обслуживание
              </h2>
              <p className="text-slate-600">
                Комплексная юридическая поддержка вашего бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {plans.map((plan, index) => {
                const colors = colorMap[plan.color];
                return (
                  <Card 
                    key={index} 
                    className={`relative ${plan.popular ? `border-2 ${colors.border} shadow-xl` : 'border border-slate-200'} bg-white`}
                  >
                    {plan.popular && (
                      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${colors.bg} ${colors.text} px-6 py-1 rounded-full text-sm font-semibold`}>
                        Популярный
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl text-slate-900 mb-2">{plan.name}</CardTitle>
                      <p className="text-sm text-slate-600 mb-4">{plan.description}</p>
                      <div>
                        <div className="text-4xl font-bold text-slate-900">{plan.price}</div>
                        <div className="text-slate-500 text-sm">/ {plan.period}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <Icon name="Check" className={`h-5 w-5 ${colors.text} flex-shrink-0`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full ${colors.button} text-white`}>
                        Выбрать тариф
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Разовые услуги
              </h2>
              <p className="text-slate-600">
                Цены на отдельные юридические услуги
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border border-slate-200">
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-200">
                    {services.map((service, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name="CheckCircle2" className="h-5 w-5 text-emerald-600" />
                          <span className="text-slate-900 font-medium">{service.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900">{service.price}</div>
                          {service.unit && (
                            <div className="text-xs text-slate-500">{service.unit}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-700">
                    <p className="font-semibold text-slate-900 mb-1">Индивидуальный расчет</p>
                    <p>
                      Точная стоимость услуг определяется после анализа вашей ситуации. 
                      Первая консультация — бесплатно.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-3xl font-bold">
                    Получите персональное предложение
                  </h2>
                  <p className="text-slate-300 text-lg">
                    Свяжитесь с нами для расчета стоимости под ваши задачи
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      <Icon name="MessageCircle" className="mr-2" />
                      Написать в WhatsApp
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                      <Icon name="Phone" className="mr-2" />
                      Позвонить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <BusinessFooter />
      </div>
    </>
  );
};

export default BusinessPricing;
