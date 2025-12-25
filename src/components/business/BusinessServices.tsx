import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const BusinessServices = () => {
  const businessServices = [
    {
      icon: "Scale",
      title: "Арбитражные споры",
      description: "Представительство в арбитражных судах всех инстанций, взыскание задолженности, корпоративные конфликты",
      color: "bg-blue-900",
      features: ["Споры с контрагентами", "Взыскание долгов", "Защита от исков"]
    },
    {
      icon: "FileText",
      title: "Договорное право",
      description: "Разработка и проверка договоров, контрактов, соглашений. Юридическая экспертиза документов",
      color: "bg-slate-700",
      features: ["Составление договоров", "Экспертиза контрактов", "Претензионная работа"]
    },
    {
      icon: "DollarSign",
      title: "Банкротство",
      description: "Банкротство юридических лиц и ИП, защита от банкротства, сопровождение процедуры",
      color: "bg-blue-800",
      features: ["Банкротство ООО", "Ликвидация компаний", "Защита от кредиторов"]
    },
    {
      icon: "Calculator",
      title: "Налоговые споры",
      description: "Обжалование решений ФНС, налоговые проверки, возврат переплаты, оптимизация налогов",
      color: "bg-slate-800",
      features: ["Споры с налоговой", "Налоговые проверки", "Возврат налогов"]
    },
    {
      icon: "Building",
      title: "Корпоративное право",
      description: "Регистрация компаний, реорганизация, корпоративные споры, защита прав акционеров",
      color: "bg-blue-900",
      features: ["Регистрация ООО/ИП", "Корпоративные споры", "Сделки M&A"]
    },
    {
      icon: "ShieldCheck",
      title: "Абонентское обслуживание",
      description: "Полное юридическое сопровождение бизнеса, личный юрист компании, консультации 24/7",
      color: "bg-amber-600",
      features: ["Личный юрист", "Безлимитные консультации", "Приоритетная поддержка"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Наши услуги
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Комплексная защита бизнеса
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Профессиональное решение юридических задач любой сложности
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {businessServices.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-900 bg-white group"
            >
              <CardHeader className="space-y-3">
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={service.icon} className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <Icon name="CheckCircle2" className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-blue-900 hover:bg-blue-950 text-white mt-4">
                  Получить консультацию
                  <Icon name="ArrowRight" className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-900 text-white border border-slate-800 shadow-xl">
          <CardContent className="p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Индивидуальная консультация
                </h3>
                <p className="text-slate-300 text-base mb-6">
                  Анализ вашей ситуации и разработка стратегии защиты интересов компании
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                    Написать в WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-amber-600 text-amber-600 bg-white hover:bg-amber-600 hover:text-white"
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Позвонить
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 text-center">
                  <Icon name="Users" className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-slate-400 text-xs">Компаний</div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 text-center">
                  <Icon name="Award" className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <div className="text-2xl font-bold mb-1">92%</div>
                  <div className="text-slate-400 text-xs">Успех</div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 text-center">
                  <Icon name="Clock" className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-slate-400 text-xs">Доступность</div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 text-center">
                  <Icon name="Shield" className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <div className="text-2xl font-bold mb-1">15+</div>
                  <div className="text-slate-400 text-xs">Лет опыта</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BusinessServices;