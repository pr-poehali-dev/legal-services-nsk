import React from 'react';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onConsultationClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onConsultationClick }) => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-red-500 text-white px-4 py-2 rounded-full inline-block text-sm font-bold mb-4">
              ⚠️ СРОК ОБЖАЛОВАНИЯ — 10 ДНЕЙ. ПРОМЕДЛЕНИЕ = ПОТЕРЯ ДЕНЕГ
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-yellow-400">
                Страховая обманула?
              </span>
              <br />
              Занизила выплату? Отказала в ОСАГО?
            </h1>
            <p className="text-xl mb-4 text-blue-100">
              <span className="font-bold text-white">Взыщем реальную сумму или вернём гонорар.</span> Работаем до победы — 500+ выигранных дел по автоспорам, средняя выплата увеличивается в 3-4 раза. Не взыскали — не платите.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} className="text-green-300" />
                <span className="text-white font-medium">Выплата в 3-4 раза больше</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} className="text-yellow-300" />
                <span className="text-white font-medium">98% выигранных дел</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-blue-300" />
                <span className="text-white font-medium">Результат за 2-4 недели</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} className="text-green-300" />
                <span className="text-white font-medium">Член Адвокатской палаты</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onConsultationClick}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={20} />
                БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ
              </button>
              <a
                href="tel:+79994523500"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-colors text-center"
              >
                +7 (999) 452-35-00
              </a>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-red-500/20 border-l-4 border-red-400 p-4 rounded-r-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" className="h-5 w-5 text-red-300" />
                  <p className="font-bold text-red-100">10 ДНЕЙ на обжалование. Пропустили срок = потеряли 50-500 тыс. ₽</p>
                </div>
              </div>
              <div className="bg-green-500/20 border-l-4 border-green-400 p-4 rounded-r-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" className="h-5 w-5 text-green-300" />
                  <p className="font-semibold text-green-100">Гарантия: Не взыскали — вернём 100% оплаты</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src="/img/d1e1ebbb-6221-40f2-8729-0a1683ff4c19.jpg"
              alt="Дмитрий Орлов - юрист по ДТП"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;