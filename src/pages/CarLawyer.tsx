import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function CarLawyer() {
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <section className="relative py-20 px-4 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
                <Icon name="ShieldCheck" className="inline mr-2" size={20} />
                Защита автопокупателей
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Вернём деньги за проблемный автомобиль
              </h1>
              <p className="text-xl mb-6 text-white/90">
                Купили машину с дефектами? Обманули при покупке? 
                <span className="block font-bold mt-2">Взыщем полную стоимость + компенсацию до 300%</span>
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="text-3xl font-bold mb-1">98%</div>
                  <div className="text-sm text-white/80">Выигранных дел</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="text-3xl font-bold mb-1">450+</div>
                  <div className="text-sm text-white/80">Возвращено авто</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="text-3xl font-bold mb-1">24 часа</div>
                  <div className="text-sm text-white/80">До консультации</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#form">
                  <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100 text-lg h-14 px-8">
                    <Icon name="FileText" className="mr-2" size={20} />
                    Оставить заявку
                  </Button>
                </a>
                <a href="tel:+79994523500">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg h-14 px-8">
                    <Icon name="Phone" className="mr-2" size={20} />
                    Позвонить сейчас
                  </Button>
                </a>
                <a href="https://wa.me/79994523500" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg h-14 px-8">
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Icon name="AlertCircle" className="text-red-600" size={28} />
                    Узнайте за 5 минут
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>Можно ли вернуть ваш автомобиль</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>Сколько денег получите сверх стоимости</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>Какие документы нужны</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>Сроки возврата денег</span>
                    </div>
                  </div>
                  <a href="#form" className="block mt-6">
                    <Button className="w-full h-12 text-lg bg-red-600 hover:bg-red-700">
                      Получить консультацию
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            Ваша ситуация? Мы решаем!
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Если хотя бы один пункт про вас — у вас есть все шансы вернуть деньги с компенсацией
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name="AlertTriangle" className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Скрыли пробег</h3>
                <p className="text-muted-foreground mb-4">
                  Обнаружили, что реальный пробег больше заявленного? Это обман покупателя по ст. 18 ЗоЗПП
                </p>
                <span className="text-sm font-semibold text-red-600">→ Полный возврат + штраф</span>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Wrench" className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Скрытые дефекты</h3>
                <p className="text-muted-foreground mb-4">
                  Авто после ДТП, проблемы с двигателем, коробкой? Продавец обязан был сообщить
                </p>
                <span className="text-sm font-semibold text-red-600">→ Возврат денег + расходы</span>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name="FileX" className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Проблемы с документами</h3>
                <p className="text-muted-foreground mb-4">
                  Дубликат ПТС, залог, ограничения ГИБДД, скрытая история — основание для расторжения
                </p>
                <span className="text-sm font-semibold text-red-600">→ Аннулируем сделку</span>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name="DollarSign" className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Завышена цена</h3>
                <p className="text-muted-foreground mb-4">
                  Реальная стоимость авто на 20-30% ниже? Это существенное нарушение условий договора
                </p>
                <span className="text-sm font-semibold text-red-600">→ Перерасчёт + возврат</span>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Hammer" className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Постоянные поломки</h3>
                <p className="text-muted-foreground mb-4">
                  Машина всё время в ремонте? Недостаток технически неустраним — основание для возврата
                </p>
                <span className="text-sm font-semibold text-red-600">→ Деньги назад + ремонты</span>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Продавец не идёт на контакт</h3>
                <p className="text-muted-foreground mb-4">
                  Игнорирует претензии, отказывает в возврате? Через суд получите в 2-3 раза больше
                </p>
                <span className="text-sm font-semibold text-red-600">→ Суд + штраф 50%</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl">
                <Icon name="ShieldCheck" className="text-white" size={80} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">
                Сопровождение при покупке автомобиля
              </h2>
              <p className="text-xl mb-6 text-white/90">
                Не дайте себя обмануть! Проверим юридическую чистоту сделки ДО покупки
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                  <span>Проверка ДКП и документов продавца</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                  <span>Проверка на залог, арест, ограничения</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                  <span>Анализ истории авто по базам</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="mt-1 flex-shrink-0" size={20} />
                  <span>Юридическое сопровождение сделки</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-white text-gray-900">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">5 000 ₽</div>
                  <p className="text-sm text-muted-foreground mb-4">Полная проверка + сопровождение</p>
                  <a href="https://wa.me/79994523500?text=Хочу%20проверку%20авто%20перед%20покупкой" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Заказать проверку
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            Что вы получите с нами
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Работаем по закону «О защите прав потребителей» — вы получите намного больше, чем заплатили
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-primary mb-3">100%</div>
                <h3 className="font-semibold mb-2">Полный возврат</h3>
                <p className="text-sm text-muted-foreground">Вся стоимость автомобиля по ст. 18 ЗоЗПП</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-primary mb-3">50%</div>
                <h3 className="font-semibold mb-2">Штраф</h3>
                <p className="text-sm text-muted-foreground">От суммы взыскания за отказ продавца</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-primary mb-3">1%</div>
                <h3 className="font-semibold mb-2">Неустойка</h3>
                <p className="text-sm text-muted-foreground">За каждый день просрочки по ст. 23</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-primary mb-3">+50К</div>
                <h3 className="font-semibold mb-2">Моральный вред</h3>
                <p className="text-sm text-muted-foreground">Компенсация стресса и неудобств</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Icon name="TrendingUp" className="text-blue-600" size={32} />
                Реальный пример из практики
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Ситуация клиента:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Купил Volkswagen Tiguan за 1 850 000 ₽</li>
                    <li>• Через 2 месяца обнаружил скрученный пробег (было 180 тыс. вместо 45 тыс.)</li>
                    <li>• Продавец отказался возвращать деньги</li>
                    <li>• Прошло 90 дней с момента претензии</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Что взыскали через суд:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Возврат стоимости авто:</span>
                      <span className="font-bold">1 850 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Неустойка (90 дней × 1%):</span>
                      <span className="font-bold">1 665 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Штраф 50%:</span>
                      <span className="font-bold">1 757 500 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Моральный вред:</span>
                      <span className="font-bold">50 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Юридические расходы:</span>
                      <span className="font-bold">45 000 ₽</span>
                    </div>
                    <div className="border-t-2 border-blue-300 pt-3 mt-3">
                      <div className="flex justify-between items-center text-xl">
                        <span className="font-bold">ИТОГО взыскано:</span>
                        <span className="font-bold text-blue-600">5 367 500 ₽</span>
                      </div>
                      <p className="text-right text-sm text-blue-600 font-semibold mt-1">
                        В 2,9 раза больше стоимости авто!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            Как мы работаем
          </h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Берём все задачи на себя — вам нужно только предоставить документы
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Консультация</h3>
              <p className="text-white/80 text-sm">
                Анализируем вашу ситуацию, оцениваем перспективы, называем сумму взыскания
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Досудебная работа</h3>
              <p className="text-white/80 text-sm">
                Составляем претензию, проводим экспертизу, собираем доказательства
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Суд</h3>
              <p className="text-white/80 text-sm">
                Подаём иск, представляем интересы, добиваемся максимальной суммы
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                <span className="text-3xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Получение денег</h3>
              <p className="text-white/80 text-sm">
                Взыскиваем решение суда через ФССП, контролируем выплату
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Работаем по договору</h3>
                <p className="text-white/80">
                  Оплата только за результат. Если не выиграем — вы ничего не платите
                </p>
              </div>
              <div className="flex gap-3">
                <a href="#form">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 h-14 px-8">
                    Начать работу
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Icon name="Shield" className="mx-auto mb-3 text-white/80" size={32} />
              <h4 className="font-bold mb-2">Конфиденциальность</h4>
              <p className="text-sm text-white/70">Все данные защищены. Не передаём третьим лицам</p>
            </div>
            <div>
              <Icon name="Award" className="mx-auto mb-3 text-white/80" size={32} />
              <h4 className="font-bold mb-2">Опыт 12+ лет</h4>
              <p className="text-sm text-white/70">Специализируемся только на автомобильных спорах</p>
            </div>
            <div>
              <Icon name="Users" className="mx-auto mb-3 text-white/80" size={32} />
              <h4 className="font-bold mb-2">450+ довольных клиентов</h4>
              <p className="text-sm text-white/70">Вернули более 180 млн рублей</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
