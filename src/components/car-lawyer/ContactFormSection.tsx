import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Заявка с сайта:%0A%0AИмя: ${formData.name}%0AТелефон: ${formData.phone}%0AСообщение: ${formData.message}`;
    window.open(`https://wa.me/79994523500?text=${whatsappMessage}`, '_blank');
  };

  return (
    <section id="form" className="py-16 px-4 bg-gradient-to-br from-primary/10 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            Получите бесплатную консультацию
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оставьте заявку — перезвоним в течение 15 минут и расскажем, сколько сможете получить
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Заявка на консультацию</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Иван"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Опишите вашу ситуацию</Label>
                  <Textarea
                    id="message"
                    placeholder="Купил автомобиль, обнаружил скрытые дефекты..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-32"
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить заявку
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Icon name="Phone" className="text-primary" size={24} />
                  Позвонить сейчас
                </h4>
                <a href="tel:+79994523500" className="text-2xl font-bold text-primary hover:underline">
                  +7 (999) 452-35-00
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Работаем ежедневно с 9:00 до 21:00
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-600 text-white">
              <CardContent className="p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  Написать в WhatsApp
                </h4>
                <a 
                  href="https://wa.me/79994523500" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-white text-green-600 hover:bg-gray-100 h-12">
                    Открыть чат
                  </Button>
                </a>
                <p className="text-sm text-white/90 mt-2">
                  Отвечаем в мессенджерах круглосуточно
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Icon name="Clock" className="text-primary" size={24} />
                  Быстрый ответ
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                    <span>Перезвоним в течение 15 минут</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                    <span>Бесплатная первичная консультация</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                    <span>Оценим перспективы за 5 минут</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
