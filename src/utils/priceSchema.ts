export interface PriceItem {
  '@type': string;
  name: string;
  description: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    priceValidUntil: string;
    availability: string;
    url: string;
  };
}

export const getPriceSchema = (): PriceItem[] => {
  const validUntil = '2026-12-31';
  const baseUrl = 'https://юридический-сервис.рф';
  
  return [
    {
      '@type': 'Product',
      name: 'Консультация юриста',
      description: 'Устная консультация юриста по любым вопросам',
      offers: {
        '@type': 'Offer',
        price: '1',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/pricing#general`
      }
    },
    {
      '@type': 'Product',
      name: 'Помощь в разводе',
      description: 'Юридическое сопровождение развода через суд',
      offers: {
        '@type': 'Offer',
        price: '15000',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/pricing#family`
      }
    },
    {
      '@type': 'Product',
      name: 'Оформление наследства',
      description: 'Полное юридическое сопровождение наследственных дел',
      offers: {
        '@type': 'Offer',
        price: '25000',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/pricing#inheritance`
      }
    },
    {
      '@type': 'Product',
      name: 'Автоюрист - помощь при ДТП',
      description: 'Представительство интересов в спорах со страховыми',
      offers: {
        '@type': 'Offer',
        price: '12000',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/dtp-lawyer`
      }
    },
    {
      '@type': 'Product',
      name: 'Банкротство физических лиц',
      description: 'Процедура банкротства под ключ',
      offers: {
        '@type': 'Offer',
        price: '50000',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/pricing#bankruptcy`
      }
    },
    {
      '@type': 'Product',
      name: 'Защита при увольнении',
      description: 'Юридическая помощь при трудовых спорах',
      offers: {
        '@type': 'Offer',
        price: '18000',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/pricing#labor`
      }
    },
    {
      '@type': 'Product',
      name: 'Арбитражные споры',
      description: 'Представительство в арбитражных судах',
      offers: {
        '@type': 'Offer',
        price: '35000',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/pricing#arbitration`
      }
    },
    {
      '@type': 'Product',
      name: 'Жилищные споры',
      description: 'Решение споров по недвижимости и ЖКХ',
      offers: {
        '@type': 'Offer',
        price: '20000',
        priceCurrency: 'RUB',
        priceValidUntil: validUntil,
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/pricing#housing`
      }
    }
  ];
};
