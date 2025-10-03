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
            published_only = params.get('published', 'true') == 'true'
            
            if post_id:
                cur.execute(
                    "SELECT * FROM blog_posts WHERE id = %s",
                    (int(post_id),)
                )
                post = cur.fetchone()
                result = dict(post) if post else None
            elif slug:
                cur.execute(
                    "SELECT * FROM blog_posts WHERE slug = %s",
                    (slug,)
                )
                post = cur.fetchone()
                result = dict(post) if post else None
            else:
                query = "SELECT * FROM blog_posts"
                if published_only:
                    query += " WHERE published = true"
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
            
            title = body_data.get('title')
            slug = body_data.get('slug')
            content = body_data.get('content')
            description = body_data.get('description', '')
            author = body_data.get('author', 'Администратор')
            category = body_data.get('category', 'Новости')
            image_url = body_data.get('image_url', '')
            video_url = body_data.get('video_url', '')
            thumbnail_url = body_data.get('thumbnail_url', '')
            published = body_data.get('published', False)
            
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
            
            published_at = datetime.now() if published else None
            
            cur.execute(
                """INSERT INTO blog_posts 
                (title, slug, content, description, author, category, image_url, 
                video_url, thumbnail_url, published, published_at, created_at, updated_at, author_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), gen_random_uuid())
                RETURNING id, title, slug, created_at""",
                (title, slug, content, description, author, category, image_url,
                 video_url, thumbnail_url, published, published_at)
            )
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
            values = []
            
            if 'title' in body_data:
                fields.append('title = %s')
                values.append(body_data['title'])
            if 'slug' in body_data:
                fields.append('slug = %s')
                values.append(body_data['slug'])
            if 'content' in body_data:
                fields.append('content = %s')
                values.append(body_data['content'])
            if 'description' in body_data:
                fields.append('description = %s')
                values.append(body_data['description'])
            if 'author' in body_data:
                fields.append('author = %s')
                values.append(body_data['author'])
            if 'category' in body_data:
                fields.append('category = %s')
                values.append(body_data['category'])
            if 'image_url' in body_data:
                fields.append('image_url = %s')
                values.append(body_data['image_url'])
            if 'video_url' in body_data:
                fields.append('video_url = %s')
                values.append(body_data['video_url'])
            if 'thumbnail_url' in body_data:
                fields.append('thumbnail_url = %s')
                values.append(body_data['thumbnail_url'])
            if 'published' in body_data:
                fields.append('published = %s')
                values.append(body_data['published'])
                if body_data['published']:
                    fields.append('published_at = NOW()')
            
            fields.append('updated_at = NOW()')
            values.append(int(post_id))
            
            query = f"UPDATE blog_posts SET {', '.join(fields)} WHERE id = %s RETURNING *"
            cur.execute(query, tuple(values))
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
            
            cur.execute("DELETE FROM blog_posts WHERE id = %s RETURNING id", (int(post_id),))
            conn.commit()
            deleted = cur.fetchone()
            
            if deleted:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Post deleted successfully'}),
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