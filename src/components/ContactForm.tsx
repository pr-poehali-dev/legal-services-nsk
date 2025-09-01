import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  service: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "", service: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Icon name="Check" className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Спасибо за обращение!</h3>
        <p className="text-muted-foreground mb-4">
          Ваша заявка принята. Мы свяжемся с вами в течение 15 минут.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.open("tel:+79931903500", "_self")}
            className="bg-primary hover:bg-primary/90"
          >
            <Icon name="Phone" className="h-4 w-4 mr-2" />
            Позвонить сейчас
          </Button>
          <Button variant="outline" onClick={() => setIsSuccess(false)}>
            Отправить ещё заявку
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Получить консультацию</h3>
        <p className="text-muted-foreground">
          Оставьте заявку и получите бесплатную консультацию в течение 15 минут
        </p>
        <div className="flex items-center mt-3 p-3 bg-accent/10 rounded-lg">
          <Icon name="Phone" className="h-5 w-5 text-accent mr-2" />
          <span className="font-semibold text-accent">+7 993 190 35 00</span>
          <span className="text-sm text-muted-foreground ml-2">
            — звоните прямо сейчас
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Ваше имя *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Как к вам обращаться?"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 999 123 45 67"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <Label htmlFor="service">Тип услуги</Label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          >
            <option value="">Выберите услугу</option>
            <option value="consultation">Консультация</option>
            <option value="civil">Гражданское право</option>
            <option value="business">Корпоративное право</option>
            <option value="family">Семейное право</option>
            <option value="criminal">Уголовная защита</option>
            <option value="real-estate">Недвижимость</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div>
          <Label htmlFor="message">Опишите вашу ситуацию</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Кратко опишите вашу проблему или вопрос..."
            rows={4}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Icon name="Loader2" className="h-5 w-5 mr-2 animate-spin" />
              Отправляем...
            </>
          ) : (
            <>
              <Icon name="Send" className="h-5 w-5 mr-2" />
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ БЕСПЛАТНО
            </>
          )}
        </Button>

        <div className="flex items-center justify-center space-x-4 pt-4 border-t">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Clock" className="h-4 w-4 mr-1" />
            Ответ в течение 15 мин
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Shield" className="h-4 w-4 mr-1" />
            100% конфиденциально
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
