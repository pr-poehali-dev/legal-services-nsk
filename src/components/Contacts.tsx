import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Contacts = () => {
  const contactInfo = [
    {
      icon: "Phone",
      title: "Телефон",
      value: "+7 (999) 452 35 00",
      link: "tel:+79994523500",
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя *</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон *</label>
                  <Input placeholder="+7 (___) ___-__-__" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Тема обращения</label>
                <Input placeholder="Кратко опишите тему вопроса" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Сообщение *</label>
                <Textarea
                  placeholder="Подробно опишите вашу ситуацию или вопрос..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" id="consent" />
                <label
                  htmlFor="consent"
                  className="text-sm text-muted-foreground"
                >
                  Я согласен на обработку персональных данных в соответствии с
                  политикой конфиденциальности
                </label>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <Icon name="Send" className="h-5 w-5 mr-2" />
                Отправить сообщение
              </Button>

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