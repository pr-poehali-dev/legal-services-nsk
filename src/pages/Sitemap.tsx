import { useEffect } from 'react';

const SITEMAP_URL = 'https://functions.poehali.dev/15af1070-d00f-4764-b2b5-2e9de9345be2';

const Sitemap = () => {
  useEffect(() => {
    window.location.href = SITEMAP_URL;
  }, []);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Перенаправление на sitemap.xml...</p>
      </div>
    </div>
  );
};

export default Sitemap;