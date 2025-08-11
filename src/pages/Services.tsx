import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useModal } from "@/hooks/useModal";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { openModal } = useModal();

  const categories = [
    { id: "all", name: "Все услуги", icon: "Grid3X3" },
    { id: "corporate", name: "Корпоративное право", icon: "Building2" },
    { id: "civil", name: "Гражданское право", icon: "FileText" },
    { id: "family", name: "Семейное право", icon: "Heart" },
    { id: "criminal", name: "Уголовное право", icon: "Shield" },
    { id: "real-estate", name: "Недвижимость", icon: "Home" }
  ];

  const services = [
    {
      id: 1,
      category: "corporate",
      title: "Регистрация ООО",
      description: "Полное сопровождение регистрации общества с ограниченной ответственностью под ключ",
      price: "от 15 000",
      duration: "3-5 дней",
      popular: true,
      features: [
        "Подготовка всех документов",
        "Подача в налоговую службу",
        "Изготовление печати",
        "Открытие расчетного счета"
      ]
    },
    {
      id: 2,
      category: "corporate",
      title: "Ликвидация организации",
      description: "Официальное закрытие юридического лица с минимальными рисками и максимальной скоростью",
      price: "от 35 000",
      duration: "2-4 месяца",
      features: [
        "Подготовка ликвидационных документов",
        "Публикация в журнале",
        "Сдача отчетности в налоговую",
        "Закрытие всех счетов"
      ]
    },
    {
      id: 3,
      category: "corporate",
      title: "Корпоративные споры",
      description: "Защита интересов в корпоративных конфликтах и спорах между участниками",
      price: "от 50 000",
      duration: "3-12 месяцев",
      features: [
        "Анализ корпоративной структуры",
        "Подготовка процессуальных документов",
        "Представительство в судах",
        "Исполнение судебных решений"
      ]
    },
    {
      id: 4,
      category: "civil",
      title: "Договорное право",
      description: "Составление, экспертиза и сопровождение исполнения гражданско-правовых договоров",
      price: "от 8 000",
      duration: "1-3 дня",
      popular: true,
      features: [
        "Анализ рисков и условий",
        "Составление договора",
        "Правовая экспертиза",
        "Консультации по исполнению"
      ]
    },
    {
      id: 5,
      category: "civil",
      title: "Взыскание долгов",
      description: "Эффективное взыскание задолженности через досудебное и судебное урегулирование",
      price: "от 20 000",
      duration: "1-6 месяцев",
      features: [
        "Досудебная работа с должником",
        "Подготовка исковых заявлений",
        "Представительство в суде",
        "Исполнительное производство"
      ]
    },
    {
      id: 6,
      category: "family",
      title: "Расторжение брака",
      description: "Юридическое сопровождение бракоразводного процесса с защитой ваших интересов",
      price: "от 12 000",
      duration: "1-3 месяца",
      features: [
        "Подготовка документов для суда",
        "Защита имущественных интересов",
        "Определение места жительства детей",
        "Взыскание алиментов"
      ]
    },
    {
      id: 7,
      category: "family",
      title: "Раздел имущества",
      description: "Справедливый раздел совместно нажитого в браке имущества супругов",
      price: "от 25 000",
      duration: "2-6 месяцев",
      features: [
        "Оценка совместного имущества",
        "Составление соглашения о разделе",
        "Судебное разбирательство",
        "Регистрация прав собственности"
      ]
    },
    {
      id: 8,
      category: "criminal",
      title: "Защита по уголовным делам",
      description: "Профессиональная защита прав и интересов в уголовном процессе",
      price: "от 40 000",
      duration: "6-18 месяцев",
      features: [
        "Участие в следственных действиях",
        "Защита на предварительном следствии",
        "Представительство в суде",
        "Обжалование приговоров"
      ]
    },
    {
      id: 9,
      category: "criminal",
      title: "Обжалование приговоров",
      description: "Подача апелляционных и кассационных жалоб на судебные решения",
      price: "от 30 000",
      duration: "3-9 месяцев",
      features: [
        "Анализ судебного решения",
        "Подготовка жалобы",
        "Участие в судебных заседаниях",
        "Контроль исполнения решения"
      ]
    },
    {
      id: 10,
      category: "real-estate",
      title: "Сделки с недвижимостью",
      description: "Полное юридическое сопровождение сделок купли-продажи недвижимости",
      price: "от 18 000",
      duration: "2-4 недели",
      popular: true,
      features: [
        "Проверка юридической чистоты",
        "Подготовка договоров",
        "Сопровождение в Росреестре",
        "Консультации по налогам"
      ]
    },
    {
      id: 11,
      category: "real-estate",
      title: "Жилищные споры",
      description: "Решение конфликтов в сфере жилищных правоотношений",
      price: "от 22 000",
      duration: "3-8 месяцев",
      features: [
        "Споры с управляющими компаниями",
        "Выселение и вселение",
        "Раздел жилого помещения",
        "Приватизация жилья"
      ]
    },
    {
      id: 12,
      category: "real-estate",
      title: "Оформление наследства",
      description: "Помощь в получении наследства и оформлении прав на имущество",
      price: "от 15 000",
      duration: "6-12 месяцев",
      features: [
        "Подготовка документов для нотариуса",
        "Поиск наследственного имущества",
        "Споры о наследстве",
        "Оформление прав собственности"
      ]
    }
  ];

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero секция */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Каталог юридических услуг
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Полный спектр правовых услуг с прозрачным ценообразованием
            и гарантией качества от профессиональных юристов
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

      {/* Фильтры по категориям */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon name={category.icon as any} className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* Сетка услуг */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="relative hover:shadow-lg transition-all duration-300 group">
                {service.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                    Популярная
                  </Badge>
                )}
                
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </span>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-primary">
                        {service.price} ₽
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {service.duration}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-foreground">В услугу входит:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <Icon name="Check" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={openModal}
                    >
                      <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                      Заказать
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Phone" className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Дополнительная информация */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Индивидуальный подход
              </h3>
              <p className="text-muted-foreground mb-6">
                Если вы не нашли нужную услугу в каталоге, мы готовы предложить 
                индивидуальное решение под ваши конкретные задачи и потребности.
              </p>
              <Button variant="outline" onClick={openModal}>
                <Icon name="MessageSquare" className="h-4 w-4 mr-2" />
                Обсудить задачу
              </Button>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Гарантии качества
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <Icon name="Shield" className="h-5 w-5 text-green-500 mr-3" />
                  Возврат средств при некачественном исполнении
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Icon name="Clock" className="h-5 w-5 text-blue-500 mr-3" />
                  Строгое соблюдение договорных сроков
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Icon name="FileCheck" className="h-5 w-5 text-purple-500 mr-3" />
                  Страхование профессиональной ответственности
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Нужна помощь в выборе услуги?
          </h3>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Наши эксперты помогут подобрать оптимальное решение для вашей ситуации
            и ответят на все вопросы совершенно бесплатно
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={openModal}
            >
              <Icon name="Phone" className="h-5 w-5 mr-2" />
              Бесплатная консультация
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Icon name="Download" className="h-5 w-5 mr-2" />
              Скачать прайс-лист
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;