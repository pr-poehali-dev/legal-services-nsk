import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

interface DTPConsultationModalProps {
  showForm: boolean;
  onClose: () => void;
}

const DTPConsultationModal = ({ showForm, onClose }: DTPConsultationModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    situation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
        onClose();
        setFormData({ name: "", phone: "", situation: "" });
      } else {
        alert("Ошибка отправки. Попробуйте позже.");
      }
    } catch (error) {
      alert("Ошибка соединения. Попробуйте позже.");
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ</h3>
          <button
            onClick={onClose}
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
  );
};

export default DTPConsultationModal;