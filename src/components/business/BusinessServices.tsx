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
      color: "bg-blue-600",
      features: ["Споры с контрагентами", "Взыскание долгов", "Защита от исков"]
    },
    {
      icon: "FileText",
      title: "Договорное право",
      description: "Разработка и проверка договоров, контрактов, соглашений. Юридическая экспертиза документов",
      color: "bg-indigo-600",
      features: ["Составление договоров", "Экспертиза контрактов", "Претензионная работа"]
    },
    {
      icon: "DollarSign",
      title: "Банкротство",
      description: "Банкротство юридических лиц и ИП, защита от банкротства, сопровождение процедуры",
      color: "bg-purple-600",
      features: ["Банкротство ООО", "Ликвидация компаний", "Защита от кредиторов"]
    },
    {
      icon: "Calculator",
      title: "Налоговые споры",
      description: "Обжалование решений ФНС, налоговые проверки, возврат переплаты, оптимизация налогов",
      color: "bg-green-600",
      features: ["Споры с налоговой", "Налоговые проверки", "Возврат налогов"]
    },
    {
      icon: "Building",
      title: "Корпоративное право",
      description: "Регистрация компаний, реорганизация, корпоративные споры, защита прав акционеров",
      color: "bg-orange-600",
      features: ["Регистрация ООО/ИП", "Корпоративные споры", "Сделки M&A"]
    },
    {
      icon: "ShieldCheck",
      title: "Абонентское обслуживание",
      description: "Полное юридическое сопровождение бизнеса, личный юрист компании, консультации 24/7",
      color: "bg-cyan-600",
      features: ["Личный юрист", "Безлимитные консультации", "Приоритетная поддержка"]
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <div className="flex items-center gap-2 bg-blue-100 rounded-full px-6 py-2 mb-4">
              <Icon name="Briefcase" size={20} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Услуги для бизнеса</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Защита интересов вашего бизнеса
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Комплексные решения для компаний любого масштаба
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {businessServices.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-blue-600 bg-white"
            >
              <CardHeader className="space-y-4">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon name={service.icon} className="h-8 w-8 text-white" />
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
                      <Icon name="CheckCircle2" className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                  Получить консультацию
                  <Icon name="ArrowRight" className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-2xl">
          <CardContent className="p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Нужна индивидуальная консультация?
                </h3>
                <p className="text-blue-100 text-lg mb-6">
                  Обсудим вашу ситуацию и предложим оптимальное решение для вашего бизнеса
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
                    Написать в WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Icon name="Phone" className="h-5 w-5 mr-2" />
                    Позвонить
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <Icon name="Users" className="h-10 w-10 mx-auto mb-3 text-blue-200" />
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-blue-100 text-sm">Довольных клиентов</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <Icon name="Award" className="h-10 w-10 mx-auto mb-3 text-blue-200" />
                  <div className="text-3xl font-bold mb-2">92%</div>
                  <div className="text-blue-100 text-sm">Успешных дел</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <Icon name="Clock" className="h-10 w-10 mx-auto mb-3 text-blue-200" />
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100 text-sm">Поддержка</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <Icon name="Shield" className="h-10 w-10 mx-auto mb-3 text-blue-200" />
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-blue-100 text-sm">Лет опыта</div>
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
