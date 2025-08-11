import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const About = () => {
  const { openModal } = useModal();

  const team = [
    {
      name: "Елена Петрова",
      position: "Управляющий партнер",
      experience: "15 лет опыта в корпоративном праве",
      education: "МГУ им. М.В. Ломоносова, юридический факультет",
      specialization: "Корпоративное право, M&A сделки, реструктуризация бизнеса",
      achievements: [
        "Сопровождение более 200 сделок M&A",
        "Эксперт по корпоративным спорам",
        "Автор 25+ публикаций по корпоративному праву"
      ]
    },
    {
      name: "Михаил Соколов", 
      position: "Старший партнер",
      experience: "12 лет опыта в арбитражном процессе",
      education: "МГИМО, международное право",
      specialization: "Арбитражное право, банкротство, налоговые споры",
      achievements: [
        "Выиграл дела на сумму более 800 млн рублей",
        "Представлял интересы в Верховном суде РФ",
        "Арбитр Международного коммерческого арбитража"
      ]
    },
    {
      name: "Анна Волкова",
      position: "Ведущий юрист",
      experience: "8 лет опыта в гражданском праве",
      education: "НГУ, юридический факультет",
      specialization: "Семейное право, наследственные споры, недвижимость",
      achievements: [
        "Специалист по сложным семейным спорам",
        "Эксперт по сделкам с недвижимостью",
        "Консультант крупных девелоперских компаний"
      ]
    }
  ];

  const achievements = [
    {
      year: "2008",
      title: "Основание компании",
      description: "Создание юридической фирмы с фокусом на качественные правовые услуги в Новосибирске"
    },
    {
      year: "2012", 
      title: "Расширение команды",
      description: "Привлечение опытных специалистов из ведущих московских и региональных юридических фирм"
    },
    {
      year: "2016",
      title: "Признание на рынке",
      description: "Включение в рейтинг лучших юридических фирм Сибири по версии Право.ru"
    },
    {
      year: "2020",
      title: "Цифровизация процессов",
      description: "Внедрение современных IT-решений для повышения качества обслуживания клиентов"
    },
    {
      year: "2024",
      title: "Лидерские позиции",
      description: "Более 500 постоянных корпоративных клиентов, свыше 2000 успешно завершенных дел"
    }
  ];

  const values = [
    {
      icon: "Shield",
      title: "Профессионализм",
      description: "Глубокая экспертиза и постоянное совершенствование навыков наших специалистов"
    },
    {
      icon: "Heart", 
      title: "Клиентоориентированность",
      description: "Индивидуальный подход к каждому клиенту и его уникальным потребностям"
    },
    {
      icon: "CheckCircle",
      title: "Надежность",
      description: "Строгое соблюдение сроков исполнения и выполнение всех взятых на себя обязательств"
    },
    {
      icon: "Lightbulb",
      title: "Инновационность", 
      description: "Применение передовых технологий и современных подходов в юридической практике"
    }
  ];

  const stats = [
    { value: "15+", label: "Лет на рынке", icon: "Calendar" },
    { value: "500+", label: "Довольных клиентов", icon: "Users" },
    { value: "2000+", label: "Успешных дел", icon: "Trophy" },
    { value: "98%", label: "Побед в судах", icon: "Award" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero секция */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            О нашей компании
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Мы — команда профессиональных юристов с многолетним опытом работы.
            Наша миссия — обеспечить надежную правовую защиту для бизнеса и частных лиц
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={openModal}
          >
            <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
            Получить консультацию
          </Button>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon as any} className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* История компании */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">История развития</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {achievement.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наши ценности */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={value.icon as any} className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-semibold">{member.position}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Опыт:</h4>
                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Образование:</h4>
                    <p className="text-sm text-muted-foreground">{member.education}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Специализация:</h4>
                    <p className="text-sm text-muted-foreground">{member.specialization}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Достижения:</h4>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <Icon name="Star" className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Сертификаты и членство */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Аккредитации и членство</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Icon name="Award" className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Адвокатская палата</h3>
                <p className="text-sm text-muted-foreground">
                  Все партнеры — члены Адвокатской палаты Новосибирской области
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Icon name="Certificate" className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Ассоциация юристов России</h3>
                <p className="text-sm text-muted-foreground">
                  Активные участники профессионального юридического сообщества
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Icon name="Globe" className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Международная практика</h3>
                <p className="text-sm text-muted-foreground">
                  Опыт работы с международными правовыми вопросами и арбитражем
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы стать нашими клиентами?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Получите профессиональную юридическую помощь от экспертов 
            с многолетним опытом и безупречной репутацией
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={openModal}
            >
              <Icon name="MessageCircle" className="h-5 w-5 mr-2" />
              Получить консультацию
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Icon name="FileText" className="h-5 w-5 mr-2" />
              Наши кейсы
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;