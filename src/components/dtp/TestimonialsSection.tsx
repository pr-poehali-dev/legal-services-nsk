import React from 'react';
import Icon from '@/components/ui/icon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Алексей М.",
      text: "Страховая отказывала 8 месяцев. ЮрСервисНСК взыскал полную сумму + неустойку 180 тыс. за 2 месяца!",
      amount: "340 000 ₽",
      case: "Взыскание с РЕСО",
    },
    {
      name: "Марина К.",
      text: "Виновник скрылся с места ДТП. Нашли через суд, взыскали ущерб + моральный вред. Профессионалы!",
      amount: "220 000 ₽",
      case: "Взыскание без ОСАГО",
    },
    {
      name: "Игорь П.",
      text: "Страховая занижала выплату в 3 раза. Через суд получили полную компенсацию + судебные расходы.",
      amount: "150 000 ₽",
      case: "Доплата по КАСКО",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ОТЗЫВЫ КЛИЕНТОВ
          </h2>
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
            <Icon name="Star" size={20} className="fill-current" />
            <Icon name="Star" size={20} className="fill-current" />
            <Icon name="Star" size={20} className="fill-current" />
            <Icon name="Star" size={20} className="fill-current" />
            <Icon name="Star" size={20} className="fill-current" />
            <span className="text-gray-600 ml-2">4.9 из 5 • Основано на 127 отзывах</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span>Яндекс.Карты: 4.8</span>
            <span>•</span>
            <span>Google: 4.9</span>
            <span>•</span>
            <span>2ГИС: 4.7</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 mb-1">
                    {testimonial.case}
                  </div>
                  <div className="flex text-yellow-400">
                    <Icon name="Star" size={12} className="fill-current" />
                    <Icon name="Star" size={12} className="fill-current" />
                    <Icon name="Star" size={12} className="fill-current" />
                    <Icon name="Star" size={12} className="fill-current" />
                    <Icon name="Star" size={12} className="fill-current" />
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-green-600">
                  {testimonial.amount}
                </div>
                <div className="text-xs text-gray-500">
                  ✓ Подтвержден
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-800 font-medium underline">
            Читать все отзывы (127) →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;