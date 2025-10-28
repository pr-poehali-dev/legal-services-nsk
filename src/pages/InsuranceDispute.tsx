import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";

const InsuranceDispute = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <SEOHead 
        title="Спор со страховой после ДТП | Юридическая помощь"
        description="Поможем получить полную выплату от страховой компании. Опыт 15+ лет, 98% выигранных дел. Бесплатная консультация."
        keywords="спор со страховой, страховая занижает выплату, ОСАГО, КАСКО"
      />
      <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Hero */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <Icon name="FileText" size={48} className="text-red-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Спор со страховой после ДТП
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Страховая занизила выплату или отказала в возмещении? <br/>
              Мы знаем, как заставить их заплатить полностью
            </p>
            <Button 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6"
              onClick={() => setShowForm(true)}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              Получить бесплатную консультацию
            </Button>
          </div>

          {/* Problems */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Типичные проблемы со страховыми
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "XCircle", text: "Занижают сумму ущерба в 2-3 раза" },
                { icon: "Clock", text: "Затягивают выплату на месяцы" },
                { icon: "FileX", text: "Отказывают по надуманным причинам" },
                { icon: "AlertTriangle", text: "Требуют лишние документы" },
                { icon: "Ban", text: "Не учитывают скрытые повреждения" },
                { icon: "DollarSign", text: "Не компенсируют утрату товарной стоимости" }
              ].map((problem, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl border-2 border-red-100 hover:border-red-300 transition-all">
                  <Icon name={problem.icon} size={28} className="text-red-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700">{problem.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Как мы решаем вашу проблему
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: "1", 
                  title: "Независимая экспертиза",
                  desc: "Проводим оценку реального ущерба с учётом всех повреждений"
                },
                { 
                  step: "2", 
                  title: "Досудебная претензия",
                  desc: "Направляем требование с юридическим обоснованием"
                },
                { 
                  step: "3", 
                  title: "Суд при необходимости",
                  desc: "Взыскиваем полную сумму + неустойку + судебные расходы"
                }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="opacity-90">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Us */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Почему с нами выгодно работать
            </h2>
            <div className="space-y-6">
              {[
                { 
                  icon: "TrendingUp", 
                  title: "Увеличиваем выплату в 3-5 раз",
                  desc: "Средняя выплата по нашим делам — 450 000 ₽ против первоначальных 120 000 ₽"
                },
                { 
                  icon: "Shield", 
                  title: "Работаем за счёт страховой",
                  desc: "Все судебные расходы и гонорар взыскиваем со страховой компании"
                },
                { 
                  icon: "Clock", 
                  title: "Быстрое решение — 30-90 дней",
                  desc: "В 70% случаев выплату получаем в досудебном порядке"
                },
                { 
                  icon: "CheckCircle", 
                  title: "Гарантия результата",
                  desc: "98% выигранных дел — взыскиваем максимальную компенсацию"
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-6 bg-white p-6 rounded-xl border-2 border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit.icon} size={28} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Info */}
          <div className="max-w-4xl mx-auto mb-16 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Icon name="BookOpen" size={28} className="text-blue-600" />
              Ваши права по закону
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Полное возмещение ущерба</strong> — страховая обязана компенсировать все расходы на восстановление автомобиля (ст. 15 ГК РФ)</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Неустойка за просрочку</strong> — 1% от суммы за каждый день задержки (ст. 16.1 ФЗ-40 об ОСАГО)</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Штраф 50%</strong> — при отказе в добровольном порядке суд взыскивает штраф в вашу пользу</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Моральный вред</strong> — при причинении вреда здоровью (ст. 151 ГК РФ)</span>
              </p>
            </div>
          </div>

          {/* Cases */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Примеры наших дел
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Volkswagen Polo — столкновение",
                  problem: "Страховая предложила: 85 000 ₽",
                  result: "Взыскали через суд: 340 000 ₽ + неустойка 95 000 ₽",
                  total: "435 000 ₽"
                },
                {
                  title: "Toyota Camry — ДТП с пострадавшими",
                  problem: "Отказ в выплате по КАСКО",
                  result: "Взыскали полную стоимость ремонта + моральный вред",
                  total: "1 240 000 ₽"
                },
                {
                  title: "Hyundai Solaris — утрата товарной стоимости",
                  problem: "Страховая не учла УТС",
                  result: "Досудебно получили доплату УТС",
                  total: "67 000 ₽"
                }
              ].map((case_item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{case_item.title}</h3>
                  <p className="text-red-600 mb-2">{case_item.problem}</p>
                  <p className="text-gray-700 mb-3">{case_item.result}</p>
                  <p className="text-2xl font-bold text-green-600">Итого: {case_item.total}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-10 text-white">
            <Icon name="Scale" size={56} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Не давайте страховой обмануть вас!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Бесплатная консультация — узнайте реальную сумму, которую должны выплатить
            </p>
            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => setShowForm(true)}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Получить консультацию юриста
            </Button>
            <p className="mt-6 text-sm opacity-75">
              Работаем по всей России • Ответ в течение 15 минут • Конфиденциально
            </p>
          </div>

        </div>
      </div>
      
      <DTPConsultationModal 
        showForm={showForm} 
        onClose={() => setShowForm(false)} 
      />
    </>
  );
};

export default InsuranceDispute;
