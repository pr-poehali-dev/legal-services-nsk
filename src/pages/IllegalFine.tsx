import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";

const IllegalFine = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <SEOHead 
        title="Обжалование штрафов ГИБДД | Незаконные постановления"
        description="Поможем обжаловать незаконные штрафы и постановления ГИБДД. Камеры, эвакуация, лишение прав. Опыт 15+ лет."
        keywords="обжалование штрафов ГИБДД, отмена постановления, незаконный штраф"
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Hero */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <Icon name="AlertCircle" size={48} className="text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Незаконный штраф ГИБДД?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Обжалуем необоснованные штрафы и постановления <br/>
              Камеры, эвакуация, разметка, знаки — защитим ваши права
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              onClick={() => setShowForm(true)}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              Бесплатная оценка перспектив
            </Button>
          </div>

          {/* Common Cases */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Когда штраф можно обжаловать
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: "Camera", 
                  title: "Ошибка камеры фотофиксации",
                  desc: "Не вы за рулём, похожий номер, техническая ошибка, нечитаемая разметка"
                },
                { 
                  icon: "MapPin", 
                  title: "Незаконная эвакуация автомобиля",
                  desc: "Знак установлен с нарушениями, нет таблички с зоной действия"
                },
                { 
                  icon: "TriangleAlert", 
                  title: "Неправильная установка знаков",
                  desc: "Знак скрыт деревьями, нестандартная высота, отсутствует дублирование"
                },
                { 
                  icon: "Gauge", 
                  title: "Превышение скорости на 1-20 км/ч",
                  desc: "Погрешность прибора, отсутствие поверки радара"
                },
                { 
                  icon: "Clock", 
                  title: "Истёк срок давности",
                  desc: "Прошло более 2 месяцев с момента нарушения"
                },
                { 
                  icon: "Users", 
                  title: "Ошибка инспектора",
                  desc: "Неправильное оформление протокола, нарушение процедуры"
                }
              ].map((case_item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={case_item.icon} size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{case_item.title}</h3>
                      <p className="text-gray-600">{case_item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Как мы обжалуем штраф
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { 
                  num: "01", 
                  title: "Анализ постановления",
                  desc: "Проверяем законность, находим основания для отмены"
                },
                { 
                  num: "02", 
                  title: "Сбор доказательств",
                  desc: "Фото места, видео, показания свидетелей, техническая экспертиза"
                },
                { 
                  num: "03", 
                  title: "Подача жалобы",
                  desc: "Составляем юридически грамотную жалобу в ГИБДД или суд"
                },
                { 
                  num: "04", 
                  title: "Судебное заседание",
                  desc: "Представляем ваши интересы, оспариваем доказательства"
                }
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="text-4xl font-bold mb-3 opacity-75">{step.num}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm opacity-90">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deadlines */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
                <Icon name="Clock" size={32} className="text-red-600" />
                Важно! Сроки обжалования
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-red-600">
                      10
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">10 дней на обжалование постановления</h3>
                      <p className="text-gray-600">Отсчёт идёт с момента получения постановления на руки или по почте</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-blue-600">
                      60
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">60 дней — срок для оплаты со скидкой 50%</h3>
                      <p className="text-gray-600">Но оплата = согласие с нарушением. Если планируете обжаловать — не платите!</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-orange-600">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">2 месяца — срок давности по большинству нарушений</h3>
                      <p className="text-gray-600">Если постановление вынесено позже — можно оспорить по истечению срока</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Grounds */}
          <div className="max-w-4xl mx-auto mb-16 bg-green-50 rounded-2xl p-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Icon name="BookOpen" size={28} className="text-green-600" />
              Основания для отмены штрафа
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 1.5 КоАП РФ</strong> — презумпция невиновности. Обязанность доказывания лежит на ГИБДД</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 4.5 КоАП РФ</strong> — истечение срока давности (2 месяца с момента нарушения)</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 26.2 КоАП РФ</strong> — недопустимые доказательства (нечитаемое фото, нет привязки к месту)</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>ГОСТ Р 52289-2019</strong> — нарушение правил установки дорожных знаков и разметки</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Малозначительность</strong> — замечание вместо штрафа при незначительной угрозе (ст. 2.9 КоАП)</span>
              </p>
            </div>
          </div>

          {/* Success Stories */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Реальные примеры отменённых штрафов
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Штраф за парковку — знак не виден",
                  situation: "Эвакуация автомобиля, штраф 3000 ₽ + эвакуатор 7000 ₽",
                  result: "Доказали, что знак скрыт деревьями. Предоставили фото с разных ракурсов",
                  outcome: "Постановление отменено полностью"
                },
                {
                  title: "Камера зафиксировала превышение на 22 км/ч",
                  situation: "Штраф 500 ₽, но водитель не согласен",
                  result: "Погрешность прибора ±3 км/ч. Фактически превышение 19 км/ч — не наказывается",
                  outcome: "Штраф отменён"
                },
                {
                  title: "Проезд на красный свет",
                  situation: "Фото с камеры — штраф 1000 ₽",
                  result: "Доказали неисправность светофора (горел жёлтый мигающий). Показания свидетелей",
                  outcome: "Постановление отменено"
                },
                {
                  title: "Штраф пришёл через 4 месяца",
                  situation: "Превышение скорости — 1500 ₽",
                  result: "Истёк срок давности (2 месяца по ст. 4.5 КоАП)",
                  outcome: "Производство прекращено"
                }
              ].map((case_item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{case_item.title}</h3>
                  <p className="text-red-600 mb-2"><strong>Ситуация:</strong> {case_item.situation}</p>
                  <p className="text-gray-700 mb-3"><strong>Действия:</strong> {case_item.result}</p>
                  <p className="text-xl font-bold text-green-600">{case_item.outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Us */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Почему мы
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "TrendingUp",
                  title: "78% успешных обжалований",
                  desc: "Большинство дел выигрываем"
                },
                {
                  icon: "DollarSign",
                  title: "Экономия 10 000 — 50 000 ₽",
                  desc: "Средняя выгода от отмены штрафа с эвакуацией"
                },
                {
                  icon: "Clock",
                  title: "Работаем оперативно",
                  desc: "Успеваем в 10-дневный срок обжалования"
                },
                {
                  icon: "FileText",
                  title: "Без вашего участия",
                  desc: "Всё делаем сами — вам не нужно ходить в ГИБДД и суд"
                },
                {
                  icon: "Shield",
                  title: "Гарантия качества",
                  desc: "Возврат оплаты, если не добьёмся результата"
                },
                {
                  icon: "CheckCircle",
                  title: "Опыт 15+ лет",
                  desc: "Знаем все тонкости законодательства"
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={benefit.icon} size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white">
            <Icon name="Scale" size={56} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Не соглашайтесь с несправедливым штрафом!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Бесплатная оценка перспектив обжалования — узнайте шансы на успех
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => setShowForm(true)}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Проконсультироваться с юристом
            </Button>
            <p className="mt-6 text-sm opacity-75">
              Ответ в течение 1 часа • Работаем по всей России • Конфиденциально
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

export default IllegalFine;
