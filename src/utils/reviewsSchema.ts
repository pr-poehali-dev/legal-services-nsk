export interface ReviewSchema {
  '@context': string;
  '@type': string;
  itemReviewed: {
    '@type': string;
    name: string;
  };
  reviewRating: {
    '@type': string;
    ratingValue: string;
    bestRating: string;
  };
  author: {
    '@type': string;
    name: string;
  };
  reviewBody: string;
  datePublished: string;
}

export const getReviewsSchema = (): ReviewSchema[] => [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LegalService',
      name: 'Юридический сервис'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: 'Мария Петрова'
    },
    reviewBody: 'Отличная помощь при разводе! Все сделали быстро и профессионально. Спасибо огромное за поддержку в трудный период.',
    datePublished: '2025-10-15'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LegalService',
      name: 'Юридический сервис'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: 'Иван Смирнов'
    },
    reviewBody: 'Помогли выиграть спор со страховой после ДТП. Получил возмещение в полном объеме. Рекомендую!',
    datePublished: '2025-10-12'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LegalService',
      name: 'Юридический сервис'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: 'Елена Козлова'
    },
    reviewBody: 'Грамотная консультация по наследственным делам. Все объяснили понятно, помогли с документами.',
    datePublished: '2025-10-08'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LegalService',
      name: 'Юридический сервис'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: 'Дмитрий Волков'
    },
    reviewBody: 'Восстановили на работе после незаконного увольнения. Профессионалы своего дела!',
    datePublished: '2025-10-05'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LegalService',
      name: 'Юридический сервис'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: 'Анна Соколова'
    },
    reviewBody: 'Качественная помощь при оформлении банкротства. Списали все долги, очень благодарна!',
    datePublished: '2025-10-01'
  }
];
