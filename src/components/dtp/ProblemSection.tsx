import React from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

const ProblemSection = () => {
  const problems = [
    {
      icon: "XCircle",
      title: "Занижают выплаты",
      description: "На 40-70% от реального ущерба",
      color: "text-red-500"
    },
    {
      icon: "Clock",
      title: "Тянут время",
      description: "Месяцами рассматривают заявления",
      color: "text-orange-500"
    },
    {
      icon: "FileX",
      title: "Отказывают",
      description: "По надуманным причинам",
      color: "text-red-600"
    },
    {
      icon: "Ban",
      title: "Неправомерное лишение",
      description: "ГИБДД нарушает процедуру оформления",
      color: "text-purple-500"
    },
    {
      icon: "Wrench",
      title: "СТО обманывает",
      description: "Некачественный ремонт за полную цену",
      color: "text-amber-500"
    },
    {
      icon: "AlertTriangle",
      title: "Незаконные штрафы",
      description: "Постановления без оснований",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-red-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-red-800 mb-4">
            Почему без юриста вы теряете деньги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Страховые компании, ГИБДД и СТО используют юридическую неграмотность автомобилистов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`${problem.color} mb-4 flex justify-center`}>
                  <Icon name={problem.icon} className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-xl border-l-4 border-yellow-500 shadow-lg">
          <div className="flex items-start gap-4">
            <Icon name="AlertTriangle" className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xl font-bold text-yellow-900 mb-2">
                Без юриста вы получите в 2-3 раза меньше денег!
              </p>
              <p className="text-yellow-800">
                Средний размер выплаты без юриста — 65 000 ₽. С юристом — 180 000 ₽. 
                Не дарите свои деньги страховым компаниям.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
