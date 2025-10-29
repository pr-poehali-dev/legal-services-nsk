import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";

const Migration = () => {
  const [showForm, setShowForm] = useState(false);

  const problems = [
    {
      icon: "FileX",
      title: "Отказ в РВП или ВНЖ",
      problem: "МВД отказывает без объяснений или по формальным причинам",
      solution: "→ Обжалуем отказ в суде, получаем разрешение",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: "XCircle",
      title: "Аннулирование РВП/ВНЖ",
      problem: "Аннулировали разрешение за нарушение миграционного учёта",
      solution: "→ Оспариваем в суде, восстанавливаем статус",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: "AlertTriangle",
      title: "Угроза депортации",
      problem: "Грозит административное выдворение из РФ",
      solution: "→ Защищаем в суде, отменяем депортацию",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: "Clock",
      title: "Нарушение миграционного учёта",
      problem: "Штраф и угроза выдворения за просрочку регистрации",
      solution: "→ Снижаем штраф, избегаем выдворения",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: "Users",
      title: "Воссоединение семьи",
      problem: "Не дают разрешение на въезд близким родственникам",
      solution: "→ Оформляем документы, получаем разрешения",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: "Award",
      title: "Получение гражданства РФ",
      problem: "Сложная процедура, отказы, длительные сроки",
      solution: "→ Сопровождаем от подачи до получения паспорта",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const services = [
    {
      title: "Получение РВП и ВНЖ",
      items: ["Консультация по документам", "Подготовка пакета документов", "Подача заявления в МВД", "Обжалование отказов в суде"],
      price: "от 15 000 ₽"
    },
    {
      title: "Получение гражданства РФ",
      items: ["Проверка оснований", "Сбор и подготовка документов", "Сопровождение процедуры", "Получение паспорта РФ"],
      price: "от 25 000 ₽"
    },
    {
      title: "Защита от депортации",
      items: ["Срочная консультация", "Представительство в суде", "Отмена постановления о выдворении", "Защита от запрета въезда"],
      price: "от 20 000 ₽"
    },
    {
      title: "Миграционный учёт",
      items: ["Оформление регистрации", "Продление регистрации", "Обжалование штрафов", "Восстановление учёта"],
      price: "от 5 000 ₽"
    }
  ];

  const urgencyItems = [
    {
      icon: "Clock",
      title: "7 дней на обжалование",
      loss: "Потеря: право на РВП/ВНЖ",
      description: "Срок обжалования отказа МВД — 7 дней. Пропустили — потеряли год или больше на повторную подачу. Документы сгорают, процедура заново.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: "AlertCircle",
      title: "Депортация = запрет въезда",
      loss: "Потеря: 5-10 лет на въезд",
      description: "Выдворили из России — запрет на въезд на 5-10 лет. Не сможете увидеть семью, работать, вернуться. Каждый день промедления снижает шансы отменить.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "XCircle",
      title: "Аннулирование = начать заново",
      loss: "Потеря: годы и деньги",
      description: "Аннулировали РВП/ВНЖ — вся процедура заново. Потеряете 1-3 года, документы, оплату госпошлин. Защита в суде — единственный шанс.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "Users",
      title: "Семья ждёт годами",
      loss: "Психологический урон",
      description: "Без РВП/ВНЖ семья не может переехать. Дети не видят родителей, супруги разлучены. Каждый месяц промедления — боль близких.",
      color: "from-gray-500 to-gray-600"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Миграционный юрист в Новосибирске | РВП, ВНЖ, гражданство РФ"
        description="Помощь в получении РВП, ВНЖ, гражданства РФ. Защита от депортации и выдворения. Обжалование отказов МВД. Консультация бесплатно."
        keywords="миграционный юрист, РВП, ВНЖ, гражданство РФ, депортация, выдворение, Новосибирск"
      />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Hero */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-6">
              <Icon name="FileText" size={48} className="text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Отказали в РВП? Грозит депортация? <br/>
              <span className="text-red-600">Потеряете годы и близких?</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              <span className="font-bold text-gray-900">Поможем получить РВП, ВНЖ, гражданство РФ.</span><br/>
              Обжалуем отказы МВД, защитим от депортации, восстановим миграционный статус. 
              Работаем быстро — сроки обжалования горят.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6"
                onClick={() => setShowForm(true)}
              >
                <Icon name="MessageCircle" size={24} className="mr-2" />
                Бесплатная консультация
              </Button>
              <a
                href="tel:+79994523500"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 rounded-lg font-bold transition-colors"
              >
                <Icon name="Phone" size={24} />
                +7 (999) 452-35-00
              </a>
            </div>
            <p className="mt-4 text-red-600 font-semibold">
              ⚠️ Важно! На обжалование отказа МВД всего 7 дней
            </p>
          </div>

          {/* Problems Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Мы решаем миграционные проблемы
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Если вы столкнулись с одной из этих ситуаций — поможем защитить права и статус
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {problems.map((item, index) => (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-400">
                  <CardContent className="p-6">
                    <div className={`${item.bgColor} p-4 rounded-lg mb-4 flex justify-center`}>
                      <Icon name={item.icon} className={`h-12 w-12 ${item.color}`} />
                    </div>
                    
                    <h3 className="font-bold text-xl mb-3 text-foreground">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                        <p className="text-sm text-red-800 font-medium">
                          ❌ {item.problem}
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                        <p className="text-sm text-green-800 font-semibold">
                          ✅ {item.solution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Urgency Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-red-50 via-white to-orange-50 -mx-4 mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-red-100 text-red-700 px-6 py-2 rounded-full font-bold mb-4">
                  ⏰ ВРЕМЯ РАБОТАЕТ ПРОТИВ ВАС
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Что теряете, откладывая обращение к юристу
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {urgencyItems.map((item, index) => (
                  <Card key={index} className="border-2 border-red-200 hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`bg-gradient-to-r ${item.color} text-white rounded-xl p-6 mb-4`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="bg-white/20 p-3 rounded-lg">
                            <Icon name={item.icon} className="h-8 w-8" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium opacity-90">Потери</div>
                            <div className="text-lg font-bold">{item.loss}</div>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold">
                          {item.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services and Pricing */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Наши услуги и цены
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="border-2 border-orange-200 hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">{service.price}</div>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-none shadow-2xl">
              <CardContent className="p-8 text-center">
                <Icon name="Phone" size={48} className="mx-auto mb-4 text-white" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  Позвоните прямо сейчас — консультация бесплатно
                </h3>
                <p className="text-xl text-white/90 mb-6">
                  Оценим ситуацию, скажем реальные сроки, расскажем как действовать. 
                  Не откладывайте — каждый день на счету.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg"
                  >
                    <Icon name="MessageCircle" size={24} className="mr-2" />
                    Заказать консультацию
                  </Button>
                  <a
                    href="tel:+79994523500"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    <Icon name="Phone" size={24} />
                    +7 (999) 452-35-00
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      
      <DTPConsultationModal showForm={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default Migration;
