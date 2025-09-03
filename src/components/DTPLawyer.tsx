import React, { useState } from "react";
import Icon from "@/components/ui/icon";

const DTPLawyer = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    situation: "",
  });

  // КНОПКА ОТПРАВКИ - отправка заявки в WhatsApp через GreenAPI
  const handleSubmit = async (e) => {
    e.preventDefault();

    const textMsg = `Заявка с сайта:
Имя: ${formData.name}
Телефон: ${formData.phone}
Ситуация: ${formData.situation}`;

    const INSTANCE_ID = "1103279953";
    const API_TOKEN = "c80e4b7d4aa14f7c9f0b86e05730e35f1200768ef5b046209e";
    const ADMIN_PHONE = "79994523500";

    try {
      const res = await fetch(
        `https://1103.api.green-api.com/waInstance${INSTANCE_ID}/sendMessage/${API_TOKEN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: `${ADMIN_PHONE}@c.us`,
            message: textMsg,
          }),
        },
      );

      if (res.ok) {
        alert("Спасибо! Мы свяжемся с вами в течение 15 минут.");
        setShowForm(false);
        setFormData({ name: "", phone: "", situation: "" });
      } else {
        alert("Ошибка отправки. Попробуйте позже.");
      }
    } catch (error) {
      alert("Ошибка соединения. Попробуйте позже.");
    }
  };

  const achievements = [
    { number: "2500+", text: "выигранных дел по ДТП" },
    { number: "15 лет", text: "опыта в автоправе" },
    { number: "94%", text: "успешных взысканий" },
    { number: "24/7", text: "поддержка клиентов" },
  ];

  const services = [
    {
      title: "Взыскание с ОСАГО",
      description: "Полное возмещение ущерба через страховую компанию",
      price: "от 5 000 ₽",
      includes: [
        "Оценка ущерба",
        "Досудебная претензия",
        "Судебное взыскание",
        "Штрафы и неустойка",
      ],
    },
    {
      title: "Взыскание без ОСАГО",
      description: "Взыскание ущерба напрямую с виновника ДТП",
      price: "от 7 000 ₽",
      includes: [
        "Установление виновника",
        "Оценка ущерба",
        "Исковое заявление",
        "Представительство в суде",
      ],
    },
    {
      title: "Европротокол споры",
      description: "Решение конфликтов по европротоколу",
      price: "от 3 000 ₽",
      includes: [
        "Анализ документов",
        "Экспертиза",
        "Переговоры со страховой",
        "Судебная защита",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Алексей М.",
      text: "Страховая отказывала 8 месяцев. ЮрСервисНСК взыскал полную сумму + неустойку 180 тыс. за 2 месяца!",
      amount: "340 000 ₽",
      case: "Взыскание с РЕСО",
    },
    {
      name: "Марина К.",
      text: "Виновник скрылся с места ДТП. Нашли через суд, взыскали ущерб + моральный вред. Профессионалы!",
      amount: "220 000 ₽",
      case: "Взыскание без ОСАГО",
    },
    {
      name: "Игорь П.",
      text: "Страховая занижала выплату в 3 раза. Через суд получили полную компенсацию + судебные расходы.",
      amount: "150 000 ₽",
      case: "Доплата по КАСКО",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Trust Bar */}
      <div className="bg-green-600 text-white py-2 px-4 text-center text-sm font-medium">
        <Icon name="Shield" size={16} className="inline mr-2" />
        <span>✓ Лицензия на юридическую деятельность</span>
        <span className="mx-4">•</span>
        <span>✓ Работаем официально с 2009 года</span>
        <span className="mx-4">•</span> 
        <span>✓ Более 2500 выигранных дел</span>
      </div>

      {/* Hero Section */}
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
                  onClick={() => setShowForm(true)}
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

      {/* Social Proof Bar */}
      <section className="py-4 px-4 bg-yellow-100 border-y border-yellow-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span><strong>1247</strong> довольных клиентов</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-400"></div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>Сейчас онлайн: <strong>3</strong> юриста</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-400"></div>
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} />
              <span><strong>94%</strong> положительных решений</span>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
            НАШИ РЕЗУЛЬТАТЫ ГОВОРЯТ САМИ ЗА СЕБЯ
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="text-center bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg border">
                <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
                  {item.number}
                </div>
                <div className="text-gray-600 font-medium">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-8">
            СТРАХОВЫЕ КОМПАНИИ НЕ ХОТЯТ ПЛАТИТЬ ПОЛНУЮ СУММУ
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Icon
                name="XCircle"
                size={48}
                className="text-red-500 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Занижают выплаты</h3>
              <p className="text-gray-600">На 40-70% от реального ущерба</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Icon
                name="Clock"
                size={48}
                className="text-red-500 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Тянут время</h3>
              <p className="text-gray-600">Месяцами рассматривают заявления</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Icon
                name="FileX"
                size={48}
                className="text-red-500 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Отказывают</h3>
              <p className="text-gray-600">По надуманным причинам</p>
            </div>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg border-l-4 border-yellow-500">
            <p className="text-lg font-semibold text-yellow-800">
              <Icon name="AlertTriangle" size={24} className="inline mr-2" />
              БЕЗ ЮРИСТА ВЫ ПОЛУЧИТЕ В РАЗЫ МЕНЬШЕ ДЕНЕГ!
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            НАШИ УСЛУГИ ПО ДТП
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-green-600 mb-6">
                  {service.price}
                </div>

                <ul className="space-y-2 mb-8">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  ЗАКАЗАТЬ УСЛУГУ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            КАК МЫ РАБОТАЕМ
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "КОНСУЛЬТАЦИЯ",
                desc: "Анализируем документы и оцениваем перспективы дела",
              },
              {
                step: "02",
                title: "ДОСУДЕБНАЯ РАБОТА",
                desc: "Направляем претензии и ведем переговоры",
              },
              {
                step: "03",
                title: "СУДЕБНОЕ ВЗЫСКАНИЕ",
                desc: "Подаем иск и представляем интересы в суде",
              },
              {
                step: "04",
                title: "ПОЛУЧЕНИЕ ДЕНЕГ",
                desc: "Контролируем исполнение решения суда",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              ОТЗЫВЫ КЛИЕНТОВ
            </h2>
            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
              <Icon name="Star" size={20} className="fill-current" />
              <Icon name="Star" size={20} className="fill-current" />
              <Icon name="Star" size={20} className="fill-current" />
              <Icon name="Star" size={20} className="fill-current" />
              <Icon name="Star" size={20} className="fill-current" />
              <span className="text-gray-600 ml-2">4.9 из 5 • Основано на 127 отзывах</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span>Яндекс.Карты: 4.8</span>
              <span>•</span>
              <span>Google: 4.9</span>
              <span>•</span>
              <span>2ГИС: 4.7</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 mb-1">
                      {testimonial.case}
                    </div>
                    <div className="flex text-yellow-400">
                      <Icon name="Star" size={12} className="fill-current" />
                      <Icon name="Star" size={12} className="fill-current" />
                      <Icon name="Star" size={12} className="fill-current" />
                      <Icon name="Star" size={12} className="fill-current" />
                      <Icon name="Star" size={12} className="fill-current" />
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-green-600">
                    {testimonial.amount}
                  </div>
                  <div className="text-xs text-gray-500">
                    ✓ Подтвержден
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="text-blue-600 hover:text-blue-800 font-medium underline">
              Читать все отзывы (127) →
            </button>
          </div>
        </div>
      </section>

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
              onClick={() => setShowForm(true)}
              className="bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors relative"
            >
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                БЕСПЛАТНО
              </div>
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            </button>
            <div className="text-blue-900">
              <div className="font-bold text-2xl">+7 (999) 452-35-00</div>
              <div className="text-sm flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Работаем 24/7
              </div>
            </div>
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">Консультация абсолютно бесплатна</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Телефон для связи"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <textarea
                placeholder="Кратко опишите ситуацию с ДТП (необязательно)"
                value={formData.situation}
                onChange={(e) =>
                  setFormData({ ...formData, situation: e.target.value })
                }
                rows={3}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={20} />
                ПОЛУЧИТЬ БЕСПЛАТНУЮ КОНСУЛЬТАЦИЮ
              </button>
            </form>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Clock" size={14} />
                <span>Перезвоним в течение 15 минут</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Shield" size={14} />
                <span>Ваши данные под надежной защитой</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DTPLawyer;