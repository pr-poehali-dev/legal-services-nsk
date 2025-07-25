import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    consent: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message || !formData.consent) {
      alert("Пожалуйста, заполните все обязательные поля и дайте согласие на обработку данных");
      return;
    }

    setIsLoading(true);
    
    try {
      // Формируем сообщение для WhatsApp
      const whatsappMessage = `🔔 Новая заявка с сайта ЮрСервис НСК

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
${formData.email ? `📧 Email: ${formData.email}` : ''}
${formData.subject ? `📋 Тема: ${formData.subject}` : ''}

💬 Сообщение:
${formData.message}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

      // Отправляем в WhatsApp (номер без +7)
      const whatsappNumber = "79994523500";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Открываем WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Показываем успешное сообщение
      setIsSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
        consent: false
      });
    } catch (error) {
      alert("Произошла ошибка при отправке. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };
  const contactInfo = [
    {
      icon: "Phone",
      title: "Телефон",
      value: "+7 (383) 123-45-67",
      link: "tel:+73831234567",
    },
    {
      icon: "Mail",
      title: "Email",
      value: "info@jurservice-nsk.ru",
      link: "mailto:info@jurservice-nsk.ru",
    },
    {
      icon: "MapPin",
      title: "Адрес",
      value: "г. Новосибирск, ул. Красный проспект, д. 50, оф. 301",
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

            {/* Map placeholder */}
            <Card className="border-border">
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Icon
                      name="MapPin"
                      className="h-12 w-12 text-primary mx-auto"
                    />
                    <div className="text-muted-foreground">Карта офиса</div>
                  </div>
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
              {isSubmitted && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-amber-800">
                    <Icon name="CheckCircle" className="h-5 w-5" />
                    <span className="font-medium">Сообщение отправлено в WhatsApp!</span>
                  </div>
                  <p className="text-amber-600 text-sm mt-1">Мы получили вашу заявку и свяжемся с вами в ближайшее время</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="text-sm font-medium">Email (необязательно)</label>
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
                    className="mt-1" 
                    id="consent" 
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-muted-foreground"
                  >
                    Я согласен на обработку персональных данных в соответствии с
                    политикой конфиденциальности
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
              </form>

              <div className="text-center text-sm text-muted-foreground">
                <Icon name="Shield" className="h-4 w-4 inline mr-1" />
                Ваши данные защищены и не передаются третьим лицам
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contacts;