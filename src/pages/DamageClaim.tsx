import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";

const DamageClaim = () => {
  const [showForm, setShowForm] = useState(false);
  const seo = getSEOConfig('damageClaim');

  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Hero */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-6">
              <Icon name="Car" size={48} className="text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Взыскание ущерба от ДТП
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Виновник не платит за ремонт? Ущерб больше лимита ОСАГО? <br/>
              Взыщем полную сумму с виновника через суд
            </p>
            <Button 
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6"
              onClick={() => setShowForm(true)}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              Бесплатная консультация юриста
            </Button>
          </div>

          {/* Situations */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Когда взыскиваем ущерб с виновника
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: "BanknoteIcon", 
                  title: "Ущерб превышает лимит ОСАГО",
                  desc: "Страховая выплатила максимум (400 000 ₽), но реальный ущерб больше"
                },
                { 
                  icon: "UserX", 
                  title: "У виновника нет страховки",
                  desc: "Водитель без полиса ОСАГО или полис просрочен"
                },
                { 
                  icon: "AlertCircle", 
                  title: "Страховка виновника не покрывает",
                  desc: "Алкогольное опьянение, грубое нарушение ПДД, умышленное ДТП"
                },
                { 
                  icon: "Heart", 
                  title: "Вред здоровью",
                  desc: "Моральный вред, утраченный заработок, расходы на лечение"
                },
                { 
                  icon: "Package", 
                  title: "Повреждён груз или имущество",
                  desc: "В аварии пострадали перевозимые вещи, техника, товар"
                },
                { 
                  icon: "Clock", 
                  title: "Потеря дохода из-за простоя",
                  desc: "Такси, грузоперевозки — компенсация упущенной выгоды"
                }
              ].map((situation, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={situation.icon} size={24} className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{situation.title}</h3>
                      <p className="text-gray-600">{situation.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Как мы взыскиваем ущерб
            </h2>
            <div className="space-y-6">
              {[
                { 
                  num: "01", 
                  title: "Оценка ущерба",
                  desc: "Независимая экспертиза всех повреждений + утрата товарной стоимости"
                },
                { 
                  num: "02", 
                  title: "Досудебная претензия",
                  desc: "Направляем виновнику требование с расчётом и правовым обоснованием"
                },
                { 
                  num: "03", 
                  title: "Подача иска в суд",
                  desc: "Готовим документы, представляем ваши интересы на всех заседаниях"
                },
                { 
                  num: "04", 
                  title: "Взыскание по решению",
                  desc: "Работаем с приставами, добиваемся реального получения денег"
                }
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold opacity-50">{step.num}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="opacity-90">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Claim */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Что мы взыскиваем
            </h2>
            <div className="bg-white rounded-2xl p-8 border-2 border-orange-200">
              <div className="space-y-4">
                {[
                  { item: "Стоимость ремонта автомобиля", amount: "по экспертизе" },
                  { item: "Утрата товарной стоимости (УТС)", amount: "5-15% от стоимости авто" },
                  { item: "Эвакуатор и хранение на штрафстоянке", amount: "фактические расходы" },
                  { item: "Упущенная выгода (для коммерческого транспорта)", amount: "расчёт по доходам" },
                  { item: "Моральный вред при вреде здоровью", amount: "от 100 000 ₽" },
                  { item: "Расходы на лечение и восстановление", amount: "по документам" },
                  { item: "Судебные расходы и госпошлина", amount: "полностью" },
                  { item: "Услуги юриста", amount: "взыскиваем с ответчика" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                    <span className="text-gray-700 font-medium">{item.item}</span>
                    <span className="text-orange-600 font-bold">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Base */}
          <div className="max-w-4xl mx-auto mb-16 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Icon name="BookOpen" size={28} className="text-blue-600" />
              Правовая основа
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 1064 ГК РФ</strong> — вред, причинённый имуществу, подлежит возмещению в полном объёме</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 1079 ГК РФ</strong> — владелец источника повышенной опасности (автомобиля) отвечает за причинённый вред</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 1072 ГК РФ</strong> — право регресса к лицу, причинившему вред</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 151, 1101 ГК РФ</strong> — компенсация морального вреда при повреждении здоровья</span>
              </p>
            </div>
          </div>

          {/* Real Cases */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Реальные кейсы
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Лобовое столкновение — Mercedes E-класс",
                  situation: "Виновник без страховки, ущерб 1 850 000 ₽",
                  result: "Взыскали через суд полную сумму + моральный вред 200 000 ₽ + судебные расходы",
                  total: "2 127 000 ₽",
                  duration: "Срок: 5 месяцев"
                },
                {
                  title: "ДТП с грузовиком — повреждён товар",
                  situation: "Испорчена партия электроники на 2 млн ₽",
                  result: "Взыскали стоимость груза + упущенную выгоду + простой транспорта",
                  total: "2 640 000 ₽",
                  duration: "Срок: 7 месяцев"
                },
                {
                  title: "Такси — авто в ремонте 45 дней",
                  situation: "Водитель потерял доход из-за простоя",
                  result: "Взыскали ремонт + упущенную выгоду (1500 ₽/день × 45 дней)",
                  total: "312 000 ₽",
                  duration: "Срок: 3 месяца"
                }
              ].map((case_item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{case_item.title}</h3>
                  <p className="text-red-600 mb-2">{case_item.situation}</p>
                  <p className="text-gray-700 mb-3">{case_item.result}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-green-600">{case_item.total}</p>
                    <p className="text-sm text-gray-500">{case_item.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-10 text-white">
            <Icon name="Scale" size={56} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Получите полную компенсацию ущерба
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Бесплатная оценка перспектив дела и расчёт суммы взыскания
            </p>
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => setShowForm(true)}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Проконсультироваться с юристом
            </Button>
            <p className="mt-6 text-sm opacity-75">
              Опыт 15+ лет • 98% выигранных дел • Работаем по всей России
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

export default DamageClaim;