import { useEffect, useState } from 'react';

interface BlogPost {
  slug: string;
  published_at: string;
  created_at: string;
}

const API_URL = 'https://functions.poehali.dev/5f51a5f5-c821-46dc-80eb-996d07934d5a';

const DynamicSitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = async () => {
    try {
      const response = await fetch(`${API_URL}?published=true`);
      const posts: BlogPost[] = await response.json();

      const baseUrl = 'https://юридический-сервис.рф';
      const today = new Date().toISOString().split('T')[0];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Главная страница -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Услуги -->
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Блог -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- ДТП Юрист -->
  <url>
    <loc>${baseUrl}/dtp-lawyer</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Контакты -->
  <url>
    <loc>${baseUrl}/contacts</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Цены -->
  <url>
    <loc>${baseUrl}/pricing</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- О компании -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Политика конфиденциальности -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
`;

      if (Array.isArray(posts)) {
        posts.forEach(post => {
          const lastmod = post.published_at || post.created_at;
          const formattedDate = new Date(lastmod).toISOString().split('T')[0];
          
          xml += `  
  <!-- Статья: ${post.slug} -->
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        });
      }

      xml += `
</urlset>`;

      setSitemapXml(xml);
    } catch (error) {
      console.error('Ошибка генерации sitemap:', error);
    }
  };

  useEffect(() => {
    if (sitemapXml) {
      document.write(sitemapXml);
    }
  }, [sitemapXml]);

  return (
    <pre style={{ 
      whiteSpace: 'pre-wrap', 
      wordBreak: 'break-word',
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      {sitemapXml}
    </pre>
  );
};

export default DynamicSitemap;
