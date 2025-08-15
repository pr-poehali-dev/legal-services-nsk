import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  image?: string;
  videoUrl?: string;
  isPublished: boolean;
  views: number;
  readTime: number;
}

interface BlogContextType {
  posts: BlogPost[];
  categories: string[];
  addPost: (post: Omit<BlogPost, 'id' | 'views'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
  incrementViews: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

  // Дефолтные статьи
  const defaultPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Как правильно составить договор купли-продажи недвижимости',
      content: `# Как правильно составить договор купли-продажи недвижимости

При покупке или продаже недвижимости одним из ключевых документов является договор купли-продажи. От того, насколько грамотно он составлен, зависит безопасность сделки и защита ваших интересов.

## Основные элементы договора

### 1. Стороны договора
В договоре должны быть четко указаны:
- Полные ФИО продавца и покупателя
- Паспортные данные
- Адреса регистрации
- Контактная информация

### 2. Предмет договора
Подробное описание недвижимости:
- Точный адрес объекта
- Кадастровый номер
- Площадь (общая, жилая, кухни)
- Этаж, количество комнат
- Технические характеристики

### 3. Цена и порядок расчетов
- Полная стоимость объекта
- Способ и сроки оплаты
- Условия передачи денежных средств
- Ответственность за просрочку платежа

## Важные моменты

**Проверка документов**
Перед подписанием договора обязательно проверьте:
- Правоустанавливающие документы
- Выписку из ЕГРН
- Согласие супруга(и) на продажу
- Справки об отсутствии задолженностей

**Обременения**
Убедитесь, что объект не находится:
- В залоге у банка
- Под арестом
- В споре
- Не сдан в аренду на длительный срок

## Рекомендации

1. **Привлеките юриста** для проверки договора
2. **Используйте банковскую ячейку** для расчетов
3. **Застрахуйте сделку** от рисков
4. **Проверьте историю объекта** за последние 3 года

Правильно составленный договор купли-продажи - это залог безопасной и успешной сделки с недвижимостью.`,
      excerpt: 'Пошаговое руководство по составлению договора купли-продажи недвижимости. Основные элементы, важные моменты и рекомендации экспертов.',
      author: 'Иванов Алексей Петрович',
      publishDate: '2024-08-10',
      category: 'Недвижимость',
      tags: ['договор', 'недвижимость', 'купля-продажа', 'документы'],
      image: '/api/placeholder/600/400',
      isPublished: true,
      views: 1247,
      readTime: 5
    },
    {
      id: '2',
      title: 'Банкротство физических лиц: пошаговая инструкция',
      content: `# Банкротство физических лиц: пошаговая инструкция

Процедура банкротства физических лиц позволяет гражданам законно избавиться от непосильных долгов. Рассмотрим, как правильно пройти эту процедуру.

## Основания для банкротства

Банкротом может быть признан гражданин, который:
- Не может исполнить денежные обязательства
- Сумма долгов превышает 500 000 рублей
- Просрочка составляет более 3 месяцев

## Этапы процедуры

### 1. Подготовка документов
- Справки о доходах за 3 года
- Сведения об имуществе
- Список кредиторов
- Справки о сделках за 3 года

### 2. Подача заявления в суд
- Составление заявления о банкротстве
- Оплата госпошлины (300 рублей)
- Депозит на вознаграждение управляющего (25 000 рублей)

### 3. Судебное рассмотрение
- Рассмотрение заявления (30 дней)
- Принятие решения о введении процедуры
- Назначение финансового управляющего

## Последствия банкротства

**Положительные:**
- Списание долгов
- Прекращение начисления процентов
- Защита от коллекторов

**Отрицательные:**
- Ограничения на получение кредитов (5 лет)
- Запрет на регистрацию ИП (5 лет)
- Продажа имущества

## Стоимость процедуры

- Госпошлина: 300 рублей
- Депозит управляющего: 25 000 рублей
- Услуги юриста: от 50 000 рублей
- Дополнительные расходы: 10-30 000 рублей

Банкротство - это крайняя мера, но иногда единственный способ начать финансовую жизнь с чистого листа.`,
      excerpt: 'Подробное руководство по процедуре банкротства физических лиц. Основания, этапы, документы и последствия.',
      author: 'Петрова Мария Сергеевна',
      publishDate: '2024-08-08',
      category: 'Банкротство',
      tags: ['банкротство', 'долги', 'физлица', 'процедура'],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isPublished: true,
      views: 892,
      readTime: 7
    },
    {
      id: '3',
      title: 'Трудовые споры: как защитить свои права',
      content: `# Трудовые споры: как защитить свои права

Нарушение трудовых прав - распространенная проблема. Рассмотрим основные виды трудовых споров и способы их решения.

## Виды трудовых споров

### 1. Споры о заработной плате
- Невыплата зарплаты
- Задержка выплат
- Неправильный расчет

### 2. Споры об увольнении
- Незаконное увольнение
- Нарушение процедуры
- Отсутствие оснований

### 3. Споры о рабочем времени
- Сверхурочная работа
- Нарушение графика
- Неоплачиваемые переработки

## Способы защиты

**1. Досудебное урегулирование**
- Обращение к работодателю
- Жалоба в трудовую инспекцию
- Обращение в профсоюз

**2. Судебная защита**
- Подача иска в суд
- Взыскание задолженности
- Восстановление на работе

## Сроки обращения

- По зарплате: 1 год
- По увольнению: 1 месяц
- По другим спорам: 3 месяца

Важно не затягивать с обращением за защитой своих прав.`,
      excerpt: 'Как защитить свои трудовые права. Виды споров, способы защиты и сроки обращения.',
      author: 'Сидоров Дмитрий Викторович',
      publishDate: '2024-08-05',
      category: 'Трудовое право',
      tags: ['трудовые споры', 'права работников', 'увольнение', 'зарплата'],
      image: '/api/placeholder/600/400',
      isPublished: true,
      views: 634,
      readTime: 4
    }
  ];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const categories = ['Все категории', 'Недвижимость', 'Банкротство', 'Трудовое право', 'Семейное право', 'Корпоративное право', 'Уголовное право'];

  // Инициализация постов при первой загрузке
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Ошибка при загрузке постов из localStorage:', error);
        setPosts(defaultPosts);
        localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
      }
    } else {
      // Если в localStorage нет постов, используем дефолтные
      setPosts(defaultPosts);
      localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
    setIsInitialized(true);
  }, []);

  // Сохраняем посты в localStorage только после инициализации
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
  }, [posts, isInitialized]);

  const addPost = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      views: 0
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, postData: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...postData } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.isPublished);
  };

  const incrementViews = (id: string) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, views: post.views + 1 } : post
    ));
  };

  const value = {
    posts,
    categories,
    addPost,
    updatePost,
    deletePost,
    getPost,
    getPublishedPosts,
    incrementViews
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};