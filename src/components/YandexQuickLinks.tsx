import { useEffect } from 'react';

const YandexQuickLinks = () => {
  const quickLinksStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Юридические услуги ЮрСервис НСК",
    "description": "Основные направления юридических услуг",
    "url": "https://юридический-сервис.рф",
    "numberOfItems": 6,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Семейные споры",
        "description": "Развод, алименты, раздел имущества",
        "url": "https://юридический-сервис.рф/services#family",
        "image": "https://юридический-сервис.рф/images/family-law.jpg"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Трудовые споры",
        "description": "Увольнение, заработная плата, трудовые права",
        "url": "https://юридический-сервис.рф/services#labor",
        "image": "https://юридический-сервис.рф/images/labor-law.jpg"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "ДТП и страховые",
        "description": "ОСАГО, возмещение ущерба, восстановление после ДТП",
        "url": "https://юридический-сервис.рф/dtp-lawyer",
        "image": "https://юридический-сервис.рф/images/dtp-lawyer.jpg"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Гражданские споры",
        "description": "Договоры, взыскание долгов, защита прав",
        "url": "https://юридический-сервис.рф/services#civil",
        "image": "https://юридический-сервис.рф/images/civil-law.jpg"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Недвижимость",
        "description": "Покупка, продажа, оформление права собственности",
        "url": "https://юридический-сервис.рф/services#realestate",
        "image": "https://юридический-сервис.рф/images/real-estate.jpg"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Уголовная защита",
        "description": "Защита в суде, консультации по уголовным делам",
        "url": "https://юридический-сервис.рф/services#criminal",
        "image": "https://юридический-сервис.рф/images/criminal-law.jpg"
      }
    ]
  };

  const sitelinkSearchBoxData = {
    "@context": "https://schema.org",
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://юридический-сервис.рф/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  };

  useEffect(() => {
    // Добавляем структурированные данные
    const quickLinksScript = document.createElement('script');
    quickLinksScript.type = 'application/ld+json';
    quickLinksScript.text = JSON.stringify(quickLinksStructuredData);
    document.head.appendChild(quickLinksScript);

    const searchScript = document.createElement('script');
    searchScript.type = 'application/ld+json';
    searchScript.text = JSON.stringify(sitelinkSearchBoxData);
    document.head.appendChild(searchScript);

    // Добавляем мета-теги
    const yandexMeta = document.createElement('meta');
    yandexMeta.name = 'yandex-verification';
    yandexMeta.content = 'юр-сервис-нск';
    document.head.appendChild(yandexMeta);

    const robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    robotsMeta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    document.head.appendChild(robotsMeta);

    // Добавляем канонический тэг
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://юридический-сервис.рф/';
    document.head.appendChild(canonicalLink);

    // Добавляем быстрые ссылки
    const quickLinks = [
      { href: 'https://юридический-сервис.рф/services#family', title: 'Семейные споры' },
      { href: 'https://юридический-сервис.рф/services#labor', title: 'Трудовые споры' },
      { href: 'https://юридический-сервис.рф/dtp-lawyer', title: 'Юрист по ДТП' },
      { href: 'https://юридический-сервис.рф/services#civil', title: 'Гражданские споры' },
      { href: 'https://юридический-сервис.рф/services#realestate', title: 'Недвижимость' },
      { href: 'https://юридический-сервис.рф/services#criminal', title: 'Уголовная защита' }
    ];

    const linkElements: HTMLLinkElement[] = [];
    quickLinks.forEach(link => {
      const linkEl = document.createElement('link');
      linkEl.rel = 'alternate';
      linkEl.href = link.href;
      linkEl.title = link.title;
      document.head.appendChild(linkEl);
      linkElements.push(linkEl);
    });

    // Очистка при размонтировании компонента
    return () => {
      document.head.removeChild(quickLinksScript);
      document.head.removeChild(searchScript);
      document.head.removeChild(yandexMeta);
      document.head.removeChild(robotsMeta);
      document.head.removeChild(canonicalLink);
      linkElements.forEach(linkEl => {
        if (document.head.contains(linkEl)) {
          document.head.removeChild(linkEl);
        }
      });
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(quickLinksStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sitelinkSearchBoxData)
        }}
      />
    </>
  );
};

export default YandexQuickLinks;