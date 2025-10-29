import { useEffect } from 'react';

const SITEMAP_URL = 'https://functions.poehali.dev/b0dd8eb7-03ae-44fc-b230-dbb9fe64deef';

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