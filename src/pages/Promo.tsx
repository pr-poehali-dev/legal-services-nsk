import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Promo() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Scale" size={28} className="text-primary" />
            <span className="text-xl font-bold">ЮрПомощь 24/7</span>
          </div>
          <Link to="/login">
            <Button variant="outline">Войти</Button>
          </Link>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            Юридическая помощь без очередей, <br />
            бюрократии и переплат
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Решаем ваши правовые вопросы онлайн — быстро, прозрачно, по фиксированной цене
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Получить консультацию
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Узнать цены
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Знакомые проблемы?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="Clock" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Недели ожидания приёма</h3>
              <p className="text-muted-foreground">
                Записались к юристу через 2 недели, а проблема требует решения сегодня
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="DollarSign" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Непонятные цены</h3>
              <p className="text-muted-foreground">
                Консультация "от 3000₽", а по факту счёт на 15000₽ за простой вопрос
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="FileQuestion" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Сложные термины</h3>
              <p className="text-muted-foreground">
                Юристы говорят на "птичьем языке" — непонятно, что делать дальше
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="PhoneOff" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Потеря контакта</h3>
              <p className="text-muted-foreground">
                После оплаты юрист пропадает, не отвечает на звонки и сообщения
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="Building" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Дорогой офис</h3>
              <p className="text-muted-foreground">
                Платите за аренду премиальных офисов юристов, а не за саму услугу
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Без гарантий</h3>
              <p className="text-muted-foreground">
                Непонятно, кто отвечает за результат, если что-то пойдёт не так
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Мы решили все эти проблемы
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Современный подход к юридическим услугам
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ответ за 15 минут</h3>
                <p className="text-muted-foreground">
                  Не нужно ждать неделями — получите первую консультацию в течение 15 минут после обращения
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Tag" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Прозрачные цены</h3>
                <p className="text-muted-foreground">
                  Фиксированная стоимость услуг, которую вы видите до начала работы. Без скрытых платежей
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="MessageSquare" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Простым языком</h3>
                <p className="text-muted-foreground">
                  Объясняем сложные юридические вещи понятными словами, без профессионального жаргона
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Smartphone" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Всегда на связи</h3>
                <p className="text-muted-foreground">
                  Следите за статусом дела в личном кабинете 24/7. Юрист всегда доступен в мессенджере
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Home" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Онлайн формат</h3>
                <p className="text-muted-foreground">
                  Решаем вопросы удалённо — не тратьте время на поездки в офис и простаивание в очередях
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Гарантия результата</h3>
                <p className="text-muted-foreground">
                  Договор с чёткими обязательствами. Если не выполним — вернём деньги
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Области практики
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Помогаем в самых распространённых юридических вопросах
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Icon name="Car" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Автоюрист</h3>
              <p className="text-muted-foreground text-sm mb-4">
                ДТП, споры со страховыми, лишение прав, штрафы ГИБДД
              </p>
              <p className="text-primary font-medium">от 5 000 ₽</p>
            </div>

            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Icon name="Building2" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Недвижимость</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Купля-продажа, аренда, выписка, раздел имущества
              </p>
              <p className="text-primary font-medium">от 8 000 ₽</p>
            </div>

            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Icon name="Users" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Семейное право</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Развод, алименты, раздел имущества, опека
              </p>
              <p className="text-primary font-medium">от 10 000 ₽</p>
            </div>

            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Icon name="Briefcase" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Трудовое право</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Увольнение, невыплата зарплаты, трудовые споры
              </p>
              <p className="text-primary font-medium">от 7 000 ₽</p>
            </div>

            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Icon name="ShieldCheck" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Защита прав потребителей</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Возврат товара, некачественные услуги, обман покупателей
              </p>
              <p className="text-primary font-medium">от 5 000 ₽</p>
            </div>

            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Icon name="Scale" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Гражданские споры</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Долги, договоры, взыскания, имущественные споры
              </p>
              <p className="text-primary font-medium">от 6 000 ₽</p>
            </div>

            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Icon name="Plane" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Миграционное право</h3>
              <p className="text-muted-foreground text-sm mb-4">
                РВП, ВНЖ, гражданство, депортация
              </p>
              <p className="text-primary font-medium">от 15 000 ₽</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Первая консультация — бесплатно
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Опишите вашу ситуацию, и мы предложим план действий с точной стоимостью
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Получить консультацию
            </Button>
          </Link>
          <p className="mt-4 text-sm opacity-75">
            Регистрация займёт 30 секунд
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как это работает
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Опишите проблему</h3>
              <p className="text-muted-foreground text-sm">
                Заполните простую форму или напишите в чате
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Получите план</h3>
              <p className="text-muted-foreground text-sm">
                Юрист проанализирует ситуацию и предложит решение
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Согласуйте цену</h3>
              <p className="text-muted-foreground text-sm">
                Узнаете точную стоимость до начала работы
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Решайте вопрос</h3>
              <p className="text-muted-foreground text-sm">
                Следите за прогрессом онлайн, получайте результат
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ЮрПомощь 24/7. Юридические услуги онлайн</p>
        </div>
      </footer>
    </div>
  );
}