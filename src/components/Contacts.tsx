import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const sendToWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message || !formData.consent) {
      alert('Пожалуйста, заполните все обязательные поля и дайте согласие на обработку данных');
      return;
    }

    setIsSubmitting(true);

    try {
      // Green API настройки
      const idInstance = '1103279953';
      const apiTokenInstance = 'c80e4b7d4aa14f7c9f0b86e05730e35f1200768ef5b046209e';
      const chatId = '79931903500@c.us'; // Номер получателя

      const message = `🆕 Новое обращение с сайта:

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
${formData.email ? `📧 Email: ${formData.email}` : ''}
${formData.subject ? `📋 Тема: ${formData.subject}` : ''}

💬 Сообщение:
${formData.message}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

      const response = await fetch(`https://1103.api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chatId,
          message: message
        })
      });

      if (response.ok) {
        alert('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          consent: false
        });
      } else {
        throw new Error('Ошибка при отправке');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Произошла ошибка при отправке сообщения. Попробуйте позвонить нам напрямую.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "Phone",
      title: "Телефон",
      value: "+7 993 190 35 00",
      link: "tel:+79931903500",
    },
    {
      icon: "Mail",
      title: "Email",
      value: "vituarten@icloud.com",
      link: "mailto:vituarten@icloud.com",
    },
    {
      icon: "MapPin",
      title: "Адрес",
      value: "г. Новосибирск, ул. Ленина, д. 3, офис 323",
      link: "#",
    },
    {
      icon: "Clock",
      title: "Режим работы",
      value: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
      link: "#",
    },
  ];

  return (
    <section id="contacts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Контакты
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами для получения бесплатной консультации
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon
                          name={info.icon}
                          className="h-6 w-6 text-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground">
                          {info.title}
                        </div>
                        {info.link !== "#" ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-muted-foreground text-sm">
                            {info.value}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Yandex Map */}
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=82.920430%2C55.030204&z=11&l=map&pt=82.920430%2C55.030204,pm2rdm"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ minHeight: '300px' }}
                    title="Карта офиса в Новосибирске"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl">Задать вопрос</CardTitle>
              <p className="text-muted-foreground">
                Опишите вашу ситуацию, и мы свяжемся с вами в течение часа
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={sendToWhatsApp} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Имя *</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ваше имя" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Телефон *</label>
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (___) ___-__-__" 
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Тема обращения</label>
                  <Input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Кратко опишите тему вопроса" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Подробно опишите вашу ситуацию или вопрос..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1" 
                    id="consent" 
                    required
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-muted-foreground"
                  >
                    Я согласен на обработку персональных данных в соответствии с{" "}
                    <a 
                      href="/privacy" 
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      политикой конфиденциальности
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="h-5 w-5 mr-2 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="h-5 w-5 mr-2" />
                      Отправить сообщение
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <Icon name="Shield" className="h-4 w-4 inline mr-1" />
                  Ваши данные защищены и не передаются третьим лицам
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contacts;