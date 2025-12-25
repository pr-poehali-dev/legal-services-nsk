import BusinessNavigation from "@/components/business/BusinessNavigation";
import BusinessFooter from "@/components/business/BusinessFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";

const BusinessServices = () => {
  const services = [
    {
      icon: "Scale",
      title: "Арбитражные споры",
      description: "Представительство в арбитражных судах всех инстанций. Защита интересов в корпоративных конфликтах, взыскание задолженности.",
      price: "от 80 000 ₽",
      color: "bg-blue-900",
      features: [
        "Досудебное урегулирование",
        "Представительство в суде первой инстанции",
        "Апелляция и кассация",
        "Исполнительное производство"
      ]
    },
    {
      icon: "FileText",
      title: "Договорное право",
      description: "Разработка, экспертиза и сопровождение исполнения договоров любой сложности. Претензионная работа.",
      price: "от 15 000 ₽",
      color: "bg-slate-700",
      features: [
        "Составление договоров",
        "Правовая экспертиза",
        "Претензионная работа",
        "Переговоры с контрагентами"
      ]
    },
    {
      icon: "DollarSign",
      title: "Банкротство компаний",
      description: "Полное сопровождение процедуры банкротства юридических лиц. Защита от банкротства. Ликвидация.",
      price: "от 150 000 ₽",
      color: "bg-blue-800",
      features: [
        "Анализ финансового состояния",
        "Подготовка документов",
        "Сопровождение процедуры",
        "Защита от кредиторов"
      ]
    },
    {
      icon: "Calculator",
      title: "Налоговые споры",
      description: "Обжалование решений ФНС, представительство при налоговых проверках, возврат переплаты.",
      price: "от 60 000 ₽",
      color: "bg-slate-800",
      features: [
        "Налоговые проверки",
        "Обжалование решений ФНС",
        "Возврат налогов",
        "Налоговое планирование"
      ]
    },
    {
      icon: "Building",
      title: "Корпоративное право",
      description: "Регистрация компаний, реорганизация, корпоративные споры, защита прав участников.",
      price: "от 30 000 ₽",
      color: "bg-blue-900",
      features: [
        "Регистрация ООО/ИП",
        "Реорганизация компаний",
        "Корпоративные споры",
        "Сделки M&A"
      ]
    },
    {
      icon: "ShieldCheck",
      title: "Абонентское обслуживание",
      description: "Комплексное юридическое сопровождение бизнеса. Личный юрист компании с приоритетной поддержкой.",
      price: "от 50 000 ₽/мес",
      color: "bg-amber-600",
      features: [
        "Безлимитные консультации",
        "Экспертиза документов",
        "Представительство интересов",
        "Приоритетная поддержка 24/7"
      ]
    },
    {
      icon: "Gavel",
      title: "Трудовые споры",
      description: "Защита работодателя в трудовых спорах. Кадровый аудит. Разработка локальных актов.",
      price: "от 40 000 ₽",
      color: "bg-slate-700",
      features: [
        "Кадровый аудит",
        "Трудовые споры в суде",
        "Локальные нормативные акты",
        "Консультации по кадрам"
      ]
    },
    {
      icon: "Home",
      title: "Недвижимость для бизнеса",
      description: "Сопровождение сделок с коммерческой недвижимостью. Аренда, купля-продажа, строительство.",
      price: "от 50 000 ₽",
      color: "bg-blue-800",
      features: [
        "Проверка объектов",
        "Сопровождение сделок",
        "Аренда помещений",
        "Строительные споры"
      ]
    },
    {
      icon: "ShieldAlert",
      title: "Защита от проверок",
      description: "Подготовка к проверкам контролирующих органов. Обжалование предписаний и постановлений.",
      price: "от 35 000 ₽",
      color: "bg-slate-800",
      features: [
        "Подготовка к проверкам",
        "Сопровождение проверок",
        "Обжалование решений",
        "Административные дела"
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="Юридические услуги для бизнеса - Полный перечень | Калуга"
        description="Арбитражные споры, договорное право, банкротство, налоговые споры, корпоративное право - полный спектр юридических услуг для бизнеса"
        keywords="юридические услуги для бизнеса, арбитражный юрист, корпоративный юрист, налоговые споры"
      />
      <BusinessNavigation />
      
      <div className="min-h-screen bg-slate-50 pt-20">
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Юридические услуги для бизнеса
              </h1>
              <p className="text-lg text-slate-300">
                Комплексная защита интересов компаний любого масштаба
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border border-slate-200 hover:border-blue-900 hover:shadow-lg transition-all group bg-white">
                  <CardHeader>
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon name={service.icon} className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                    <div className="text-2xl font-bold text-blue-900 mt-2">
                      {service.price}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-sm">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <Icon name="Check" className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-blue-900 hover:bg-blue-950 text-white">
                      Заказать услугу
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-3xl font-bold">
                    Нужна консультация по вашей ситуации?
                  </h2>
                  <p className="text-slate-300 text-lg">
                    Свяжитесь с нами для обсуждения деталей и получения индивидуального предложения
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                      <Icon name="MessageCircle" className="mr-2" />
                      Написать в WhatsApp
                    </Button>
                    <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
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

export default BusinessServices;