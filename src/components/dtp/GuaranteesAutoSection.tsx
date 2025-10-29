import React from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

interface GuaranteesAutoSectionProps {
  onConsultationClick: () => void;
}

const GuaranteesAutoSection: React.FC<GuaranteesAutoSectionProps> = ({ onConsultationClick }) => {
  const guarantees = [
    {
      icon: "Shield",
      title: "Не взыскали — не платите",
      description: "Гонорар только по факту. Проиграли дело или не получили выплату — возвращаем 100% оплаты",
      badge: "Гарантия возврата",
      color: "blue"
    },
    {
      icon: "Infinity",
      title: "Работаем до победы",
      description: "Первая инстанция, апелляция, кассация — ведём дело до положительного решения без доплат",
      badge: "Все инстанции",
      color: "purple"
    },
    {
      icon: "Clock",
      title: "Ответ за 15 минут",
      description: "Не через неделю, а сейчас. Позвоните — скажем шансы, посчитаем сумму взыскания, ответим на вопросы",
      badge: "Бесплатно",
      color: "green"
    },
    {
      icon: "Lock",
      title: "100% конфиденциальность",
      description: "Адвокатская тайна — ваши данные защищены законом. Никто не узнает о вашем деле",
      badge: "По закону",
      color: "gray"
    },
    {
      icon: "FileText",
      title: "Официальный договор",
      description: "Работаем по договору с печатью. Всё прозрачно: услуги, сроки, стоимость прописаны документально",
      badge: "Юридически",
      color: "indigo"
    },
    {
      icon: "Award",
      title: "Член Адвокатской палаты",
      description: "Статус адвоката даёт больше прав в суде: доступ к делам, запросы в ГИБДД, страховые",
      badge: "Официально",
      color: "amber"
    }
  ];

  const colorClasses: Record<string, {bg: string, border: string, text: string, badge: string}> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', badge: 'bg-green-100 text-green-700' },
    gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', badge: 'bg-gray-100 text-gray-700' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-bold mb-4">
            🛡️ ЖЕЛЕЗНЫЕ ГАРАНТИИ
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Почему нам доверяют деньги и судьбы
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Работаем с полной ответственностью — ваша защита это наша репутация
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {guarantees.map((item, index) => {
            const colors = colorClasses[item.color];
            return (
              <Card key={index} className={`border-2 ${colors.border} hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${colors.bg} p-4 rounded-full flex-shrink-0`}>
                      <Icon name={item.icon} className={`h-8 w-8 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-foreground pr-2">{item.title}</h3>
                        <span className={`px-3 py-1 ${colors.badge} text-xs font-bold rounded-full whitespace-nowrap`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/30 rounded-full mb-6">
                <Icon name="Award" size={32} className="text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Узнайте ваши шансы и сумму взыскания бесплатно
              </h3>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Позвоните или оставьте заявку — проконсультируем, оценим перспективы, посчитаем реальную сумму выплаты
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onConsultationClick}
                  className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-10 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Icon name="MessageCircle" size={24} />
                  Бесплатная консультация
                </button>
                <a
                  href="tel:+79994523500"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-10 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="Phone" size={24} />
                  +7 (999) 452-35-00
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/90">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} />
                  <span>Ответ за 15 минут</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} />
                  <span>Без выезда в офис</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} />
                  <span>Работаем 24/7</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuaranteesAutoSection;
