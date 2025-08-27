import React, { useState } from "react";
import Icon from "@/components/ui/icon";

const DTPLawyer = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    situation: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const messageBody = `
      🔥 Новая заявка!\n
      👤 Имя: ${formData.name}\n
      📞 Телефон: ${formData.phone}\n
      📝 Описание ситуации: ${formData.situation}`;

    const response = await fetch(`${apiUrl}/waInstance${idInstance}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiTokenInstance}`,
      },
      body: JSON.stringify({
        chatId: '79994523500@c.us',
        message: messageBody,
      }),
    });

    if (response.ok) {
      console.log('Сообщение отправлено');
      alert('Спасибо! Мы свяжемся с вами в течение 15 минут.');
    } else {
      throw new Error(`Ошибка отправки сообщения: ${await response.text()}`);
    }
  } catch (err) {
    console.error(err.message);
    alert('Что-то пошло не так. Попробуйте позже.');
  }
};
    // Здесь будет обработка формы
    console.log("Заявка отправлена:", formData);
    alert("Спасибо! Мы свяжемся с вами в течение 15 минут.");
  };

  const achievements = [
    { number: "250+", text: "выигранных дел по ДТП" },
    { number: "15 лет", text: "опыта в автоправе" },
    { number: "98%", text: "успешных взысканий" },
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
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-yellow-400">
                  ВЗЫСКАЛИ БОЛЕЕ 10 МИЛЛИОНОВ
                </span>
                <br />
                по ДТП за последний год
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Артем Вячеславович — эксперт по автоправу. Специализируется на
                взыскании максимальных компенсаций по ДТП.
              </p>

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

              <div className="flex items-center gap-4 text-sm text-blue-200">
                <Icon name="Shield" size={16} />
                <span>Работаем по договору</span>
                <Icon name="Clock" size={16} />
                <span>Результат или возврат аванса</span>
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

      {/* Achievements */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
                  {item.number}
                </div>
                <div className="text-gray-600">{item.text}</div>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            ОТЗЫВЫ КЛИЕНТОВ
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-lg border border-green-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.case}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>

                <div className="text-2xl font-bold text-green-600">
                  Взыскано: {testimonial.amount}
                </div>
              </div>
            ))}
          </div>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
            >
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            </button>
            <div className="text-blue-900">
              <div className="font-bold text-2xl">+7 (999) 452-35-00</div>
              <div className="text-sm">Работаем 24/7</div>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <textarea
                placeholder="Опишите ситуацию с ДТП"
                value={formData.situation}
                onChange={(e) =>
                  setFormData({ ...formData, situation: e.target.value })
                }
                rows={3}
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
              </button>
            </form>

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