import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOConfig } from "@/utils/seoConfig";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DTPConsultationModal from "@/components/dtp/DTPConsultationModal";

const BadRepair = () => {
  const [showForm, setShowForm] = useState(false);
  const seo = getSEOConfig('badRepair');

  return (
    <>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Hero */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <Icon name="Wrench" size={48} className="text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              СТО сделала плохой ремонт?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Взыщем полную стоимость ремонта + неустойку + компенсацию морального вреда <br/>
              Заставим автосервис переделать работу или вернуть деньги
            </p>
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
              onClick={() => setShowForm(true)}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              Бесплатная консультация юриста
            </Button>
          </div>

          {/* Common Problems */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Типичные проблемы с автосервисами
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: "XCircle", 
                  title: "Некачественный ремонт",
                  desc: "Неисправность не устранена, проблема вернулась через несколько дней"
                },
                { 
                  icon: "Timer", 
                  title: "Нарушение сроков",
                  desc: "Ремонт длится месяцами вместо обещанной недели"
                },
                { 
                  icon: "DollarSign", 
                  title: "Завышение стоимости",
                  desc: "Итоговая сумма в 2-3 раза выше предварительной сметы"
                },
                { 
                  icon: "PackageX", 
                  title: "Повреждения при ремонте",
                  desc: "Царапины кузова, сколы, новые неисправности"
                },
                { 
                  icon: "AlertTriangle", 
                  title: "Неоригинальные запчасти",
                  desc: "Поставили дешёвые аналоги вместо оригинальных деталей"
                },
                { 
                  icon: "Ban", 
                  title: "Отказ переделать работу",
                  desc: "Игнорируют претензии, не возвращают автомобиль"
                }
              ].map((problem, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={problem.icon} size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                      <p className="text-gray-600">{problem.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Can Claim */}
          <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Что мы взыщем с СТО
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: "RefreshCw", 
                  title: "Безвозмездное устранение недостатков",
                  desc: "Обяжем СТО переделать работу бесплатно в разумный срок"
                },
                { 
                  icon: "Wallet", 
                  title: "Возврат стоимости ремонта",
                  desc: "Полный возврат денег за некачественную услугу"
                },
                { 
                  icon: "TrendingUp", 
                  title: "Неустойка за каждый день просрочки",
                  desc: "1% от стоимости услуги за каждый день задержки"
                },
                { 
                  icon: "Shield", 
                  title: "Штраф 50%",
                  desc: "За отказ в добровольном порядке удовлетворить требования"
                },
                { 
                  icon: "Heart", 
                  title: "Моральный вред",
                  desc: "Компенсация за переживания и неудобства (от 5 000 до 50 000 ₽)"
                },
                { 
                  icon: "FileText", 
                  title: "Судебные расходы",
                  desc: "Госпошлина, экспертиза, услуги юриста — всё с ответчика"
                }
              ].map((claim, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={claim.icon} size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{claim.title}</h3>
                      <p className="text-sm opacity-90">{claim.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Как мы работаем
            </h2>
            <div className="space-y-6">
              {[
                { 
                  step: "1", 
                  title: "Независимая техническая экспертиза",
                  desc: "Привлекаем эксперта, который зафиксирует все недостатки и их причины"
                },
                { 
                  step: "2", 
                  title: "Досудебная претензия",
                  desc: "Направляем СТО требование устранить недостатки или вернуть деньги"
                },
                { 
                  step: "3", 
                  title: "Обращение в Роспотребнадзор",
                  desc: "Подаём жалобу на нарушение прав потребителя"
                },
                { 
                  step: "4", 
                  title: "Исковое заявление в суд",
                  desc: "Взыскиваем стоимость ремонта + неустойку + штраф + моральный вред"
                },
                { 
                  step: "5", 
                  title: "Принудительное исполнение",
                  desc: "Работаем с приставами до полного получения денег"
                }
              ].map((step) => (
                <div key={step.step} className="flex items-start gap-6 bg-white p-6 rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl text-green-600">
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

          {/* Legal Rights */}
          <div className="max-w-4xl mx-auto mb-16 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Icon name="BookOpen" size={28} className="text-blue-600" />
              Ваши права по Закону о защите прав потребителей
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 29 ЗоЗПП</strong> — право требовать безвозмездного устранения недостатков</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 28 ЗоЗПП</strong> — неустойка 3% от цены услуги за каждый день просрочки</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 13 ЗоЗПП</strong> — штраф 50% в пользу потребителя при отказе в добровольном порядке</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Ст. 15 ЗоЗПП</strong> — компенсация морального вреда за нарушение прав потребителя</span>
              </p>
              <p className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span><strong>Освобождение от госпошлины</strong> — потребитель не платит госпошлину при подаче иска</span>
              </p>
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
                  title: "Ремонт двигателя — проблема вернулась через неделю",
                  situation: "СТО взяла 180 000 ₽ за капитальный ремонт, но мотор снова стучит",
                  result: "Экспертиза подтвердила некачественную сборку. Взыскали возврат + неустойку + штраф",
                  total: "427 000 ₽"
                },
                {
                  title: "Покраска кузова — облезла через 2 месяца",
                  situation: "Заплатили 95 000 ₽, краска пошла пузырями",
                  result: "СТО отказалась переделывать. Суд обязал вернуть деньги + моральный вред",
                  total: "163 000 ₽"
                },
                {
                  title: "Ремонт затянулся на 4 месяца вместо 2 недель",
                  situation: "Стоимость услуги 120 000 ₽, просрочка 105 дней",
                  result: "Взыскали неустойку (3% × 105 дней) + моральный вред + штраф",
                  total: "620 000 ₽"
                }
              ].map((case_item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{case_item.title}</h3>
                  <p className="text-red-600 mb-2"><strong>Ситуация:</strong> {case_item.situation}</p>
                  <p className="text-gray-700 mb-3"><strong>Результат:</strong> {case_item.result}</p>
                  <p className="text-2xl font-bold text-green-600">Взыскано: {case_item.total}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important to Know */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Важно знать
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "FileText",
                  title: "Сохраняйте все документы",
                  desc: "Договор, смету, акт приёма-передачи, чеки — всё пригодится в суде"
                },
                {
                  icon: "Clock",
                  title: "Фиксируйте сроки",
                  desc: "Запоминайте даты сдачи в ремонт и обещанного возврата авто"
                },
                {
                  icon: "Camera",
                  title: "Делайте фото и видео",
                  desc: "Зафиксируйте состояние автомобиля до и после ремонта"
                },
                {
                  icon: "MessageSquare",
                  title: "Направьте письменную претензию",
                  desc: "Без досудебной претензии суд не примет иск. Отправляйте заказным письмом"
                }
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-4 bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                  <Icon name={tip.icon} size={28} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-700">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Us */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "Award",
                  title: "Специализация на авто",
                  desc: "Работаем только с автомобильными спорами"
                },
                {
                  icon: "Users",
                  title: "Сеть экспертов",
                  desc: "Сотрудничаем с независимыми экспертами по всей России"
                },
                {
                  icon: "TrendingUp",
                  title: "Средняя сумма взыскания",
                  desc: "340 000 ₽ по делам о некачественном ремонте"
                },
                {
                  icon: "Clock",
                  title: "Срок решения",
                  desc: "2-4 месяца до получения денег"
                },
                {
                  icon: "CheckCircle",
                  title: "86% выигранных дел",
                  desc: "Большинство споров с СТО решаем в вашу пользу"
                },
                {
                  icon: "DollarSign",
                  title: "Все расходы с ответчика",
                  desc: "Наш гонорар взыскиваем с автосервиса"
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={benefit.icon} size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-10 text-white">
            <Icon name="Scale" size={56} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Не давайте СТО уйти от ответственности!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Бесплатная оценка перспектив — узнайте, сколько сможете взыскать
            </p>
            <Button 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
              onClick={() => setShowForm(true)}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Проконсультироваться с юристом
            </Button>
            <p className="mt-6 text-sm opacity-75">
              Опыт 15+ лет • Работаем по всей России • Первая консультация бесплатно
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

export default BadRepair;