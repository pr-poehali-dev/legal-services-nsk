import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";
import ContactBar from "@/components/dtp/ContactBar";

const LicenseAlcohol = () => {
  const [showForm, setShowForm] = useState(false);
  const seo = getSEOConfig('licenseAlcohol');

  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Hero */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6">
              <Icon name="ShieldAlert" size={48} className="text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Лишают прав за алкоголь?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Защитим ваши права в суде. Обжалуем протокол и добьёмся оправдания <br/>
              или минимального наказания
            </p>
            <Button 
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
              onClick={() => setShowForm(true)}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              Срочная консультация юриста
            </Button>
            <p className="mt-4 text-red-600 font-semibold">
              ⚠️ Важно! На подготовку защиты есть всего 10 дней до суда
            </p>
          </div>

          {/* Punishment */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
                <Icon name="AlertTriangle" size={32} className="text-red-600" />
                Что грозит по закону
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-red-600">Управление в состоянии опьянения (ч.1 ст. 12.8 КоАП)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Icon name="XCircle" size={18} className="text-red-500 flex-shrink-0 mt-1" />
                      <span>Лишение прав на <strong>1,5 — 2 года</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="XCircle" size={18} className="text-red-500 flex-shrink-0 mt-1" />
                      <span>Штраф <strong>30 000 ₽</strong></span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-red-600">Отказ от медосвидетельствования (ч.1 ст. 12.26 КоАП)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Icon name="XCircle" size={18} className="text-red-500 flex-shrink-0 mt-1" />
                      <span>Лишение прав на <strong>1,5 — 2 года</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="XCircle" size={18} className="text-red-500 flex-shrink-0 mt-1" />
                      <span>Штраф <strong>30 000 ₽</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-red-100 p-4 rounded-lg text-center">
                <p className="text-red-800 font-bold">
                  Повторное нарушение в течение года — уголовная ответственность по ст. 264.1 УК РФ!
                </p>
              </div>
            </div>
          </div>

          {/* Defense Strategies */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Как мы защищаем от лишения прав
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: "FileSearch", 
                  title: "Проверка процедуры",
                  desc: "Анализируем протокол на нарушения: отсутствие понятых, неправильное оформление, нарушение сроков"
                },
                { 
                  icon: "ClipboardCheck", 
                  title: "Экспертиза прибора",
                  desc: "Проверяем исправность алкотестера, наличие поверки, соблюдение методики измерения"
                },
                { 
                  icon: "UserCheck", 
                  title: "Показания свидетелей",
                  desc: "Привлекаем свидетелей, которые подтвердят ваше трезвое состояние"
                },
                { 
                  icon: "Stethoscope", 
                  title: "Медицинское освидетельствование",
                  desc: "Оспариваем результаты медосвидетельствования, заказываем независимую экспертизу"
                },
                { 
                  icon: "Camera", 
                  title: "Видеозаписи",
                  desc: "Запрашиваем записи с видеорегистраторов и камер наблюдения"
                },
                { 
                  icon: "Scale", 
                  title: "Представительство в суде",
                  desc: "Подаём ходатайства, допрашиваем свидетелей, оспариваем доказательства"
                }
              ].map((strategy, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={strategy.icon} size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{strategy.title}</h3>
                      <p className="text-gray-600">{strategy.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grounds for Dismissal */}
          <div className="max-w-4xl mx-auto mb-16 bg-green-50 rounded-2xl p-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Icon name="ShieldCheck" size={28} className="text-green-600" />
              Основания для прекращения дела
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Нарушение процедуры освидетельствования</strong> — отсутствие понятых, неправильное оформление, нарушение прав</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Неисправность алкотестера</strong> — отсутствие поверки, истёкший срок годности, неправильная эксплуатация</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Медицинские показания</strong> — заболевания, лекарства, влияющие на показания прибора</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Нарушение сроков</strong> — протокол составлен позже установленного срока</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Недопустимые доказательства</strong> — видео без звука, отсутствие подписей, противоречия в документах</span>
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Наша статистика защиты
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-3">42%</div>
                <p className="text-lg opacity-90">Дел прекращено <br/>полностью</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-3">31%</div>
                <p className="text-lg opacity-90">Минимальное <br/>наказание</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-3">27%</div>
                <p className="text-lg opacity-90">Смягчающие <br/>обстоятельства</p>
              </div>
            </div>
            <div className="mt-8 text-center text-lg opacity-90">
              <strong>Итого: 73% клиентов сохранили права или получили минимальное наказание</strong>
            </div>
          </div>

          {/* Action Plan */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              План действий после остановки
            </h2>
            <div className="space-y-4">
              {[
                { 
                  step: "1", 
                  title: "Немедленно свяжитесь с юристом",
                  desc: "Чем раньше мы включимся — тем больше шансов на успешную защиту",
                  urgent: true
                },
                { 
                  step: "2", 
                  title: "Сохраните все документы",
                  desc: "Протокол, акт медосвидетельствования, записи с видеорегистратора"
                },
                { 
                  step: "3", 
                  title: "Зафиксируйте обстоятельства",
                  desc: "Запишите имена свидетелей, сделайте фото/видео места остановки"
                },
                { 
                  step: "4", 
                  title: "Не подписывайте протокол без юриста",
                  desc: "Можно указать несогласие с нарушением процедуры"
                }
              ].map((step) => (
                <div key={step.step} className={`flex items-start gap-6 p-6 rounded-xl border-2 ${step.urgent ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl ${step.urgent ? 'bg-red-600 text-white' : 'bg-purple-100 text-purple-600'}`}>
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Cases */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Примеры выигранных дел
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Отсутствие понятых при освидетельствовании",
                  situation: "Водитель остановлен ночью, понятых не было",
                  result: "Дело прекращено — нарушена процедура",
                  outcome: "Права сохранены"
                },
                {
                  title: "Неисправный алкотестер",
                  situation: "Прибор без поверки, срок истёк 3 месяца назад",
                  result: "Показания признаны недопустимым доказательством",
                  outcome: "Права сохранены"
                },
                {
                  title: "Приём лекарств",
                  situation: "Клиент принимал валокордин (содержит спирт)",
                  result: "Предоставили справки от врача, экспертизу",
                  outcome: "Минимальный срок — 1 год"
                }
              ].map((case_item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{case_item.title}</h3>
                  <p className="text-gray-600 mb-2"><strong>Ситуация:</strong> {case_item.situation}</p>
                  <p className="text-gray-700 mb-3"><strong>Результат:</strong> {case_item.result}</p>
                  <p className="text-xl font-bold text-green-600">{case_item.outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-10 text-white">
            <Icon name="ShieldCheck" size={56} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Время работает против вас!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              На подготовку защиты есть всего 10 дней. <br/>
              Чем раньше обратитесь — тем выше шансы сохранить права
            </p>
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => setShowForm(true)}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Срочная консультация — 24/7
            </Button>
            <p className="mt-6 text-sm opacity-75">
              Первая консультация бесплатно • Работаем круглосуточно • Конфиденциально
            </p>
          </div>

        </div>
      </div>
      
      <ContactBar onConsultClick={() => setShowForm(true)} />

      <DTPConsultationModal 
        showForm={showForm} 
        onClose={() => setShowForm(false)} 
      />
    </>
  );
};

export default LicenseAlcohol;