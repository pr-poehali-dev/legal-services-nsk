import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Все услуги', icon: 'Grid3X3' },
    { id: 'corporate', name: 'Корпоративное право', icon: 'Building2' },
    { id: 'contracts', name: 'Договорное право', icon: 'FileText' },
    { id: 'arbitrage', name: 'Арбитраж', icon: 'Scale' },
    { id: 'labor', name: 'Трудовое право', icon: 'Users' },
    { id: 'real-estate', name: 'Недвижимость', icon: 'Home' },
    { id: 'intellectual', name: 'Интеллектуальная собственность', icon: 'Lightbulb' }
  ]

  const services = [
    {
      id: 1,
      category: 'corporate',
      title: 'Регистрация ООО',
      description: 'Полное сопровождение регистрации общества с ограниченной ответственностью',
      price: '15 000',
      duration: '3-5 дней',
      popular: true,
      features: ['Подготовка документов', 'Подача в налоговую', 'Изготовление печати', 'Открытие расчетного счета']
    },
    {
      id: 2,
      category: 'corporate',
      title: 'Регистрация ИП',
      description: 'Быстрая регистрация индивидуального предпринимателя',
      price: '5 000',
      duration: '1-2 дня',
      popular: true,
      features: ['Подготовка заявления', 'Подача документов', 'Уведомление ПФР и ФСС']
    },
    {
      id: 3,
      category: 'corporate',
      title: 'Ликвидация организации',
      description: 'Официальное закрытие юридического лица с минимальными рисками',
      price: '35 000',
      duration: '2-4 месяца',
      features: ['Подготовка документов', 'Публикация в журнале', 'Сдача отчетности', 'Закрытие счетов']
    },
    {
      id: 4,
      category: 'contracts',
      title: 'Составление договора',
      description: 'Профессиональная подготовка договоров любой сложности',
      price: '8 000',
      duration: '1-3 дня',
      features: ['Анализ потребностей', 'Составление проекта', 'Согласование условий', 'Финальная доработка']
    },
    {
      id: 5,
      category: 'contracts',
      title: 'Экспертиза договора',
      description: 'Детальный анализ договора на предмет рисков и недочетов',
      price: '5 000',
      duration: '1-2 дня',
      features: ['Правовой анализ', 'Выявление рисков', 'Рекомендации по доработке', 'Письменное заключение']
    },
    {
      id: 6,
      category: 'arbitrage',
      title: 'Представительство в арбитраже',
      description: 'Полное сопровождение дела в арбитражном суде',
      price: '50 000',
      duration: '3-12 месяцев',
      popular: true,
      features: ['Подготовка документов', 'Участие в заседаниях', 'Составление жалоб', 'Исполнение решений']
    },
    {
      id: 7,
      category: 'arbitrage',
      title: 'Досудебное урегулирование',
      description: 'Решение споров без обращения в суд',
      price: '15 000',
      duration: '1-2 месяца',
      features: ['Переговоры с контрагентом', 'Составление претензий', 'Медиация', 'Мировое соглашение']
    },
    {
      id: 8,
      category: 'labor',
      title: 'Трудовые споры',
      description: 'Защита прав работников и работодателей в трудовых отношениях',
      price: '20 000',
      duration: '1-6 месяцев',
      features: ['Консультации по ТК РФ', 'Составление документов', 'Представительство в суде', 'Взыскание задолженности']
    },
    {
      id: 9,
      category: 'labor',
      title: 'Кадровый аудит',
      description: 'Проверка соответствия кадрового делопроизводства требованиям закона',
      price: '25 000',
      duration: '5-10 дней',
      features: ['Анализ документооборота', 'Проверка трудовых договоров', 'Рекомендации по устранению нарушений', 'Обучение кадровиков']
    },
    {
      id: 10,
      category: 'real-estate',
      title: 'Сопровождение сделок с недвижимостью',
      description: 'Юридическое сопровождение покупки, продажи, аренды недвижимости',
      price: '30 000',
      duration: '1-2 месяца',
      features: ['Проверка документов', 'Составление договоров', 'Регистрация сделки', 'Решение споров']
    },
    {
      id: 11,
      category: 'intellectual',
      title: 'Регистрация товарного знака',
      description: 'Полное сопровождение регистрации торговой марки',
      price: '40 000',
      duration: '12-18 месяцев',
      features: ['Проверка уникальности', 'Подача заявки', 'Ведение переписки с Роспатентом', 'Получение свидетельства']
    },
    {
      id: 12,
      category: 'intellectual',
      title: 'Защита авторских прав',
      description: 'Защита интеллектуальной собственности от нарушений',
      price: '25 000',
      duration: '2-6 месяцев',
      features: ['Фиксация нарушений', 'Досудебные требования', 'Судебная защита', 'Взыскание компенсации']
    }
  ]

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Каталог юридических услуг
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Полный спектр правовых услуг с прозрачным ценообразованием и гарантией качества
          </p>
        </div>

        {/* Фильтры по категориям */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon name={category.icon as any} size={16} />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Сетка услуг */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className="relative hover:shadow-lg transition-shadow">
              {service.popular && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                  Популярная
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="text-xl">{service.title}</span>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {parseInt(service.price).toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-slate-500">{service.duration}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-slate-600 mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-slate-900">В услугу входит:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-600">
                        <Icon name="Check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Link to="/contact" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Заказать
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="icon">
                      <Icon name="Phone" size={16} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                Индивидуальный подход
              </h3>
              <p className="text-slate-600 mb-4">
                Если вы не нашли нужную услугу в каталоге, мы готовы предложить 
                индивидуальное решение под ваши задачи.
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Обсудить задачу
                </Button>
              </Link>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                Гарантии качества
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center">
                  <Icon name="Shield" size={16} className="text-green-500 mr-2" />
                  Гарантия возврата средств при некачественном исполнении
                </li>
                <li className="flex items-center">
                  <Icon name="Clock" size={16} className="text-green-500 mr-2" />
                  Соблюдение сроков исполнения
                </li>
                <li className="flex items-center">
                  <Icon name="FileCheck" size={16} className="text-green-500 mr-2" />
                  Страхование профессиональной ответственности
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Нужна консультация по выбору услуги?
          </h3>
          <p className="text-blue-100 mb-6">
            Наши эксперты помогут подобрать оптимальное решение для вашей ситуации
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              <Icon name="Phone" size={20} className="mr-2" />
              Получить бесплатную консультацию
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}