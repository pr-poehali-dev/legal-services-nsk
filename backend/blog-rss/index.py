'''
Business: RSS feed for blog posts
Args: event - dict with httpMethod
      context - object with attributes: request_id, function_name
Returns: RSS XML feed
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
import html

def generate_rss_feed(posts):
    """Generate RSS 2.0 feed from blog posts"""
    
    rss_items = []
    for post in posts:
        title = html.escape(post.get('title', ''))
        link = f"https://legal-services-nsk.ru/blog/{post.get('slug', '')}"
        description = html.escape(post.get('description', ''))
        pub_date = post.get('published_at') or post.get('created_at')
        
        if isinstance(pub_date, str):
            try:
                dt = datetime.fromisoformat(pub_date.replace('Z', '+00:00'))
            except:
                dt = datetime.now()
        else:
            dt = pub_date if pub_date else datetime.now()
        
        pub_date_str = dt.strftime('%a, %d %b %Y %H:%M:%S %z')
        
        category = html.escape(post.get('category', 'Новости'))
        author = html.escape(post.get('author', 'Администратор'))
        
        item = f"""
    <item>
      <title>{title}</title>
      <link>{link}</link>
      <description>{description}</description>
      <pubDate>{pub_date_str}</pubDate>
      <category>{category}</category>
      <author>{author}</author>
      <guid isPermaLink="true">{link}</guid>
    </item>"""
        
        rss_items.append(item)
    
    rss_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Юридический Сервис НСК - Блог</title>
    <link>https://legal-services-nsk.ru/blog</link>
    <description>Новости и статьи о юридических услугах в Новосибирске</description>
    <language>ru</language>
    <atom:link href="https://legal-services-nsk.ru/blog/rss" rel="self" type="application/rss+xml"/>
    {''.join(rss_items)}
  </channel>
</rss>"""
    
    return rss_xml

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    if event.get('httpMethod') == 'OPTIONS':
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
        
        rss_feed = generate_rss_feed(posts_list)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/rss+xml; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': rss_feed,
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
