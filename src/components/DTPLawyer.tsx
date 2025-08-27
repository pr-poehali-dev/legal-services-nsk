import React, { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const DTPLawyer = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    situation: "",
  });
  const [showGift, setShowGift] = useState(false);
  const phoneRef = useRef(null);

  // Фокус на телефон при открытии формы
  useEffect(() => {
    if (showForm && phoneRef.current) {
      setTimeout(() => phoneRef.current.focus(), 200);
    }
  }, [showForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const textMsg = `Заявка с сайта:
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
            <p className="text-xl mb-6">
              Артем Вячеславович — эксперт по автоправу. Специализируется на
              взыскании максимальных компенсаций по ДТП.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={() => setShowForm(true)}
                className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                <Icon name="Phone" size={20} /> БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ
              </button>
              <a
                href="tel:+79994523500"
                className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
              >
                +7 (999) 452-35-00
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm mt-4">
              <Icon name="Shield" size={16} /> Работаем по договору
              <Icon name="Clock" size={16} /> Результат или возврат аванса
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
            <h3 className="text-xl font-semibold mb-4 text-center">
              Бесплатная консультация
            </h3>
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
                className="w-full p-3 border rounded-lg text-lg"
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
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
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
              <p className="mb-4">
                Мы свяжемся в течение <b>15 минут</b>. Пока можете скачать
                чек-лист:
              </p>
              <a
                href="/docs/cheklist-dtp.pdf"
                download
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition"
              >
                Скачать чек-лист
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Мобильная кнопка */}
      <div className="fixed bottom-4 right-4 z-[100]">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 px-6 py-3 rounded-full shadow-lg text-white font-semibold flex items-center gap-2 hover:bg-green-700 transition"
        >
          <Icon name="Phone" size={22} /> Получить консультацию
        </button>
      </div>
    </div>
  );
};

export default DTPLawyer;
