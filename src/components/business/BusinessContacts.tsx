import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/config/contacts";
import { useState } from "react";

const BusinessContacts = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103525320, 'reachGoal', 'business_form_submit');
    }

    const text = `Заявка с сайта (Бизнес):\n\nКомпания: ${formData.company}\nКонтактное лицо: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nСообщение: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103525320, 'reachGoal', 'phone_click');
    }
    window.location.href = `tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`;
  };

  return (
    <section id="business-contacts" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block">
            <div className="flex items-center gap-2 bg-blue-100 rounded-full px-6 py-2 mb-4">
              <Icon name="MessageSquare" size={20} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Свяжитесь с нами</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-900">
            Получите консультацию для вашего бизнеса
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами в течение 15 минут
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Название компании *
                  </label>
                  <Input
                    required
                    placeholder="ООО «Ваша компания»"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Контактное лицо *
                  </label>
                  <Input
                    required
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Телефон *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+7 999 123 45 67"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="info@company.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Опишите вашу ситуацию *
                  </label>
                  <Textarea
                    required
                    placeholder="Кратко опишите вашу юридическую задачу..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="border-slate-300 min-h-[120px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Телефон</div>
                      <button 
                        onClick={handlePhoneClick}
                        className="text-blue-100 hover:text-white text-lg transition-colors"
                      >
                        {CONTACTS.phone}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href={`mailto:${CONTACTS.email}`} className="text-blue-100 hover:text-white transition-colors">
                        {CONTACTS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Адрес офиса</div>
                      <div className="text-blue-100">
                        г. Калуга, ул. Кирова, 1<br />
                        2 этаж, офис 201
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Режим работы</div>
                      <div className="text-blue-100">
                        Пн-Пт: 9:00 - 20:00<br />
                        Сб-Вс: 10:00 - 18:00
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Почему выбирают нас</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-slate-700">
                      <strong>Опыт работы с бизнесом:</strong> более 15 лет успешного сопровождения компаний
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-slate-700">
                      <strong>Индивидуальный подход:</strong> персональная стратегия для каждого клиента
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-slate-700">
                      <strong>Прозрачность:</strong> договор с четкими условиями и гарантиями
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessContacts;