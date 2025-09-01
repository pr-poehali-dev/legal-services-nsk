import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";
import { toast } from "sonner";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openModal } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Заполните обязательные поля");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Отправляем заявку через Green API в WhatsApp
      const message = `🆕 Новая заявка со страницы Контакты\n\n👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}\n📧 Email: ${formData.email || "Не указан"}\n🛡️ Услуга: ${formData.service || "Не выбрана"}\n💬 Сообщение: ${formData.message || "Не указано"}\n⏰ Время: ${new Date().toLocaleString("ru-RU")}`;
      
      const response = await fetch(
        `https://1103.api.green-api.com/waInstance1103279953/sendMessage/c80e4b7d4aa14f7c9f0b86e05730e35f1200768ef5b046209e`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: "79994523500@c.us",
            message: message,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время");
    } catch (error) {
      toast.error("Ошибка отправки. Попробуйте позвонить по телефону +7 999 452 35 00");
    } finally {
      setIsSubmitting(false);
    }
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
      title: "Адрес офиса",
      content: [
        "г. Новосибирск, ул. Ленина, д. 3, офис 323",
        "м. Площадь Ленина (5 минут пешком)",
      ],
      action: null,
    },
    {
      icon: "Phone",
      title: "Телефоны",
      content: ["+7 (999) 452-35-00"],
      action: "tel:+79994523500",
    },
    {
      icon: "Mail",
      title: "Электронная почта",
      content: ["vituarten@icloud.com", ""],
      action: "mailto:vituarten@icloud.com",
    },
    {
      icon: "Clock",
      title: "Режим работы",
      content: ["Пн-Пт: 7:00 - 23:00", "Сб: 10:00 - 16:00", "Вс: выходной"],
      action: null,
    },
  ];

  const services = [
    "Корпоративное право",
    "Гражданское право",
    "Семейное право",
    "Уголовное право",
    "Недвижимость",
    "Налоговые споры",
    "Арбитражные дела",
    "Другое",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Заявка отправлена!
              </h2>
              <p className="text-muted-foreground mb-6">
                Спасибо за обращение! Ваша заявка отправлена в WhatsApp. Наш специалист свяжется с вами в течение 15 минут.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => window.open('tel:+79994523500', '_self')}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Icon name="Phone" className="h-4 w-4 mr-2" />
                  Позвонить сейчас: +7 999 452 35 00
                </Button>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Отправить еще одну заявку
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero секция */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Свяжитесь с нами
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Получите бесплатную консультацию от наших экспертов. Мы ответим на
            все вопросы и поможем найти оптимальное решение.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={openModal}
          >
            <Icon name="Phone" className="h-5 w-5 mr-2" />
            Позвонить сейчас
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Форма обратной связи */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Оставьте заявку на консультацию
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
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
                      <label className="block text-sm font-semibold text-foreground mb-2">
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
                      <label className="block text-sm font-semibold text-foreground mb-2">
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
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Интересующая услуга
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
                    <label className="block text-sm font-semibold text-foreground mb-2">
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
                    className="w-full bg-primary hover:bg-primary/90 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" className="h-5 w-5 mr-2 animate-spin" />
                        Отправляем в WhatsApp...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" className="h-5 w-5 mr-2" />
                        ОТПРАВИТЬ ЗАЯВКУ В WHATSAPP
                      </>
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-4 text-xs text-green-600">
                      <div className="flex items-center">
                        <Icon name="MessageCircle" className="h-3 w-3 mr-1" />
                        WhatsApp уведомление
                      </div>
                      <div className="flex items-center">
                        <Icon name="Clock" className="h-3 w-3 mr-1" />
                        Ответ в течение 15 мин
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Контактная информация */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon
                          name={info.icon as any}
                          className="h-6 w-6 text-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.content.map((item, idx) => (
                            <div key={idx}>
                              {info.action ? (
                                <a
                                  href={info.action}
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {item}
                                </a>
                              ) : (
                                <p className="text-muted-foreground">{item}</p>
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
                <div className="bg-muted h-64 rounded-md flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Icon name="MapPin" className="h-12 w-12 mx-auto mb-3" />
                    <p className="font-semibold">Интерактивная карта</p>
                    <p className="text-sm">г. Новосибирск, ул. Ленина, д. 3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Быстрые контакты */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Icon name="Phone" className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Нужна срочная консультация?
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  Звоните прямо сейчас, мы работаем до 19:00
                </p>
                <a href="tel:+79994523500">
                  <Button size="lg" variant="secondary" className="w-full">
                    +7 (999) 452-35-00
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Как проходит консультация */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Как проходит консультация
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Простой и понятный процесс получения юридической помощи
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Заявка</h3>
              <p className="text-muted-foreground">
                Оставляете заявку на сайте или звоните по телефону в удобное
                время
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Обратный звонок</h3>
              <p className="text-muted-foreground">
                Наш специалист связывается с вами в течение 30 минут для
                уточнения деталей
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Консультация</h3>
              <p className="text-muted-foreground">
                Получаете бесплатную консультацию и конкретный план решения
                вопроса
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;