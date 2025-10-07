import React from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

const ProblemSection = () => {
  const problems = [
    {
      icon: "XCircle",
      title: "Страховая занижает выплаты?",
      problem: "Платят на 40-70% меньше реального ущерба",
      solution: "→ Взыщем полную сумму + неустойку",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: "Clock",
      title: "Страховая тянет время?",
      problem: "Месяцами не платят по ОСАГО",
      solution: "→ Получим выплату за 2-4 недели",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: "FileX",
      title: "Страховая отказала в выплате?",
      problem: "Отказ по надуманным причинам",
      solution: "→ Обжалуем и взыщем + штраф 50%",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: "Ban",
      title: "Лишают прав за алкоголь?",
      problem: "ГИБДД хочет лишить водительских прав",
      solution: "→ Защитим в суде, вернём удостоверение",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: "Wrench",
      title: "СТО сделала плохой ремонт?",
      problem: "Некачественный ремонт за полную цену",
      solution: "→ Вернём деньги или переделаем бесплатно",
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      icon: "AlertTriangle",
      title: "Незаконный штраф ГИБДД?",
      problem: "Выписали штраф или постановление незаконно",
      solution: "→ Отменим штраф и снимем баллы",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Мы решаем проблемы автомобилистов
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Если вы столкнулись с одной из этих ситуаций — мы поможем защитить ваши права и получить деньги
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((item, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
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

        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Icon name="TrendingUp" className="h-12 w-12" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-2xl font-bold mb-2">
                  С нами вы получите в 2-3 раза больше денег!
                </p>
                <p className="text-green-100 text-lg">
                  Средняя выплата без юриста — 65 000 ₽. С нашей помощью — 180 000 ₽. 
                  Первая консультация бесплатно, оплата только при успехе.
                </p>
              </div>
              <div className="flex gap-2">
                <Icon name="CheckCircle" className="h-6 w-6 text-green-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProblemSection;
