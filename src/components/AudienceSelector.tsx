import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AudienceSelectorProps {
  onSelect: (type: 'business' | 'citizens') => void;
  alwaysShow?: boolean;
}

const AudienceSelector = ({ onSelect, alwaysShow = false }: AudienceSelectorProps) => {
  const [isOpen, setIsOpen] = useState(alwaysShow);

  useEffect(() => {
    if (!alwaysShow) {
      const hasSelected = localStorage.getItem('audienceType');
      if (!hasSelected) {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
  }, [alwaysShow]);

  const handleSelect = (type: 'business' | 'citizens') => {
    localStorage.setItem('audienceType', type);
    if (!alwaysShow) {
      setIsOpen(false);
    }
    onSelect(type);
    
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103525320, 'reachGoal', `audience_${type}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 md:p-12 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Scale" size={48} className="text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              ЮрСервис НСК
            </h2>
          </div>
          <p className="text-xl font-semibold text-gray-800 mb-2">
            Юридическая компания полного цикла
          </p>
          <p className="text-lg text-gray-600">
            Выберите, кто вы:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelect('business')}
            className="group relative bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Building2" size={40} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Для бизнеса
                </h3>
                <p className="text-gray-600 mb-3">
                  Юридическое сопровождение организаций
                </p>
                <div className="text-left space-y-2">
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Арбитражные споры</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Договоры и сделки</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Банкротство</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Налоговые споры</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Абонентское обслуживание</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold mt-2">
                <span>Перейти</span>
                <Icon name="ArrowRight" size={20} />
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSelect('citizens')}
            className="group relative bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-200 hover:border-green-400 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Users" size={40} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Для граждан
                </h3>
                <p className="text-gray-600 mb-4">
                  Юридическая помощь физическим лицам
                </p>
                <div className="text-left space-y-2">
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Автоюрист: ДТП, ОСАГО</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Взыскание долгов</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Залив квартиры, ЖКХ</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Семейные споры</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Банкротство</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-semibold mt-2">
                <span>Перейти</span>
                <Icon name="ArrowRight" size={20} />
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Вы всегда сможете переключиться позже
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudienceSelector;