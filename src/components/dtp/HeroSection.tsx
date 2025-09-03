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
              🔥 АКЦИЯ: Первая консультация БЕСПЛАТНО
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-yellow-400">
                ВЗЫСКАЛИ БОЛЕЕ 10 МИЛЛИОНОВ
              </span>
              <br />
              по ДТП за последний год
            </h1>
            <p className="text-xl mb-4 text-blue-100">
              Артем Вячеславович — эксперт по автоправу. Специализируется на
              взыскании максимальных компенсаций по ДТП.
            </p>
            <div className="flex items-center gap-4 mb-6 text-yellow-300">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="fill-current" />
                <Icon name="Star" size={16} className="fill-current" />
                <Icon name="Star" size={16} className="fill-current" />
                <Icon name="Star" size={16} className="fill-current" />
                <Icon name="Star" size={16} className="fill-current" />
              </div>
              <span className="text-blue-200">4.9/5 • 127 отзывов</span>
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

            <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} />
                <span>Работаем по договору</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} />
                <span>Результат или возврат аванса</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} />
                <span>Член Адвокатской палаты</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                <span>Гарантия результата</span>
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