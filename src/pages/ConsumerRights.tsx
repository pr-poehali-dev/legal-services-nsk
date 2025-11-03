import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ConsumerRights() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">
            🔥 Вернём деньги или работаем бесплатно
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Защита прав потребителей
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Вернём до 200% от стоимости товара + неустойку + моральный вред + судебные расходы
          </p>
          <p className="text-lg mb-8">
            <strong>Средняя сумма взыскания — 187 000 ₽</strong> • 93% дел выигрываем
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/79994523500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Получить консультацию
              </Button>
            </a>
            <a href="tel:+79994523500">
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Phone" className="mr-2" size={20} />
                +7 (999) 452-35-00
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Бесплатная консультация • Ответим за 15 минут
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Закон на вашей стороне
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            По закону «О защите прав потребителей» вы можете получить гораздо больше, чем просто вернуть деньги
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white border-2 border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <h3 className="text-lg font-semibold mb-2">Полный возврат</h3>
                <p className="text-sm text-muted-foreground">
                  Стоимость товара или услуги по ст. 18, 29 ЗоЗПП
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">50%</div>
                <h3 className="text-lg font-semibold mb-2">Штраф за отказ</h3>
                <p className="text-sm text-muted-foreground">
                  От взысканной суммы по п. 6 ст. 13 ЗоЗПП
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">1%</div>
                <h3 className="text-lg font-semibold mb-2">Неустойка в день</h3>
                <p className="text-sm text-muted-foreground">
                  За каждый день просрочки по ст. 23, 28 ЗоЗПП
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">до 50К</div>
                <h3 className="text-lg font-semibold mb-2">Моральный вред</h3>
                <p className="text-sm text-muted-foreground">
                  За переживания и неудобства по ст. 15 ЗоЗПП
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Icon name="Scale" className="text-green-700" size={24} />
              Реальный пример
            </h3>
            <p className="text-muted-foreground">
              Купили диван за 80 000 ₽. Через месяц он развалился, магазин отказался возвращать деньги. 
              <strong className="text-foreground"> Мы взыскали: 80 000 ₽ (возврат) + 40 000 ₽ (штраф) + 24 000 ₽ (неустойка за 80 дней) + 
              15 000 ₽ (моральный вред) + 18 000 ₽ (судебные расходы) = 177 000 ₽</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            В каких ситуациях мы поможем
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Любое нарушение ваших прав как покупателя — повод обратиться к нам
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="ShoppingBag" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Некачественный товар</h3>
                <p className="text-muted-foreground mb-3">
                  Бракованный, неисправный, не соответствующий описанию или опасный товар
                </p>
                <p className="text-sm text-primary font-semibold">
                  Ст. 18 ЗоЗПП + возврат + штраф + неустойка
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="Wrench" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Плохие услуги</h3>
                <p className="text-muted-foreground mb-3">
                  Некачественный ремонт, строительство, медицинские, туристические или любые другие услуги
                </p>
                <p className="text-sm text-primary font-semibold">
                  Ст. 29 ЗоЗПП + возврат + переделка + компенсация
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="FileX" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Навязанные услуги</h3>
                <p className="text-muted-foreground mb-3">
                  Страховки, гарантии, допы при покупке автомобиля, техники, кредитов
                </p>
                <p className="text-sm text-primary font-semibold">
                  Ст. 16 ЗоЗПП + возврат 100% + штраф за отказ
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="Clock" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Нарушение сроков</h3>
                <p className="text-muted-foreground mb-3">
                  Просрочка доставки товара, выполнения ремонта, гарантийных обязательств
                </p>
                <p className="text-sm text-primary font-semibold">
                  Ст. 23, 28 ЗоЗПП + 1% в день неустойки
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="AlertCircle" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Причинение вреда</h3>
                <p className="text-muted-foreground mb-3">
                  Товар испортил имущество, причинил вред здоровью или привёл к убыткам
                </p>
                <p className="text-sm text-primary font-semibold">
                  Ст. 14, 15 ЗоЗПП + убытки + моральный вред
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Icon name="Ban" className="mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold mb-2">Отказ в возврате</h3>
                <p className="text-muted-foreground mb-3">
                  Магазин не принимает претензию, не отвечает или нарушает ваши права
                </p>
                <p className="text-sm text-primary font-semibold">
                  Ст. 13 ЗоЗПП + суд + штраф 50% + расходы
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Как проходит работа
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Простой и понятный процесс — вы всегда в курсе, что происходит с вашим делом
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Бесплатная консультация за 15 минут</h3>
                <p className="text-muted-foreground">
                  Изучаем документы, оцениваем перспективы и рассчитываем точную сумму взыскания. 
                  Называем фиксированную стоимость услуг без скрытых платежей.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Досудебная претензия (10 дней)</h3>
                <p className="text-muted-foreground">
                  Составляем юридически грамотную претензию по ст. 18, 29 ЗоЗПП с расчётом всех компенсаций. 
                  Отправляем продавцу. <strong>В 73% случаев вопрос решается здесь.</strong>
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Судебное взыскание (2-4 месяца)</h3>
                <p className="text-muted-foreground">
                  При отказе подаём иск, собираем доказательства, представляем интересы в суде. 
                  Добиваемся взыскания суммы товара + штрафа 50% + неустойки + морального вреда + судебных расходов.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Принудительное взыскание</h3>
                <p className="text-muted-foreground">
                  Получаем исполнительный лист, передаём приставам. Контролируем процесс до полного получения денег на ваш счёт.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Icon name="Info" className="text-blue-700" size={24} />
              Важно знать
            </h3>
            <p className="text-muted-foreground">
              По делам о защите прав потребителей вы <strong className="text-foreground">освобождены от уплаты госпошлины</strong> (ст. 333.36 НК РФ). 
              Все судебные расходы взыскиваются с ответчика.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Прозрачные цены
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Фиксированная стоимость без скрытых доплат. Оплата только после получения результата.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Досудебное урегулирование</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">от 5 000 ₽</h3>
                <p className="text-sm text-muted-foreground mb-6">Или 10% от взысканной суммы</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Анализ ситуации и документов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Расчёт всех компенсаций</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Составление претензии</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Отправка продавцу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Переговоры до получения денег</span>
                  </li>
                </ul>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-800">
                    ✓ 73% дел закрываются на этом этапе
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                Популярно
              </div>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Полное сопровождение</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">от 15 000 ₽</h3>
                <p className="text-sm text-muted-foreground mb-6">Или 15% от взысканной суммы</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Всё из досудебного этапа</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Подготовка искового заявления</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Сбор доказательств и экспертиз</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Представительство в суде</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Взыскание через приставов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span>Контроль до получения денег</span>
                  </li>
                </ul>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-800">
                    ✓ Судебные расходы взыскиваются с ответчика
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Точную стоимость назовём после бесплатной консультации. Оплата поэтапная или по результату.
            </p>
            <a
              href="https://wa.me/79994523500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Рассчитать стоимость
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему клиенты выбирают нас
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="TrendingUp" className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">93% выигранных дел</h3>
              <p className="text-muted-foreground">
                Более 240 успешных дел по защите прав потребителей за последние 2 года
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Banknote" className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">187 000 ₽ в среднем</h3>
              <p className="text-muted-foreground">
                Средняя сумма взыскания благодаря штрафам, неустойкам и компенсациям
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Shield" className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Работаем на результат</h3>
              <p className="text-muted-foreground">
                Если не вернём деньги — наши услуги бесплатно. Оплата только за результат
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Узнайте, сколько вы можете взыскать
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Бесплатная консультация за 15 минут. Рассчитаем точную сумму с учётом всех компенсаций по закону.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-primary">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Позвонить сейчас
                </Button>
              </a>
            </div>
            <p className="text-sm opacity-75">
              +7 (999) 452-35-00 • Работаем с 9:00 до 21:00 без выходных
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-center mb-8">
            Ваши права защищены законом
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-background p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="BookOpen" className="text-primary" size={18} />
                Закон «О защите прав потребителей»
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ст. 18 — возврат за некачественный товар</li>
                <li>• Ст. 29 — возврат за плохие услуги</li>
                <li>• Ст. 23, 28 — неустойка за просрочку</li>
                <li>• Ст. 13 — штраф 50% за отказ</li>
                <li>• Ст. 15 — моральный вред</li>
              </ul>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="FileCheck" className="text-primary" size={18} />
                Процессуальные льготы
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ст. 333.36 НК — без госпошлины</li>
                <li>• Иск по месту жительства</li>
                <li>• Упрощённая процедура</li>
                <li>• Все расходы с ответчика</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
