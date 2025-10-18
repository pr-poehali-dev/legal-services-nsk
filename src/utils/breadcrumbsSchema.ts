export interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: BreadcrumbItem[];
}

export const getBreadcrumbsSchema = (pathname: string, hash?: string): BreadcrumbSchema => {
  const baseUrl = 'https://юридический-сервис.рф';
  
  const breadcrumbs: BreadcrumbItem[] = [
    {
      position: 1,
      name: 'Главная',
      item: baseUrl
    }
  ];

  const pathMap: Record<string, { name: string; position: number }> = {
    '/services': { name: 'Услуги', position: 2 },
    '/pricing': { name: 'Цены', position: 2 },
    '/blog': { name: 'Блог', position: 2 },
    '/dtp-lawyer': { name: 'Автоюрист', position: 2 },
    '/about': { name: 'О компании', position: 2 },
    '/contacts': { name: 'Контакты', position: 2 },
    '/privacy': { name: 'Политика конфиденциальности', position: 2 }
  };

  if (pathMap[pathname]) {
    breadcrumbs.push({
      ...pathMap[pathname],
      item: `${baseUrl}${pathname}`
    });
  }

  if (pathname === '/services' && hash) {
    const serviceNames: Record<string, string> = {
      'semejnoe-pravo': 'Семейное право',
      'nasledstvo': 'Наследство',
      'zhilishhnye-spory': 'Жилищные споры',
      'arbitrazh': 'Арбитражные споры',
      'bankrotstvo': 'Банкротство',
      'trudovye-spory': 'Трудовые споры',
      'avto-yurist': 'Автоюрист',
      'zemelnye-spory': 'Земельные споры',
      'medicinskie-spory': 'Медицинские споры',
      'kreditnye-spory': 'Кредитные споры',
      'nedvizhimost': 'Недвижимость',
      'biznes': 'Юридическое обслуживание бизнеса'
    };

    if (serviceNames[hash]) {
      breadcrumbs.push({
        position: 3,
        name: serviceNames[hash],
        item: `${baseUrl}/services#${hash}`
      });
    }
  }

  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    breadcrumbs.push({
      position: 3,
      name: 'Статья',
      item: `${baseUrl}${pathname}`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs
  };
};
