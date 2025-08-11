import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

export default function AboutPage() {
  const team = [
    {
      name: 'Анна Петрова',
      position: 'Управляющий партнер',
      education: 'МГУ им. М.В. Ломоносова, юридический факультет',
      experience: '15 лет опыта в корпоративном праве',
      specialization: 'Корпоративное право, M&A, реструктуризация',
      achievements: ['Более 200 успешных сделок M&A', 'Эксперт по корпоративным спорам', 'Автор 20+ публикаций по праву']
    },
    {
      name: 'Михаил Соколов',
      position: 'Старший партнер',
      education: 'МГИМО, международное право',
      experience: '12 лет опыта в арбитражных спорах',
      specialization: 'Арбитражное право, международные споры',
      achievements: ['Выиграл дела на сумму более 500 млн рублей', 'Представлял интересы в Верховном суде', 'Арбитр ICAC при ТПП РФ']
    },
    {
      name: 'Елена Волкова',
      position: 'Партнер',
      education: 'СПбГУ, гражданское право',
      experience: '10 лет опыта в трудовом праве',
      specialization: 'Трудовое право, HR-консалтинг',
      achievements: ['Консультант крупнейших HR-агентств', 'Спикер профильных конференций', 'Эксперт по трудовому законодательству']
    }
  ]

  const achievements = [
    {
      year: '2008',
      title: 'Основание компании',
      description: 'Создание юридической фирмы с фокусом на качество услуг'
    },
    {
      year: '2012',
      title: 'Расширение команды',
      description: 'Привлечение опытных юристов из ведущих международных фирм'
    },
    {
      year: '2016',
      title: 'Признание экспертизы',
      description: 'Включение в рейтинги ведущих российских правовых изданий'
    },
    {
      year: '2020',
      title: 'Цифровизация услуг',
      description: 'Запуск онлайн-платформы для работы с клиентами'
    },
    {
      year: '2024',
      title: 'Лидерство рынка',
      description: 'Более 500 постоянных корпоративных клиентов'
    }
  ]

  const values = [
    {
      icon: 'Shield',
      title: 'Профессионализм',
      description: 'Глубокая экспертиза и постоянное развитие компетенций'
    },
    {
      icon: 'Heart',
      title: 'Клиентоориентированность',
      description: 'Индивидуальный подход к каждому клиенту и его потребностям'
    },
    {
      icon: 'CheckCircle',
      title: 'Надежность',
      description: 'Соблюдение сроков и обязательств перед клиентами'
    },
    {
      icon: 'Lightbulb',
      title: 'Инновации',
      description: 'Применение современных технологий в юридической практике'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            О нашей компании
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Мы — команда профессиональных юристов с более чем 15-летним опытом работы. 
            Наша миссия — обеспечить надежную правовую защиту для бизнеса и частных лиц.
          </p>
        </div>

        {/* История компании */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">История развития</h2>
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {achievement.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-slate-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Наши ценности */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={value.icon as any} size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Команда */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-blue-600 font-semibold">{member.position}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Образование:</h4>
                      <p className="text-slate-600 text-sm">{member.education}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Опыт:</h4>
                      <p className="text-slate-600 text-sm">{member.experience}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Специализация:</h4>
                      <p className="text-slate-600 text-sm">{member.specialization}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Достижения:</h4>
                      <ul className="space-y-1">
                        {member.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-600">
                            <Icon name="Star" size={12} className="text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Статистика */}
        <section className="mb-16 bg-slate-900 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Наши результаты</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-slate-300">Лет на рынке</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-slate-300">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">2000+</div>
              <div className="text-slate-300">Успешных дел</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-slate-300">Побед в судах</div>
            </div>
          </div>
        </section>

        {/* Сертификаты и членство */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Сертификаты и членство</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Icon name="Award" size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Адвокатская палата г. Москвы</h3>
              <p className="text-sm text-slate-600">Все партнеры — члены адвокатской палаты</p>
            </Card>
            
            <Card className="text-center p-6">
              <Icon name="Certificate" size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Ассоциация юристов России</h3>
              <p className="text-sm text-slate-600">Активные участники профессионального сообщества</p>
            </Card>
            
            <Card className="text-center p-6">
              <Icon name="Globe" size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Международная арбитражная практика</h3>
              <p className="text-sm text-slate-600">Опыт работы с международными спорами</p>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Готовы стать нашими клиентами?
          </h2>
          <p className="text-blue-100 mb-6">
            Получите профессиональную юридическую помощь от экспертов с многолетним опытом
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Получить консультацию
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Icon name="FileText" size={20} className="mr-2" />
                Посмотреть услуги
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}