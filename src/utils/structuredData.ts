export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    aggregateRating?: {
      '@type': string;
      ratingValue: string;
      reviewCount: string;
    };
    address?: {
      '@type': string;
      addressLocality: string;
      addressCountry: string;
    };
  };
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
  areaServed?: string;
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressCountry: string;
  };
  aggregateRating: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
  priceRange: string;
}

export const getOrganizationSchema = (): OrganizationSchema => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Юридический сервис',
  description: 'Профессиональная юридическая помощь в Москве и онлайн',
  url: 'https://юридический-сервис.рф',
  logo: 'https://юридический-сервис.рф/logo.png',
  telephone: '+7 (495) 123-45-67',
  email: 'info@юридический-сервис.рф',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Москва',
    addressCountry: 'RU'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '247'
  },
  priceRange: '₽₽'
});

export const getServiceSchema = (serviceType: string): ServiceSchema | null => {
  const baseProvider = {
    '@type': 'LegalService' as const,
    name: 'Юридический сервис',
    aggregateRating: {
      '@type': 'AggregateRating' as const,
      ratingValue: '4.9',
      reviewCount: '247'
    },
    address: {
      '@type': 'PostalAddress' as const,
      addressLocality: 'Москва',
      addressCountry: 'RU'
    }
  };

  const schemas: Record<string, ServiceSchema> = {
    'semejnoe-pravo': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Услуги по семейному праву',
      description: 'Развод, раздел имущества, алименты, лишение родительских прав',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '15000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'nasledstvo': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Ведение наследственных дел',
      description: 'Оформление наследства, споры между наследниками, восстановление сроков',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '25000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'zhilishhnye-spory': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Жилищные споры',
      description: 'Выселение, приватизация, перепланировка, споры с ЖКХ',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '20000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'arbitrazh': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Арбитражные споры',
      description: 'Представительство в арбитражных судах, взыскание задолженности',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '35000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Вся Россия'
    },
    'bankrotstvo': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Банкротство физических лиц',
      description: 'Списание долгов через процедуру банкротства',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '50000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Вся Россия'
    },
    'trudovye-spory': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Трудовые споры',
      description: 'Незаконное увольнение, невыплата зарплаты, защита прав работников',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '18000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'avto-yurist': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Автоюрист - помощь при ДТП',
      description: 'Оформление ДТП, споры со страховыми, возмещение ущерба',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '12000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'zemelnye-spory': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Земельные споры',
      description: 'Споры о границах, кадастровые работы, изъятие земли',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '22000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'medicinskie-spory': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Медицинские споры',
      description: 'Врачебные ошибки, некачественное лечение, возмещение вреда здоровью',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '30000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'kreditnye-spory': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Кредитные споры',
      description: 'Споры с банками, реструктуризация долгов, защита от коллекторов',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '16000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Вся Россия'
    },
    'nedvizhimost': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Споры по недвижимости',
      description: 'Купля-продажа, оспаривание сделок, признание права собственности',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '28000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Москва и МО'
    },
    'biznes': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Юридическое обслуживание бизнеса',
      description: 'Абонентское обслуживание, договоры, корпоративные споры',
      provider: baseProvider,
      offers: {
        '@type': 'Offer',
        price: '45000',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      },
      areaServed: 'Вся Россия'
    }
  };

  return schemas[serviceType] || null;
};
