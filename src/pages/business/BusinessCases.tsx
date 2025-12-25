import BusinessNavigation from "@/components/business/BusinessNavigation";
import BusinessFooter from "@/components/business/BusinessFooter";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";

const BusinessCases = () => {
  const cases = [
    {
      category: "Арбитражный спор",
      title: "Взыскание 12 млн рублей с контрагента",
      client: "ООО «Строймонтаж»",
      result: "Взыскано 12 350 000 ₽ + судебные расходы",
      description: "Контрагент не выполнил обязательства по договору поставки. Провели досудебную работу, подготовили иск. Суд полностью удовлетворил требования.",
      duration: "7 месяцев",
      icon: "TrendingUp",
      color: "emerald"
    },
    {
      category: "Налоговый спор",
      title: "Отмена доначислений ФНС на 3.8 млн ₽",
      client: "ООО «ТехноПром»",
      result: "Доначисления отменены полностью",
      description: "По результатам выездной проверки ФНС доначислила 3.8 млн налогов и штрафов. Обжаловали решение, подготовили возражения, представили доказательства.",
      duration: "5 месяцев",
      icon: "Shield",
      color: "teal"
    },
    {
      category: "Банкротство",
      title: "Защита активов при банкротстве",
      client: "ООО «Логистик Плюс»",
      result: "Сохранено имущество на 8.5 млн ₽",
      description: "Компания находилась на грани банкротства. Разработали стратегию защиты активов, провели реструктуризацию, избежали ликвидации.",
      duration: "11 месяцев",
      icon: "CheckCircle2",
      color: "cyan"
    },
    {
      category: "Корпоративный конфликт",
      title: "Разрешение конфликта участников ООО",
      client: "ООО «Альфа Инвест»",
      result: "Мирное соглашение, выход участника",
      description: "Конфликт между учредителями грозил парализовать бизнес. Провели переговоры, подготовили соглашение о разделе долей и выходе одного из участников.",
      duration: "3 месяца",
      icon: "Users",
      color: "emerald"
    },
    {
      category: "Договорное право",
      title: "Расторжение невыгодного договора аренды",
      client: "ИП Соколов А.В.",
      result: "Договор расторгнут без штрафных санкций",
      description: "Арендодатель существенно нарушал условия договора. Собрали доказательную базу, направили претензию, добились расторжения без потерь для клиента.",
      duration: "2 месяца",
      icon: "FileCheck",
      color: "teal"
    },
    {
      category: "Трудовой спор",
      title: "Защита от необоснованных требований работника",
      client: "ООО «МедЦентр»",
      result: "Иск работника отклонен полностью",
      description: "Бывший сотрудник требовал компенсации 1.2 млн за незаконное увольнение. Доказали правомерность действий работодателя, суд отказал в иске.",
      duration: "4 месяца",
      icon: "Briefcase",
      color: "cyan"
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", icon: "bg-emerald-600" },
    teal: { bg: "bg-teal-50", text: "text-teal-600", icon: "bg-teal-600" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", icon: "bg-cyan-600" }
  };

  return (
    <>
      <SEOHead 
        title="Кейсы и успешные дела | Юрист для бизнеса в Калуге"
        description="Примеры успешно решенных дел: арбитражные споры, налоговые споры, банкротство, корпоративные конфликты"
        keywords="кейсы юриста, успешные дела, примеры работ, арбитраж"
      />
      <BusinessNavigation />
      
      <div className="min-h-screen bg-slate-50 pt-20">
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Успешные кейсы
              </h1>
              <p className="text-lg text-slate-300">
                Реальные примеры решения сложных юридических задач для бизнеса
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              {cases.map((case_, index) => {
                const colors = colorMap[case_.color];
                return (
                  <Card key={index} className="border border-slate-200 hover:shadow-lg transition-all bg-white">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon name={case_.icon} className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-xs font-semibold mb-2`}>
                            {case_.category}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {case_.title}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Icon name="Building" size={16} className="text-slate-400" />
                          <span>Клиент: {case_.client}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Icon name="Clock" size={16} className="text-slate-400" />
                          <span>Срок: {case_.duration}</span>
                        </div>
                      </div>

                      <p className="text-slate-700 mb-4 leading-relaxed">
                        {case_.description}
                      </p>

                      <div className={`${colors.bg} border-l-4 border-${case_.color}-600 p-4 rounded`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Award" size={18} className={colors.text} />
                          <span className={`font-semibold ${colors.text}`}>Результат</span>
                        </div>
                        <p className="text-slate-700 font-medium">{case_.result}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-3xl font-bold">
                    Хотите такой же результат?
                  </h2>
                  <p className="text-slate-300 text-lg">
                    Проконсультируем по вашей ситуации и разработаем стратегию защиты интересов
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">500+</div>
                      <div className="text-slate-400 text-sm">Выигранных дел</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">92%</div>
                      <div className="text-slate-400 text-sm">Успешность</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">15+</div>
                      <div className="text-slate-400 text-sm">Лет опыта</div>
                    </div>
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

export default BusinessCases;
