import json
import os
from datetime import datetime
from typing import Dict, Any, List
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate dynamic sitemap.xml with all published blog posts
    Args: event - dict with httpMethod
          context - object with request_id attribute
    Returns: XML sitemap response
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    blog_api_url = 'https://functions.poehali.dev/5f51a5f5-c821-46dc-80eb-996d07934d5a?published=true'
    base_url = 'https://юридический-сервис.рф'
    today = datetime.now().strftime('%Y-%m-%d')
    
    posts: List[Dict[str, Any]] = []
    try:
        req = urllib.request.Request(blog_api_url)
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            if isinstance(data, list):
                posts = data
    except Exception:
        posts = []
    
    xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Главная страница -->
  <url>
    <loc>{base_url}/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Услуги -->
  <url>
    <loc>{base_url}/services</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Блог -->
  <url>
    <loc>{base_url}/blog</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- ДТП Юрист -->
  <url>
    <loc>{base_url}/dtp-lawyer</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Контакты -->
  <url>
    <loc>{base_url}/contacts</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Цены -->
  <url>
    <loc>{base_url}/pricing</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- О компании -->
  <url>
    <loc>{base_url}/about</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Политика конфиденциальности -->
  <url>
    <loc>{base_url}/privacy</loc>
    <lastmod>{today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
'''
    
    for post in posts:
        slug = post.get('slug', '')
        published_at = post.get('published_at') or post.get('created_at', '')
        
        if published_at:
            try:
                lastmod = datetime.fromisoformat(published_at.replace('Z', '+00:00')).strftime('%Y-%m-%d')
            except Exception:
                lastmod = today
        else:
            lastmod = today
        
        xml += f'''  
  <!-- Статья: {slug} -->
  <url>
    <loc>{base_url}/blog/{slug}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
'''
    
    xml += '''
</urlset>'''
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600'
        },
        'isBase64Encoded': False,
        'body': xml
    }
