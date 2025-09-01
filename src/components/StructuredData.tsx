const StructuredData = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "ЮрСервис НСК",
    alternateName: "Юридическая компания ЮрСервис НСК",
    description:
      "Профессиональные юридические услуги в Новосибирске: семейное право, трудовые споры, ДТП, недвижимость, гражданские и уголовные дела. Бесплатная консультация.",
    url: "https://юридический-сервис.рф",
    logo: "https://юридический-сервис.рф/logo.png",
    image: "https://юридический-сервис.рф/og-image.jpg",
    telephone: "+7 (993) 190-35-00",
    email: "info@юридический-сервис.рф",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Ленина, 1",
      addressLocality: "Новосибирск",
      addressRegion: "Новосибирская область",
      postalCode: "630000",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "55.0084",
      longitude: "82.9357",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "₽₽",
    areaServed: {
      "@type": "City",
      name: "Новосибирск",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "55.0084",
        longitude: "82.9357",
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Юридические услуги",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Семейные споры",
            description: "Развод, алименты, раздел имущества",
          },
          url: "https://юридический-сервис.рф/services#family",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Трудовые споры",
            description: "Увольнение, заработная плата, трудовые права",
          },
          url: "https://юридический-сервис.рф/services#labor",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ДТП и страховые споры",
            description: "ОСАГО, возмещение ущерба, восстановление после ДТП",
          },
          url: "https://юридический-сервис.рф/dtp-lawyer",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Гражданские споры",
            description: "Договоры, взыскание долгов, защита прав",
          },
          url: "https://юридический-сервис.рф/services#civil",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Недвижимость",
            description: "Покупка, продажа, оформление права собственности",
          },
          url: "https://юридический-сервис.рф/services#realestate",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Уголовные дела",
            description: "Защита в суде, консультации по уголовным делам",
          },
          url: "https://юридический-сервис.рф/services#criminal",
        },
      ],
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+7 (993) 190-35-00",
        contactType: "customer service",
        availableLanguage: "Russian",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    sameAs: [
      "https://vk.com/urservice_nsk",
      "https://t.me/urservice_nsk",
      "https://wa.me/79931903500",
    ],
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ЮрСервис НСК",
    url: "https://юридический-сервис.рф",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://юридический-сервис.рф/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@id": "https://юридический-сервис.рф/#organization",
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://юридический-сервис.рф",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Услуги",
        item: "https://юридический-сервис.рф/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Юрист по ДТП",
        item: "https://юридический-сервис.рф/dtp-lawyer",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Блог",
        item: "https://юридический-сервис.рф/blog",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Контакты",
        item: "https://юридический-сервис.рф/contacts",
      },
    ],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Сколько стоит консультация юриста?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Первичная консультация предоставляется бесплатно. Стоимость дальнейших услуг зависит от сложности дела и обсуждается индивидуально.",
        },
      },
      {
        "@type": "Question",
        name: "Как быстро можно получить помощь?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Мы работаем круглосуточно. Экстренная консультация предоставляется в течение 15 минут после обращения.",
        },
      },
      {
        "@type": "Question",
        name: "В каких районах Новосибирска вы работаете?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Мы оказываем юридические услуги по всему Новосибирску и Новосибирской области, включая выездные консультации.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
    </>
  );
};

export default StructuredData;
