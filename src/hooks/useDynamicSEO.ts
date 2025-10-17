import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOConfig } from '@/utils/seoConfig';

export const useDynamicSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    
    if (hash && location.pathname === '/services') {
      const seo = getSEOConfig(hash);
      
      document.title = seo.title;
      
      const updateMeta = (name: string, content: string) => {
        const meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (meta) {
          meta.content = content;
        }
      };

      const updateProperty = (property: string, content: string) => {
        const meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (meta) {
          meta.content = content;
        }
      };

      updateMeta('description', seo.description);
      updateMeta('keywords', seo.keywords);
      updateProperty('og:title', seo.title);
      updateProperty('og:description', seo.description);
      updateProperty('og:url', seo.canonical);
    }
  }, [location]);
};
