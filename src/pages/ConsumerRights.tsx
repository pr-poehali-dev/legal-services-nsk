import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ConsumerRights() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Защита прав потребителей
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Вернём деньги за некачественный товар или услугу. Профессиональная юридическая помощь по фиксированной цене.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/79994523500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Написать в WhatsApp
              </Button>
            </a>
            <a href="tel:+79994523500">
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Phone" className="mr-2" size={20} />
                Позвонить
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            +7 (999) 452-35-00 • Консультация бесплатно
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Мы поможем в следующих ситуациях
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Icon name="ShoppingBag" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Некачественный товар</h3>
                <p className="text-muted-foreground">
                  Вернём деньги за бракованный, неисправный или не соответствующий описанию товар
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Icon name="Wrench" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Плохие услуги</h3>
                <p className="text-muted-foreground">
                  Компенсация за некачественный ремонт, строительство, медицинские или туристические услуги
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Icon name="FileText" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Навязанные услуги</h3>
                <p className="text-muted-foreground">
                  Отмена страховок, дополнительных опций и других навязанных при покупке услуг
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Icon name="Clock" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Нарушение сроков</h3>
                <p className="text-muted-foreground">
                  Неустойка за просрочку поставки товара, выполнения работ или оказания услуг
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Icon name="AlertCircle" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Причинение вреда</h3>
                <p className="text-muted-foreground">
                  Компенсация морального вреда и убытков из-за некачественного товара или услуги
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Icon name="Ban" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Отказ в возврате</h3>
                <p className="text-muted-foreground">
                  Поможем вернуть деньги, даже если продавец отказывается принимать претензию
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как мы работаем
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Бесплатная консультация</h3>
                <p className="text-muted-foreground">
                  Изучаем вашу ситуацию, оцениваем перспективы и озвучиваем стоимость услуг
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Досудебная претензия</h3>
                <p className="text-muted-foreground">
                  Составляем и направляем претензию продавцу или исполнителю. В 70% случаев вопрос решается на этом этапе
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Судебное разбирательство</h3>
                <p className="text-muted-foreground">
                  При отказе — подаём иск в суд, представляем ваши интересы и получаем решение в вашу пользу
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Получение денег</h3>
                <p className="text-muted-foreground">
                  Помогаем взыскать присуждённую сумму через службу судебных приставов
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Стоимость услуг
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Досудебная претензия</h3>
                <p className="text-4xl font-bold text-primary mb-4">от 5 000 ₽</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Анализ документов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Составление претензии</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Отправка претензии</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Переговоры с продавцом</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Судебное взыскание</h3>
                <p className="text-4xl font-bold text-primary mb-4">от 15 000 ₽</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Всё из досудебного этапа</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Подготовка искового заявления</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Представительство в суде</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1" size={20} />
                    <span>Взыскание через приставов</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-center mt-8 text-muted-foreground">
            Точная стоимость определяется после консультации и зависит от сложности дела
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <Icon name="Award" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">Опыт</h3>
              <p className="text-muted-foreground">
                Более 200 выигранных дел по защите прав потребителей
              </p>
            </div>
            
            <div className="text-center">
              <Icon name="DollarSign" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">Прозрачность</h3>
              <p className="text-muted-foreground">
                Фиксированная цена без скрытых платежей
              </p>
            </div>
            
            <div className="text-center">
              <Icon name="Shield" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">Гарантия</h3>
              <p className="text-muted-foreground">
                Не берём безнадёжные дела — работаем на результат
              </p>
            </div>
          </div>
          
          <div className="text-center bg-primary text-primary-foreground rounded-lg p-12">
            <h3 className="text-2xl font-bold mb-4">
              Получите бесплатную консультацию
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Расскажите о вашей ситуации — мы оценим перспективы и поможем вернуть ваши деньги
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/79994523500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="text-lg px-8 bg-white text-primary hover:bg-gray-100">
                  <Icon name="MessageCircle" className="mr-2" size={20} />
                  Написать в WhatsApp
                </Button>
              </a>
              <a href="tel:+79994523500">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Позвонить
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
