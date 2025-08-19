import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Хук для правильной обработки 404 ошибок
 * Устанавливает соответствующие мета-теги и заголовки
 */
export const use404Handler = (is404: boolean = false) => {
  const location = useLocation();

  useEffect(() => {
    if (is404) {
      // Устанавливаем правильный заголовок страницы
      const originalTitle = document.title;
      document.title = "404 - Страница не найдена | ЮрСервис НСК";
      
      // Добавляем мета-тег для роботов
      const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', 'noindex, nofollow');
      if (!document.querySelector('meta[name="robots"]')) {
        document.head.appendChild(metaRobots);
      }
      
      // Устанавливаем канонический URL
      const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', `https://юридический-сервис.рф${location.pathname}`);
      if (!document.querySelector('link[rel="canonical"]')) {
        document.head.appendChild(canonicalLink);
      }
      
      // Добавляем structured data для 404 страницы
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "404 - Страница не найдена",
        "description": "Запрашиваемая страница не найдена на сайте ЮрСервис НСК",
        "url": `https://юридический-сервис.рф${location.pathname}`,
        "isPartOf": {
          "@type": "WebSite",
          "name": "ЮрСервис НСК",
          "url": "https://юридический-сервис.рф"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://юридический-сервис.рф/?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
      
      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
      
      // Логируем 404 для аналитики
      console.error(`404 Error: Page not found - ${location.pathname}`);
      
      // Отправляем событие в аналитику если доступно
      if (typeof window !== 'undefined') {
        // Google Analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'page_not_found', {
            page_path: location.pathname,
            page_title: '404 - Страница не найдена'
          });
        }
        
        // Яндекс.Метрика
        if ((window as any).ym) {
          (window as any).ym(0, 'reachGoal', '404_error', {
            page: location.pathname
          });
        }
      }
      
      // Очистка при размонтировании компонента
      return () => {
        document.title = originalTitle;
        
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta && robotsMeta.getAttribute('content') === 'noindex, nofollow') {
          robotsMeta.remove();
        }
        
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.remove();
        }
        
        const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
        if (structuredDataScript && structuredDataScript.textContent?.includes('"404 - Страница не найдена"')) {
          structuredDataScript.remove();
        }
      };
    }
  }, [is404, location.pathname]);
};

/**
 * Хук для отслеживания битых ссылок
 */
export const useBrokenLinkTracker = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (target.tagName === 'A') {
        const link = target as HTMLAnchorElement;
        const href = link.href;
        
        // Проверяем только внутренние ссылки
        if (href && href.startsWith(window.location.origin)) {
          // Добавляем обработчик для проверки ответа
          fetch(href, { method: 'HEAD' })
            .then(response => {
              if (response.status === 404) {
                console.warn(`Broken internal link found: ${href}`);
                
                // Отправляем в аналитику
                if ((window as any).gtag) {
                  (window as any).gtag('event', 'broken_link_click', {
                    link_url: href,
                    source_page: window.location.pathname
                  });
                }
              }
            })
            .catch(error => {
              console.warn(`Error checking link: ${href}`, error);
            });
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

export default { use404Handler, useBrokenLinkTracker };