import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

export default function HomePage() {
  const features = [
    {
      icon: 'Scale',
      title: 'Корпоративное право',
      description: 'Полное юридическое сопровождение бизнеса от регистрации до реорганизации'
    },
    {
      icon: 'FileText',
      title: 'Договорное право',
      description: 'Составление, анализ и сопровождение сделок любой сложности'
    },
    {
      icon: 'Shield',
      title: 'Арбитраж',
      description: 'Защита интересов в арбитражных и гражданских судах'
    },
    {
      icon: 'Users',
      title: 'Трудовое право',
      description: 'Решение трудовых споров и кадрового документооборота'
    }
  ]

  const stats = [
    { value: '500+', label: 'Довольных клиентов' },
    { value: '2000+', label: 'Выигранных дел' },
    { value: '15', label: 'Лет опыта' },
    { value: '98%', label: 'Успешных решений' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero секция */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Юридическая защита <span className="text-blue-600">вашего бизнеса</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Команда профессиональных юристов с опытом работы более 15 лет. 
            Защищаем интересы клиентов в судах любой инстанции и обеспечиваем 
            комплексное юридическое сопровождение бизнеса.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/services">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                <Icon name="FileText" size={20} className="mr-2" />
                Посмотреть услуги и цены
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Icon name="Phone" size={20} className="mr-2" />
                Бесплатная консультация
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Основные услуги */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Наши ключевые направления
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Предоставляем полный спектр юридических услуг для физических лиц и бизнеса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature.icon as any} size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Почему выбирают именно нас
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Мы гарантируем профессиональный подход и максимальный результат
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Быстрое решение</h3>
              <p className="text-slate-300">
                Оперативно реагируем на обращения и решаем вопросы в кратчайшие сроки
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Высокая экспертиза</h3>
              <p className="text-slate-300">
                Команда опытных юристов с профильным образованием и многолетней практикой
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="DollarSign" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Честные цены</h3>
              <p className="text-slate-300">
                Прозрачное ценообразование без скрытых платежей и дополнительных комиссий
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 bg-blue-600 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Нужна юридическая помощь?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Получите бесплатную консультацию от наших экспертов прямо сейчас
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Получить консультацию
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              <Icon name="Phone" size={20} className="mr-2" />
              +7 (999) 452-35-00
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}