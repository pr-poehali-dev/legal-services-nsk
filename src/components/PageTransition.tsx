import { useEffect } from 'react';

const PageTransition = () => {
  useEffect(() => {
    // Fade in при загрузке страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    
    // Небольшая задержка для плавности
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });

    return () => {
      document.body.style.opacity = '1';
      document.body.style.transition = '';
    };
  }, []);

  return null;
};

export default PageTransition;
