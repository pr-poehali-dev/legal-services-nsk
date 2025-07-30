interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  url: string;
  source: 'garant.ru' | 'manual';
}

class NewsUpdater {
  private storageKey = 'legal_news';

  // Для демонстрации - примеры новостей с Гарант.ру
  private sampleNews: NewsItem[] = [
    {
      id: '1',
      title: 'Изменения в трудовом законодательстве с 2025 года',
      summary: 'Вступили в силу новые правила оформления трудовых договоров и регулирования удаленной работы.',
      date: '2025-01-15',
      url: 'https://www.garant.ru/news/labor-law-2025/',
      source: 'garant.ru'
    },
    {
      id: '2', 
      title: 'Налоговые льготы для малого бизнеса',
      summary: 'Правительство расширило перечень налоговых льгот для субъектов малого предпринимательства.',
      date: '2025-01-10',
      url: 'https://www.garant.ru/news/tax-benefits-2025/',
      source: 'garant.ru'
    },
    {
      id: '3',
      title: 'Новые требования к защите персональных данных',
      summary: 'Роскомнадзор ужесточил требования к обработке и хранению персональных данных граждан.',
      date: '2025-01-05',
      url: 'https://www.garant.ru/news/personal-data-2025/',
      source: 'garant.ru'
    }
  ];

  getNews(limit?: number): NewsItem[] {
    const stored = localStorage.getItem(this.storageKey);
    let news = stored ? JSON.parse(stored) : this.sampleNews;
    
    // Сортируем по дате (новые сначала)
    news.sort((a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return limit ? news.slice(0, limit) : news;
  }

  addNews(newsItem: Omit<NewsItem, 'id'>): string {
    const news = this.getNews();
    const newItem: NewsItem = {
      id: Date.now().toString(),
      ...newsItem
    };
    
    news.unshift(newItem);
    localStorage.setItem(this.storageKey, JSON.stringify(news));
    
    return newItem.id;
  }

  // Метод для будущей автоматизации
  async updateFromGarant(): Promise<void> {
    // TODO: В будущем здесь будет API запрос к серверу
    // который будет парсить garant.ru и обновлять новости
    console.log('Автообновление новостей будет доступно после добавления серверной части');
    
    // Пока добавляем тестовую новость
    const today = new Date().toISOString().split('T')[0];
    this.addNews({
      title: `Обновление от ${today}`,
      summary: 'Последние изменения в законодательстве. Полная автоматизация будет добавлена в следующей версии.',
      date: today,
      url: 'https://www.garant.ru/news/',
      source: 'garant.ru'
    });
  }

  // Очистка старых новостей (старше 30 дней)
  cleanOldNews(): void {
    const news = this.getNews();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const filteredNews = news.filter(item => 
      new Date(item.date) > thirtyDaysAgo
    );
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredNews));
  }
}

export const newsUpdater = new NewsUpdater();
export type { NewsItem };