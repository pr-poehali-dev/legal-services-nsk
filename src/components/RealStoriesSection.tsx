import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";

const RealStoriesSection = () => {
  const stories = [
    {
      name: "Ирина С.",
      age: "38 лет, мама двоих детей",
      problem: "Страховая предложила 95 000₽ за разбитую машину",
      result: "Взыскали через суд 487 000₽ + неустойку 143 000₽",
      total: "630 000₽",
      quote: "Я уже хотела согласиться на их 95 тысяч. Хорошо, что обратилась к юристам — получила в 6 раз больше!",
      icon: "Car",
      color: "bg-blue-600"
    },
    {
      name: "Сергей М.",
      age: "42 года, инженер",
      problem: "Уволили за прогул, хотя был на больничном",
      result: "Восстановили на работе, взыскали зарплату за вынужденный прогул и моральный вред",
      total: "380 000₽",
      quote: "Работодатель говорил, что я ничего не докажу. Через месяц вернулся на работу с компенсацией",
      icon: "Briefcase",
      color: "bg-purple-600"
    },
    {
      name: "Анна и Дмитрий К.",
      age: "Супруги, бизнесмены",
      problem: "Мошенники оформили квартиру на себя через поддельную доверенность",
      result: "Признали сделку недействительной, вернули квартиру, мошенники под следствием",
      total: "5.2 млн₽",
      quote: "Думали, что всё потеряли. Юристы действовали быстро — квартиру вернули через 4 месяца",
      icon: "Home",
      color: "bg-red-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Реальные истории наших клиентов
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Такие же люди, как вы — столкнулись с проблемой и решили её
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="border-2 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 ${story.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon name={story.icon} size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-500">{story.age}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                    <p className="text-sm font-semibold text-red-900 mb-1">Проблема:</p>
                    <p className="text-gray-700">{story.problem}</p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                    <p className="text-sm font-semibold text-green-900 mb-1">Результат:</p>
                    <p className="text-gray-700">{story.result}</p>
                  </div>

                  <div className="text-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                    <p className="text-sm text-blue-100">Получили</p>
                    <p className="text-3xl font-bold text-white">{story.total}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <Icon name="Quote" size={24} className="text-gray-400 mb-2" />
                    <p className="text-gray-700 italic leading-relaxed">"{story.quote}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border-2 border-green-200 rounded-full">
            <Icon name="CheckCircle" size={24} className="text-green-600" />
            <p className="text-gray-700">
              <span className="font-bold text-green-700">98% наших клиентов</span> получают положительный результат
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealStoriesSection;
