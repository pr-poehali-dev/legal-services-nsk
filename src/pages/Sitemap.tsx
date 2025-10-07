import { useEffect, useState } from 'react';

const API_URL = 'https://functions.poehali.dev/5f51a5f5-c821-46dc-80eb-996d07934d5a';

interface BlogPost {
  slug: string;
  published_at: string;
  created_at: string;
}

const Sitemap = () => {
  const [xml, setXml] = useState('');

  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = async () => {
    try {
      const response = await fetch(`${API_URL}?published=true`);
      const posts: BlogPost[] = await response.json();

      const baseUrl = 'https://юридический-сервис.рф';
      const currentDate = new Date().toISOString().split('T')[0];

      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/services', priority: '0.9', changefreq: 'weekly' },
        { url: '/pricing', priority: '0.8', changefreq: 'weekly' },
        { url: '/blog', priority: '0.9', changefreq: 'daily' },
        { url: '/about', priority: '0.7', changefreq: 'monthly' },
        { url: '/contacts', priority: '0.8', changefreq: 'monthly' },
        { url: '/dtp-lawyer', priority: '0.8', changefreq: 'weekly' },
      ];

      let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      staticPages.forEach(page => {
        sitemapXml += '  <url>\n';
        sitemapXml += `    <loc>${baseUrl}${page.url}</loc>\n`;
        sitemapXml += `    <lastmod>${currentDate}</lastmod>\n`;
        sitemapXml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        sitemapXml += `    <priority>${page.priority}</priority>\n`;
        sitemapXml += '  </url>\n';
      });

      if (Array.isArray(posts)) {
        posts.forEach((post: BlogPost) => {
          const lastmod = post.published_at || post.created_at;
          const date = lastmod ? new Date(lastmod).toISOString().split('T')[0] : currentDate;
          
          sitemapXml += '  <url>\n';
          sitemapXml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
          sitemapXml += `    <lastmod>${date}</lastmod>\n`;
          sitemapXml += `    <changefreq>monthly</changefreq>\n`;
          sitemapXml += `    <priority>0.8</priority>\n`;
          sitemapXml += '  </url>\n';
        });
      }

      sitemapXml += '</urlset>';
      setXml(sitemapXml);
    } catch (error) {
      console.error('Ошибка генерации sitemap:', error);
    }
  };

  useEffect(() => {
    if (xml) {
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      window.location.href = url;
    }
  }, [xml]);

  return null;
};

export default Sitemap;
