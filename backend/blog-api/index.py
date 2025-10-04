import json
import os
from typing import Dict, Any, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления постами блога (CRUD операции)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с attributes: request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
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
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            post_id = params.get('id')
            slug = params.get('slug')
            published_param = params.get('published')
            
            if post_id:
                query = f"SELECT * FROM t_p52877782_legal_services_nsk.blog_posts WHERE id = {int(post_id)}"
                cur.execute(query)
                post = cur.fetchone()
                result = dict(post) if post else None
            elif slug:
                safe_slug = slug.replace("'", "''")
                query = f"SELECT * FROM t_p52877782_legal_services_nsk.blog_posts WHERE slug = '{safe_slug}'"
                cur.execute(query)
                post = cur.fetchone()
                result = dict(post) if post else None
            else:
                query = "SELECT * FROM t_p52877782_legal_services_nsk.blog_posts"
                if published_param == 'true':
                    query += " WHERE published = true"
                elif published_param == 'false':
                    query += " WHERE published = false"
                query += " ORDER BY created_at DESC"
                
                cur.execute(query)
                posts = cur.fetchall()
                result = [dict(post) for post in posts]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            title = body_data.get('title', '')
            slug = body_data.get('slug', '')
            content = body_data.get('content', '')
            description = body_data.get('description', '')
            author = body_data.get('author', 'Администратор')
            category = body_data.get('category', 'Новости')
            image_url = body_data.get('image_url', '')
            video_url = body_data.get('video_url', '')
            thumbnail_url = body_data.get('thumbnail_url', '')
            published = body_data.get('published', False)
            seo_title = body_data.get('seo_title', '')
            seo_description = body_data.get('seo_description', '')
            seo_h1 = body_data.get('seo_h1', '')
            
            if not all([title, slug, content]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'title, slug and content are required'}),
                    'isBase64Encoded': False
                }
            
            safe_title = title.replace("'", "''")
            safe_slug = slug.replace("'", "''")
            safe_content = content.replace("'", "''")
            safe_description = description.replace("'", "''")
            safe_author = author.replace("'", "''")
            safe_category = category.replace("'", "''")
            safe_image_url = image_url.replace("'", "''")
            safe_video_url = video_url.replace("'", "''")
            safe_thumbnail_url = thumbnail_url.replace("'", "''")
            safe_seo_title = seo_title.replace("'", "''")
            safe_seo_description = seo_description.replace("'", "''")
            safe_seo_h1 = seo_h1.replace("'", "''")
            
            published_str = 'true' if published else 'false'
            published_at_str = 'NOW()' if published else 'NULL'
            
            query = f"""INSERT INTO t_p52877782_legal_services_nsk.blog_posts 
            (title, slug, content, description, author, category, image_url, 
            video_url, thumbnail_url, published, published_at, created_at, updated_at, author_id,
            seo_title, seo_description, seo_h1)
            VALUES ('{safe_title}', '{safe_slug}', '{safe_content}', '{safe_description}', 
            '{safe_author}', '{safe_category}', '{safe_image_url}', '{safe_video_url}', 
            '{safe_thumbnail_url}', {published_str}, {published_at_str}, NOW(), NOW(), gen_random_uuid(),
            '{safe_seo_title}', '{safe_seo_description}', '{safe_seo_h1}')
            RETURNING id, title, slug, created_at"""
            
            cur.execute(query)
            conn.commit()
            result = dict(cur.fetchone())
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            post_id = body_data.get('id')
            
            if not post_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'id is required'}),
                    'isBase64Encoded': False
                }
            
            fields = []
            
            if 'title' in body_data:
                safe_title = body_data['title'].replace("'", "''")
                fields.append(f"title = '{safe_title}'")
            if 'slug' in body_data:
                safe_slug = body_data['slug'].replace("'", "''")
                fields.append(f"slug = '{safe_slug}'")
            if 'content' in body_data:
                safe_content = body_data['content'].replace("'", "''")
                fields.append(f"content = '{safe_content}'")
            if 'description' in body_data:
                safe_desc = body_data['description'].replace("'", "''")
                fields.append(f"description = '{safe_desc}'")
            if 'author' in body_data:
                safe_author = body_data['author'].replace("'", "''")
                fields.append(f"author = '{safe_author}'")
            if 'category' in body_data:
                safe_cat = body_data['category'].replace("'", "''")
                fields.append(f"category = '{safe_cat}'")
            if 'image_url' in body_data:
                safe_img = body_data['image_url'].replace("'", "''")
                fields.append(f"image_url = '{safe_img}'")
            if 'video_url' in body_data:
                safe_vid = body_data['video_url'].replace("'", "''")
                fields.append(f"video_url = '{safe_vid}'")
            if 'thumbnail_url' in body_data:
                safe_thumb = body_data['thumbnail_url'].replace("'", "''")
                fields.append(f"thumbnail_url = '{safe_thumb}'")
            if 'seo_title' in body_data:
                safe_seo_title = body_data['seo_title'].replace("'", "''")
                fields.append(f"seo_title = '{safe_seo_title}'")
            if 'seo_description' in body_data:
                safe_seo_desc = body_data['seo_description'].replace("'", "''")
                fields.append(f"seo_description = '{safe_seo_desc}'")
            if 'seo_h1' in body_data:
                safe_seo_h1 = body_data['seo_h1'].replace("'", "''")
                fields.append(f"seo_h1 = '{safe_seo_h1}'")
            if 'published' in body_data:
                pub_str = 'true' if body_data['published'] else 'false'
                fields.append(f"published = {pub_str}")
                if body_data['published']:
                    fields.append('published_at = NOW()')
            
            fields.append('updated_at = NOW()')
            
            query = f"UPDATE t_p52877782_legal_services_nsk.blog_posts SET {', '.join(fields)} WHERE id = {int(post_id)} RETURNING *"
            cur.execute(query)
            conn.commit()
            result = dict(cur.fetchone())
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            post_id = params.get('id')
            
            if not post_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'id is required'}),
                    'isBase64Encoded': False
                }
            
            query = f"SELECT id FROM t_p52877782_legal_services_nsk.blog_posts WHERE id = {int(post_id)}"
            cur.execute(query)
            existing = cur.fetchone()
            
            if existing:
                query = f"UPDATE t_p52877782_legal_services_nsk.blog_posts SET published = false WHERE id = {int(post_id)}"
                cur.execute(query)
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Post unpublished successfully'}),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Post not found'}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
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