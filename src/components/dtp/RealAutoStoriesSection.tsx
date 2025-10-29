import React from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

const RealAutoStoriesSection = () => {
  const stories = [
    {
      name: "Андрей",
      age: 42,
      profession: "водитель такси",
      problem: "Страховая предложила 43 000₽ за тотал автомобиля",
      result: "Взыскали 287 000₽",
      resultAmount: "287 000₽",
      duration: "2 месяца",
      quote: "Хотел согласиться на 43 тысячи — думал, больше не получу. Юрист показал реальную цену машины, взыскал почти 300 тысяч! Купил новый автомобиль для работы",
      increase: "в 6.7 раз больше",
      icon: "Car",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Ольга",
      age: 35,
      profession: "предприниматель",
      problem: "Отказ страховой по ОСАГО после ДТП",
      result: "Взыскали 156 000₽ + 78 000₽ неустойка",
      resultAmount: "234 000₽",
      duration: "1.5 месяца",
      quote: "Страховая отказала, сказали 'нет вины второго водителя'. Думала, всё потеряла. Юристы обжаловали отказ, доказали вину, взыскали выплату + неустойку за задержку",
      increase: "вместо 0₽",
      icon: "TrendingUp",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Сергей",
      age: 29,
      profession: "курьер",
      problem: "Лишение прав за алкоголь (0.7 промилле)",
      result: "Права сохранили, дело закрыли",
      resultAmount: "Работа сохранена",
      duration: "3 недели",
      quote: "Без прав — без работы. Терял 80 тысяч в месяц дохода + клиентов. Юрист нашёл нарушения в протоколе ГИБДД, суд закрыл дело. Продолжаю работать!",
      increase: "Доход не прерывался",
      icon: "Shield",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full font-bold mb-4">
            ✅ РЕАЛЬНЫЕ ИСТОРИИ КЛИЕНТОВ
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Они действовали — и получили результат
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Истории людей, которые не откладывали и решили свои проблемы с нашей помощью
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <Card key={index} className="border-2 border-gray-200 hover:border-green-400 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className={`bg-gradient-to-r ${story.color} text-white rounded-xl p-5 mb-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold">{story.name}, {story.age}</div>
                      <div className="text-sm opacity-90">{story.profession}</div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon name={story.icon} className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-3">
                    <div className="text-xs font-semibold mb-1 opacity-80">ПРОБЛЕМА:</div>
                    <div className="text-sm font-medium">{story.problem}</div>
                  </div>
                  
                  <div className="bg-white text-gray-900 rounded-lg p-4">
                    <div className="text-xs font-bold mb-1 text-green-600">РЕЗУЛЬТАТ:</div>
                    <div className="text-2xl font-bold text-green-600">{story.resultAmount}</div>
                    <div className="text-sm font-medium text-gray-600 mt-1">{story.increase}</div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
                  <div className="flex gap-2 mb-2">
                    <Icon name="Quote" className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-green-500" />
                    <span className="font-medium">{story.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-500" />
                    <span className="font-medium">Дело закрыто</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-green-600 to-green-700 border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Icon name="TrendingUp" className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-3xl font-bold text-white mb-2">
                  Средняя выплата увеличивается в 3-4 раза
                </p>
                <p className="text-green-100 text-lg">
                  Без юриста страховая платит минимум. С нашей помощью — реальную сумму ущерба + неустойку + штраф + моральный вред.
                  Работаем на результат — не выиграли, не платите.
                </p>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-5xl font-bold text-white mb-2">98%</div>
                <div className="text-white font-medium">выигранных дел</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RealAutoStoriesSection;
