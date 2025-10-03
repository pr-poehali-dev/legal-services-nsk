import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
import xml.etree.ElementTree as ET

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Генерация RSS-ленты для Яндекс.Новости
    Args: event - dict с httpMethod
          context - object с attributes: request_id
    Returns: XML RSS feed
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
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/xml; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            'body': '<?xml version="1.0" encoding="utf-8"?><error>Method not allowed</error>',
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        database_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("""
            SELECT id, title, slug, content, description, author, category, 
                   image_url, video_url, thumbnail_url, published_at, created_at
            FROM t_p52877782_legal_services_nsk.blog_posts 
            WHERE published = true 
            ORDER BY published_at DESC 
            LIMIT 50
        """)
        posts = cur.fetchall()
        
        rss = ET.Element('rss', {
            'xmlns:yandex': 'http://news.yandex.ru',
            'xmlns:media': 'http://search.yahoo.com/mrss/',
            'version': '2.0'
        })
        
        channel = ET.SubElement(rss, 'channel')
        ET.SubElement(channel, 'title').text = 'ЮрСервис НСК - Блог'
        ET.SubElement(channel, 'link').text = 'https://юридический-сервис.рф/'
        ET.SubElement(channel, 'description').text = 'Юридические услуги и консультации в Новосибирске'
        
        for post in posts:
            item = ET.SubElement(channel, 'item')
            
            ET.SubElement(item, 'title').text = post['title'] or ''
            ET.SubElement(item, 'link').text = f"https://юридический-сервис.рф/blog/{post['slug']}"
            ET.SubElement(item, 'pdalink').text = f"https://юридический-сервис.рф/blog/{post['slug']}"
            
            if post['description']:
                ET.SubElement(item, 'description').text = post['description']
            
            if post['author']:
                ET.SubElement(item, 'author').text = post['author']
            
            if post['category']:
                ET.SubElement(item, 'category').text = post['category']
            
            if post['video_url'] or post['thumbnail_url']:
                media_group = ET.SubElement(item, 'media:group')
                if post['video_url']:
                    ET.SubElement(media_group, 'media:content', {
                        'url': post['video_url'],
                        'type': 'video/mp4'
                    })
                if post['thumbnail_url']:
                    ET.SubElement(media_group, 'media:thumbnail', {
                        'url': post['thumbnail_url']
                    })
            
            pub_date = post['published_at'] or post['created_at']
            if pub_date:
                if isinstance(pub_date, str):
                    pub_date = datetime.fromisoformat(pub_date.replace('Z', '+00:00'))
                formatted_date = pub_date.strftime('%a, %d %b %Y %H:%M:%S GMT')
                ET.SubElement(item, 'pubDate').text = formatted_date
            else:
                default_date = datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')
                ET.SubElement(item, 'pubDate').text = default_date
            
            ET.SubElement(item, 'yandex:genre').text = 'message'
            
            if post['content']:
                full_text = post['content'][:1000]
                ET.SubElement(item, 'yandex:full-text').text = full_text
        
        xml_string = ET.tostring(rss, encoding='utf-8', method='xml')
        xml_declaration = b'<?xml version="1.0" encoding="utf-8"?>\n'
        final_xml = xml_declaration + xml_string
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/xml; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': final_xml.decode('utf-8'),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        error_xml = f'<?xml version="1.0" encoding="utf-8"?><error>{str(e)}</error>'
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/xml; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            'body': error_xml,
            'isBase64Encoded': False
        }
    finally:
        if conn:
            conn.close()