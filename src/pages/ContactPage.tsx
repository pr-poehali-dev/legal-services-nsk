import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Здесь можно добавить отправку данных на сервер
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: "MapPin",
      title: "Адрес",
      content: ["г. Новосибирск, ул. Новосибирск, д. 3, офис 323", "м. Ленина"],
      action: null,
    },
    {
      icon: "Phone",
      title: "Телефон",
      content: ["+7 (999) 452-35-00"],
      action: "tel:+79994523500",
    },
    {
      icon: "Mail",
      title: "Email",
      content: ["vituarten@icloud.com"],
      action: "vituartem6397@yandex.ru",
    },
    {
      icon: "Clock",
      title: "Режим работы",
      content: ["Пн-Пт: 6:00 - 23:00", "Сб: 10:00 - 16:00", "Вс: выходной"],
      action: null,
    },
  ];

  const services = [
    "Корпоративное право",
    "Договорное право",
    "Арбитражные споры",
    "Трудовое право",
    "Недвижимость",
    "Интеллектуальная собственность",
    "Другое",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-8 px-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={48} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Заявка отправлена!
            </h2>
            <p className="text-slate-600 mb-6">
              Спасибо за обращение. Наш специалист свяжется с вами в течение 30
              минут для уточнения деталей и назначения консультации.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full"
            >
              Отправить еще одну заявку
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Свяжитесь с нами
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Получите бесплатную консультацию от наших экспертов. Мы ответим на
            все вопросы и поможем найти оптимальное решение.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Форма обратной связи */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Оставьте заявку на консультацию
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ваше имя *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите ваше имя"
                    required
                    className="w-full"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Телефон *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (999) 452-35-00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Интересующая услуга
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Описание вашего вопроса
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите подробнее о вашей ситуации..."
                    rows={4}
                    className="w-full resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3"
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  Нажимая на кнопку, вы соглашаетесь с обработкой персональных
                  данных
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Контактная информация */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon
                          name={info.icon as any}
                          size={24}
                          className="text-blue-600"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.content.map((item, idx) => (
                            <div key={idx}>
                              {info.action ? (
                                <a
                                  href={info.action}
                                  className="text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                  {item}
                                </a>
                              ) : (
                                <p className="text-slate-600">{item}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Карта */}
            <Card>
              <CardContent className="p-0">
                <div className="bg-slate-200 h-64 rounded-md flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <Icon name="MapPin" size={48} className="mx-auto mb-2" />
                    <p>Интерактивная карта</p>
                    <p className="text-sm">г. Москва, ул. Тверская, д. 12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Быстрые контакты */}
            <Card className="bg-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <Icon name="Phone" size={32} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Нужна срочная консультация?
                </h3>
                <p className="text-blue-100 mb-4">
                  Звоните прямо сейчас, мы работаем 24/7
                </p>
                <a href="tel:+79994523500">
                  <Button size="lg" variant="secondary" className="w-full">
                    <Icon name="Phone" size={20} className="mr-2" />
                    +7 (999) 452-35-00
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Как проходит консультация
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Заявка</h3>
              <p className="text-slate-600">
                Оставляете заявку на сайте или звоните по телефону
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Обратный звонок</h3>
              <p className="text-slate-600">
                Наш специалист связывается с вами в течение 30 минут
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Консультация</h3>
              <p className="text-slate-600">
                Получаете бесплатную консультацию и план решения вопроса
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}