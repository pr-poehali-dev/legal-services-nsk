import React from 'react';
import Icon from '@/components/ui/icon';

interface ServicesSectionProps {
  onConsultationClick: () => void;
}

const ServicesSection = ({ onConsultationClick }: ServicesSectionProps) => {
  const services = [
    {
      title: "Взыскание с ОСАГО",
      description: "Полное возмещение ущерба через страховую компанию",
      price: "от 5 000 ₽",
      includes: [
        "Оценка ущерба",
        "Досудебная претензия",
        "Судебное взыскание",
        "Штрафы и неустойка",
      ],
    },
    {
      title: "Взыскание без ОСАГО",
      description: "Взыскание ущерба напрямую с виновника ДТП",
      price: "от 7 000 ₽",
      includes: [
        "Установление виновника",
        "Оценка ущерба",
        "Исковое заявление",
        "Представительство в суде",
      ],
    },
    {
      title: "Европротокол споры",
      description: "Решение конфликтов по европротоколу",
      price: "от 3 000 ₽",
      includes: [
        "Анализ документов",
        "Экспертиза",
        "Переговоры со страховой",
        "Судебная защита",
      ],
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          НАШИ УСЛУГИ ПО ДТП
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="text-2xl font-bold text-green-600 mb-6">
                {service.price}
              </div>

              <ul className="space-y-2 mb-8">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onConsultationClick}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                ЗАКАЗАТЬ УСЛУГУ
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;