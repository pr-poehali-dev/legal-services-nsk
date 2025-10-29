import React from 'react';
import Icon from '@/components/ui/icon';

interface CTASectionProps {
  onConsultationClick: () => void;
}

const CTASection = ({ onConsultationClick }: CTASectionProps) => {
  return (
    <>
      {/* Urgency Section */}
      <section className="py-8 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Clock" size={24} />
            <span className="text-xl font-bold">ВНИМАНИЕ! СРОКИ ИСКОВОЙ ДАВНОСТИ ОГРАНИЧЕНЫ</span>
          </div>
          <p className="text-lg">
            На взыскание по ОСАГО: <strong>3 года</strong> • На взыскание с виновника: <strong>3 года</strong>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            НE ТЕРЯЙТЕ ВРЕМЯ! КАЖДЫЙ ДЕНЬ ПРОМЕДЛЕНИЯ - ЭТО ПОТЕРЯННЫЕ ДЕНЬГИ
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Бесплатная консультация в течение 24 часов. Узнайте реальную сумму
            компенсации по вашему ДТП.
          </p>

          <div className="bg-white p-6 rounded-lg mb-8 inline-block">
            <div className="flex items-center gap-4 text-green-600 font-bold">
              <Icon name="Users" size={20} />
              <span>Сегодня уже обратились: 12 человек</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onConsultationClick}
              className="bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors relative"
            >
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                БЕСПЛАТНО
              </div>
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            </button>
            <a
              href="tel:+79994523500"
              className="text-blue-900 hover:text-blue-700 transition-colors"
            >
              <div className="font-bold text-2xl">+7 (999) 452-35-00</div>
              <div className="text-sm flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Работаем 24/7
              </div>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-blue-900">
            <div className="flex items-center justify-center gap-2">
              <Icon name="Shield" size={16} />
              <span className="text-sm">Конфиденциально</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm">Ответ за 15 минут</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm">Без обязательств</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;