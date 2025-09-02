const StructuredData = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "ЮрСервис НСК",
    "alternateName": "Юридическая компания ЮрСервис НСК",
    "description": "Профессиональные юридические услуги в Новосибирске: семейное право, наследство, жилищные споры, земельные дела, арбитраж, банкротство, трудовые споры, автоюрист, медицинские и кредитные споры. Цены от 1 рубля. Бесплатная консультация.",
    "url": "https://юридический-сервис.рф",
    "logo": "https://юридический-сервис.рф/logo.png",
    "image": "https://юридический-сервис.рф/og-image.jpg",
    "telephone": "+7 (999) 452-35-00",
    "email": "info@юридический-сервис.рф",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Ленина, 1",
      "addressLocality": "Новосибирск",
      "addressRegion": "Новосибирская область",
      "postalCode": "630000",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.0084",
      "longitude": "82.9357"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "priceRange": "₽₽",
    "areaServed": {
      "@type": "City",
      "name": "Новосибирск"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "55.0084",
        "longitude": "82.9357"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Юридические услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Общие юридические услуги",
            "description": "Консультации, составление документов, судебная защита",
            "priceRange": "1-12000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#general"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Семейное право",
            "description": "Развод, алименты, раздел имущества, опека",
            "priceRange": "4000-15000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#family"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Наследственные дела",
            "description": "Оформление наследства, завещания, споры",
            "priceRange": "800-25000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#inheritance"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Автоюристы",
            "description": "ДТП, ОСАГО, КАСКО, возврат прав",
            "priceRange": "1500-50000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#auto"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Жилищные вопросы",
            "description": "Сделки с недвижимостью, споры, выселение",
            "priceRange": "2500-12500 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#housing"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Земельные дела",
            "description": "Право собственности на землю, споры, межевание",
            "priceRange": "8000-25000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#land"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Трудовые споры",
            "description": "Увольнение, зарплата, восстановление на работе",
            "priceRange": "8000-30000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#labor"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Банкротство",
            "description": "Процедура банкротства, реструктуризация долгов",
            "priceRange": "2000-8000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#bankruptcy"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Арбитражные споры",
            "description": "Корпоративные споры, налоговые дела",
            "priceRange": "25000-100000 RUB"
          },
          "url": "https://юридический-сервис.рф/pricing#arbitration"
        }
      ]
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+7 (999) 452-35-00",
        "contactType": "customer service",
        "availableLanguage": "Russian",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ],
    "sameAs": [
      "https://vk.com/urservice_nsk",
      "https://t.me/urservice_nsk",
      "https://wa.me/79994523500"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ЮрСервис НСК",
    "url": "https://юридический-сервис.рф",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://юридический-сервис.рф/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@id": "https://юридический-сервис.рф/#organization"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://юридический-сервис.рф"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Услуги",
        "item": "https://юридический-сервис.рф/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Юрист по ДТП",
        "item": "https://юридический-сервис.рф/dtp-lawyer"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Блог",
        "item": "https://юридический-сервис.рф/blog"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Контакты",
        "item": "https://юридический-сервис.рф/contacts"
      }
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Сколько стоит консультация юриста?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Устная консультация от 1 рубля, письменная консультация от 2800 рублей. Первичная консультация по телефону бесплатно. Подробные цены на все услуги смотрите на странице тарифов."
        }
      },
      {
        "@type": "Question",
        "name": "Как быстро можно получить помощь?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мы работаем круглосуточно. Экстренная консультация предоставляется в течение 15 минут после обращения."
        }
      },
      {
        "@type": "Question",
        "name": "В каких районах Новосибирска вы работаете?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мы оказываем юридические услуги по всему Новосибирску и Новосибирской области, включая выездные консультации."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData)
        }}
      />
    </>
  );
};

export default StructuredData;