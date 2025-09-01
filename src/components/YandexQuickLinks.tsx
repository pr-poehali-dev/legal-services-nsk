import { Helmet } from 'react-helmet-async';

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

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(quickLinksStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(sitelinkSearchBoxData)}
      </script>
      
      {/* Мета-теги для Яндекса */}
      <meta name="yandex-verification" content="юр-сервис-нск" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Дополнительные директивы для поисковиков */}
      <link rel="canonical" href="https://юридический-сервис.рф/" />
      
      {/* Быстрые ссылки через link rel */}
      <link rel="alternate" href="https://юридический-сервис.рф/services#family" title="Семейные споры" />
      <link rel="alternate" href="https://юридический-сервис.рф/services#labor" title="Трудовые споры" />
      <link rel="alternate" href="https://юридический-сервис.рф/dtp-lawyer" title="Юрист по ДТП" />
      <link rel="alternate" href="https://юридический-сервис.рф/services#civil" title="Гражданские споры" />
      <link rel="alternate" href="https://юридический-сервис.рф/services#realestate" title="Недвижимость" />
      <link rel="alternate" href="https://юридический-сервис.рф/services#criminal" title="Уголовная защита" />
    </Helmet>
  );
};

export default YandexQuickLinks;