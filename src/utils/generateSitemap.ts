interface BlogPost {
  slug: string;
  published_at: string;
  updated_at: string;
  created_at: string;
}

export async function generateSitemap(): Promise<string> {
  const API_URL = 'https://functions.poehali.dev/5f51a5f5-c821-46dc-80eb-996d07934d5a';
  
  try {
    const response = await fetch(`${API_URL}?published=true`);
    const posts: BlogPost[] = await response.json();
    
    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/about', priority: '0.8', changefreq: 'monthly' },
      { loc: '/services', priority: '0.9', changefreq: 'weekly' },
      { loc: '/contacts', priority: '0.7', changefreq: 'monthly' },
      { loc: '/blog', priority: '0.9', changefreq: 'daily' },
    ];
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    staticPages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://юридический-сервис.рф${page.loc}</loc>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += '  </url>\n';
    });
    
    posts.forEach(post => {
      const lastmod = post.updated_at || post.published_at || post.created_at;
      const date = new Date(lastmod).toISOString().split('T')[0];
      
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://юридический-сервис.рф/blog/${post.slug}</loc>\n`;
      sitemap += `    <priority>0.8</priority>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <lastmod>${date}</lastmod>\n`;
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}

export async function downloadSitemap() {
  const sitemap = await generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
