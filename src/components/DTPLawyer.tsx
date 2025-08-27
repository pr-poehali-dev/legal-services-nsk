import React, { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const todaySpots = Math.floor(Math.random() * 4) + 2; // от 2 до 5

const FAQ = [
  {
    q: "Какие документы нужны для консультации?",
    a: "Достаточно описать вашу ситуацию, всю бумажную работу мы поможем собрать по вашему запросу.",
  },
  {
    q: "Что делать, если нет справки о ДТП?",
    a: "Даже если справки нет — разберем вашу ситуацию, подскажем алгоритм действий.",
  },
  {
    q: "Почему консультация бесплатная?",
    a: "Мы уверены в результате и предлагаем бесплатный разбор дела, чтобы показать экспертизу.",
  },
];

const DTPLawyer = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    situation: "",
  });
  const [showGift, setShowGift] = useState(false);
  const [timer, setTimer] = useState(600); // 10 min
  const [faqOpen, setFaqOpen] = useState([false, false, false]);
  const phoneRef = useRef(null);

  useEffect(() => {
    let t;
    if (showForm && timer > 0) {
      t = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [timer, showForm]);

  // Фокус на телефон при открытии формы + автоскролл
  useEffect(() => {
    if (showForm && phoneRef.current) {
      setTimeout(() => {
        phoneRef.current.focus();
        phoneRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 250);
    }
  }, [showForm]);

  // Validation helper
  const phoneValid = /^(\+7|7|8)?[0-9]{10,}$/.test(formData.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneValid) {
      alert("Проверьте корректность номера телефона");
      return;
    }

    const textMsg = `Заявка с сайта ДТП:

Имя: ${formData.name || "не указано"}
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId: `${ADMIN_PHONE}@c.us`,
            message: textMsg,
          }),
        },
      );
      const result = await res.json();
      if (res.ok) {
        setShowForm(false);
        setShowGift(true);
        setFormData({ name: "", phone: "", situation: "" });
      } else {
        alert(
          "Ошибка. " + (result.message || "Проверьте корректность номера."),
        );
      }
    } catch (err) {
      alert("Ошибка сети. Попробуйте позже.");
    }
  };

  // Таймер отображение
  const mm = Math.floor(timer / 60);
  const ss = timer % 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Стартовая секция */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between z-10">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="text-yellow-400">
                Взыскали более 10 миллионов
              </span>
              <br /> по ДТП за последний год
            </h1>
            <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 mb-2 rounded-lg font-semibold animate-pulse">
              Осталось {todaySpots} мест на бесплатную консультацию!
            </div>
            <p className="text-xl mb-6 mt-1">
              Артем Вячеславович — эксперт по автоправу,{" "}
              <b>специализация: взыскание по ДТП, 98% дел выиграно.</b>
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={() => {
                  setShowForm(true);
                  setTimer(600);
                }}
                className="relative bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center gap-2"
                aria-label="Бесплатная консультация"
              >
                <span className="animate-bounce">
                  <Icon name="Phone" size={20} />
                </span>
                БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ
                <span className="ml-3 bg-white/40 text-xs py-1 px-2 rounded-lg">
                  {mm}:{ss.toString().padStart(2, "0")}
                </span>
              </button>
              <a
                href="tel:+79994523500"
                className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
              >
                +7 (999) 452-35-00
              </a>
              <a
                href="https://wa.me/79994523500"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-2 border border-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-200/60 hover:text-green-900 transition"
              >
                <Icon name="MessageCircle" size={20} color="#27D354" /> WhatsApp
              </a>
            </div>
            {/* TRUST БЛОК */}
            <div className="flex items-center gap-4 text-md mt-6 flex-wrap">
              <span className="flex items-center gap-1">
                {" "}
                <Icon name="Shield" size={18} /> По договору
              </span>
              <span className="flex items-center gap-1">
                {" "}
                <Icon name="Award" size={18} /> Профи с 2010 года
              </span>
              <span className="flex items-center gap-1">
                {" "}
                <Icon name="Star" size={18} color="#FFD700" /> 125+ отзывов{" "}
              </span>
              <span className="flex items-center gap-1">
                {" "}
                <Icon name="Clock" size={16} /> Ответ за 15 минут
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Всплывающее окно формы */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <Icon name="X" size={24} />
            </button>
            <h3 className="text-xl font-semibold mb-2 text-center">
              Бесплатная консультация автоюриста
            </h3>
            <div className="text-center text-sm mb-2 text-gray-600">
              До конца акции:{" "}
              <span className="font-bold text-red-600">
                {mm}:{ss.toString().padStart(2, "0")}
              </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                ref={phoneRef}
                required
                pattern="^(\+7|7|8)?[0-9]{10,}$"
                maxLength={16}
                placeholder="Телефон *"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={`w-full p-3 border rounded-lg text-lg focus:ring-2 ${formData.phone.length > 0 && !phoneValid ? "border-red-400 ring-red-200" : "border-gray-200"}`}
                style={{
                  outline: phoneValid ? "1px solid #21c567" : undefined,
                }}
              />
              <input
                type="text"
                placeholder="Ваше имя (опц.)"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Кратко опишите ситуацию (опц.)"
                rows={2}
                value={formData.situation}
                onChange={(e) =>
                  setFormData({ ...formData, situation: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="submit"
                className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition  ${!phoneValid ? "opacity-75 pointer-events-none" : ""}`}
                disabled={!phoneValid}
              >
                Получить консультацию бесплатно
              </button>
            </form>
            <div className="mt-3 text-xs text-gray-500 text-center">
              Ваши данные конфиденциальны. Работаем по договору.
            </div>
          </div>
        </div>
      )}

      {/* Блок благодарности + чеклист */}
      {showGift && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-8 relative shadow-lg">
            <button
              onClick={() => setShowGift(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <Icon name="X" size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <Icon name="Gift" size={50} className="text-green-500 mb-3" />
              <h3 className="text-xl font-bold mb-2">
                Спасибо! Ваша заявка принята
              </h3>
              <p className="mb-2">
                Мы свяжемся в течение <b>15 минут</b>. Пока ожидаете — скачайте{" "}
                <b>чек-лист для водителя</b>:
              </p>
              <a
                href="/docs/cheklist-dtp.pdf"
                download
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition"
              >
                Скачать чек-лист
              </a>
              <div className="text-gray-500 text-xs mt-4">
                Автоюрист Артем Вячеславович. Ваша выгода — наши правила!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Мобильная кнопка */}
      <div className="fixed bottom-4 right-4 z-[100]">
        <button
          onClick={() => {
            setShowForm(true);
            setTimer(600);
          }}
          className="bg-green-600 px-6 py-3 rounded-full shadow-lg text-white font-semibold flex items-center gap-2 hover:bg-green-700 transition"
          aria-label="Получить консультацию"
        >
          <span className="animate-pulse">
            <Icon name="Phone" size={22} />
          </span>
          Получить консультацию
        </button>
      </div>

      {/* FAQ-БЛОК */}
      <section className="mt-14 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Частые вопросы</h2>
        <div>
          {FAQ.map((item, i) => (
            <div key={i} className="mb-2 border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() =>
                  setFaqOpen(faqOpen.map((v, idx) => (idx === i ? !v : v)))
                }
                className="w-full text-left flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium"
                aria-expanded={faqOpen[i]}
                aria-controls={`faq-content-${i}`}
              >
                <span>{item.q}</span>
                <span
                  className={`transition-transform ${faqOpen[i] ? "rotate-90" : ""}`}
                >
                  <Icon name="ChevronRight" size={18} />
                </span>
              </button>
              <div
                id={`faq-content-${i}`}
                className={`px-4 pb-2 text-gray-600 text-sm ${faqOpen[i] ? "" : "hidden"}`}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DTPLawyer;
