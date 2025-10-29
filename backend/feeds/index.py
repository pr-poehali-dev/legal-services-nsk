'''
Business: Generate sitemap.xml and RSS feed for blog posts
Args: event - dict with httpMethod, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: XML sitemap or RSS feed based on 'type' parameter
'''

import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
import html

def generate_sitemap(posts: List[Dict], base_url: str) -> str:
    """Generate sitemap.xml with static pages and blog posts"""
    today = datetime.now().strftime('%Y-%m-%d')
    
    static_pages = [
        ('/', '1.0', 'daily'),
        ('/services', '0.9', 'weekly'),
        ('/blog', '0.8', 'daily'),
        ('/dtp-lawyer', '0.8', 'monthly'),
        ('/dtp-lawyer/insurance-dispute', '0.8', 'monthly'),
        ('/dtp-lawyer/damage-claim', '0.8', 'monthly'),
        ('/dtp-lawyer/license-alcohol', '0.8', 'monthly'),
        ('/dtp-lawyer/illegal-fine', '0.8', 'monthly'),
        ('/dtp-lawyer/bad-repair', '0.8', 'monthly'),
        ('/contacts', '0.7', 'monthly'),
        ('/pricing', '0.9', 'weekly'),
        ('/about', '0.6', 'monthly'),
        ('/privacy', '0.3', 'yearly')
    ]
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for path, priority, changefreq in static_pages:
        xml += f'''  <url>
    <loc>{base_url}{path}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>
'''
    
    for post in posts:
        slug = post.get('slug', '')
        published_at = post.get('published_at') or post.get('created_at')
        
        if published_at:
            try:
                if isinstance(published_at, str):
                    lastmod = datetime.fromisoformat(published_at.replace('Z', '+00:00')).strftime('%Y-%m-%d')
                else:
                    lastmod = published_at.strftime('%Y-%m-%d')
            except:
                lastmod = today
        else:
            lastmod = today
        
        xml += f'''  <url>
    <loc>{base_url}/blog/{slug}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
'''
    
    xml += '</urlset>'
    return xml

def generate_rss(posts: List[Dict], base_url: str) -> str:
    """Generate RSS 2.0 feed from blog posts"""
    rss_items = []
    
    for post in posts:
        title = html.escape(post.get('title', ''))
        link = f"{base_url}/blog/{post.get('slug', '')}"
        description = html.escape(post.get('description', ''))
        pub_date = post.get('published_at') or post.get('created_at')
        
        if isinstance(pub_date, str):
            try:
                dt = datetime.fromisoformat(pub_date.replace('Z', '+00:00'))
            except:
                dt = datetime.now()
        else:
            dt = pub_date if pub_date else datetime.now()
        
        pub_date_str = dt.strftime('%a, %d %b %Y %H:%M:%S +0000')
        category = html.escape(post.get('category', 'Новости'))
        author = html.escape(post.get('author', 'Администратор'))
        
        item = f'''    <item>
      <title>{title}</title>
      <link>{link}</link>
      <description>{description}</description>
      <pubDate>{pub_date_str}</pubDate>
      <category>{category}</category>
      <author>{author}</author>
      <guid isPermaLink="true">{link}</guid>
    </item>
'''
        rss_items.append(item)
    
    rss_xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Юридический Сервис НСК - Блог</title>
    <link>{base_url}/blog</link>
    <description>Новости и статьи о юридических услугах в Новосибирске</description>
    <language>ru</language>
    <atom:link href="{base_url}/feeds?type=rss" rel="self" type="application/rss+xml"/>
{''.join(rss_items)}  </channel>
</rss>'''
    
    return rss_xml

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    feed_type = params.get('type', 'sitemap')
    base_url = 'https://юридический-сервис.рф'
    
    conn = None
    try:
        database_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT id, title, slug, description, author, category, 
                   published_at, created_at
            FROM blog_posts
            WHERE published = true
            ORDER BY COALESCE(published_at, created_at) DESC
            LIMIT 50
        """
        
        cur.execute(query)
        posts = cur.fetchall()
        posts_list = [dict(post) for post in posts]
        
        if feed_type == 'rss':
            content = generate_rss(posts_list, base_url)
            content_type = 'application/rss+xml; charset=UTF-8'
        else:
            content = generate_sitemap(posts_list, base_url)
            content_type = 'application/xml; charset=UTF-8'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': content_type,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': content,
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if conn:
            conn.close()
