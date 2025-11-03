import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { CONTACTS } from '@/config/contacts';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const whatsappMessage = `🚗 *Новая заявка с сайта - Автоюрист*

👤 *Имя:* ${formData.name}
📞 *Телефон:* ${formData.phone}${formData.message ? `\n\n💬 *Сообщение:*\n${formData.message}` : ''}

⏰ *Время:* ${new Date().toLocaleString('ru-RU')}`;

      const response = await fetch(
        'https://1103.api.green-api.com/waInstance1103279953/sendMessage/c80e4b7d4aa14f7c9f0b86e05730e35f1200768ef5b046209e',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatId: '79994523500@c.us',
            message: whatsappMessage,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus('success');
        
        // Отправляем событие в Яндекс.Метрику
        if (typeof window !== 'undefined' && window.ym) {
          window.ym(103525320, 'reachGoal', 'car_lawyer_form_submit');
        }
        
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-16 px-4 bg-gradient-to-br from-primary/10 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            Получите бесплатную консультацию
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оставьте заявку — перезвоним в течение {CONTACTS.responseTime} и расскажем, сколько сможете получить
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

                <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2" size={20} />
                      Отправить заявку
                    </>
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
                    ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                    ❌ Ошибка отправки. Попробуйте позвонить нам напрямую.
                  </div>
                )}

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
                <a href={`tel:${CONTACTS.phone}`} className="text-2xl font-bold text-primary hover:underline">
                  {CONTACTS.phoneFormatted}
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  {CONTACTS.workingHours}
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
                  href={`https://wa.me/${CONTACTS.whatsapp}`}
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
                    <span>Перезвоним в течение {CONTACTS.responseTime}</span>
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