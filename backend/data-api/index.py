import json
import os
from typing import Dict, Any, Optional, List
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
import uuid

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Universal API for managing users, cases, blog posts and admin operations
    Handles GET (read data), POST (create), PUT (update), DELETE (remove)
    Returns: JSON response with data or error message
    """
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Get database connection
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            result = handle_get(cur, event)
        elif method == 'POST':
            result = handle_post(cur, event)
        elif method == 'PUT':
            result = handle_put(cur, event)
        elif method == 'DELETE':
            result = handle_delete(cur, event)
        else:
            result = {'error': 'Method not allowed'}
            
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200 if 'error' not in result else 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False, default=str)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}, ensure_ascii=False)
        }

def get_db_connection():
    """Get database connection using DSN from environment"""
    dsn = os.environ.get('DSN')
    if not dsn:
        raise Exception('DSN environment variable not set')
    return psycopg2.connect(dsn)

def handle_get(cur, event: Dict[str, Any]) -> Dict[str, Any]:
    """Handle GET requests - retrieve data"""
    params = event.get('queryStringParameters', {}) or {}
    resource = params.get('resource', 'dashboard')
    
    if resource == 'dashboard':
        # Get dashboard data for all roles
        return get_dashboard_data(cur)
    elif resource == 'users':
        # Get all users
        return get_users(cur, params)
    elif resource == 'cases':
        # Get cases
        return get_cases(cur, params)
    elif resource == 'blog':
        # Get blog posts
        return get_blog_posts(cur, params)
    elif resource == 'user':
        # Get specific user
        user_id = params.get('id')
        if user_id:
            return get_user_by_id(cur, user_id)
    
    return {'error': 'Invalid resource'}

def handle_post(cur, event: Dict[str, Any]) -> Dict[str, Any]:
    """Handle POST requests - create new records"""
    body_data = json.loads(event.get('body', '{}'))
    resource_type = body_data.get('type')
    
    if resource_type == 'user':
        return create_user(cur, body_data)
    elif resource_type == 'case':
        return create_case(cur, body_data)
    elif resource_type == 'blog_post':
        return create_blog_post(cur, body_data)
    
    return {'error': 'Invalid resource type'}

def handle_put(cur, event: Dict[str, Any]) -> Dict[str, Any]:
    """Handle PUT requests - update existing records"""
    params = event.get('queryStringParameters', {}) or {}
    body_data = json.loads(event.get('body', '{}'))
    
    resource_id = params.get('id')
    if not resource_id:
        return {'error': 'ID is required for updates'}
    
    resource_type = body_data.get('type')
    
    if resource_type == 'user':
        return update_user(cur, resource_id, body_data)
    elif resource_type == 'case':
        return update_case(cur, resource_id, body_data)
    elif resource_type == 'blog_post':
        return update_blog_post(cur, resource_id, body_data)
    
    return {'error': 'Invalid resource type'}

def handle_delete(cur, event: Dict[str, Any]) -> Dict[str, Any]:
    """Handle DELETE requests - remove records"""
    params = event.get('queryStringParameters', {}) or {}
    body_data = json.loads(event.get('body', '{}'))
    
    resource_id = params.get('id')
    resource_type = body_data.get('type')
    
    if not resource_id or not resource_type:
        return {'error': 'ID and type are required for deletion'}
    
    if resource_type == 'case':
        return delete_case(cur, resource_id)
    elif resource_type == 'blog_post':
        return delete_blog_post(cur, resource_id)
    
    return {'error': 'Invalid resource type or deletion not allowed'}

def get_dashboard_data(cur) -> Dict[str, Any]:
    """Get dashboard data for all roles"""
    
    # Get users count by role
    cur.execute("""
        SELECT role, COUNT(*) as count 
        FROM users 
        WHERE is_active = true 
        GROUP BY role
    """)
    user_stats = {row['role']: row['count'] for row in cur.fetchall()}
    
    # Get cases by status
    cur.execute("""
        SELECT status, COUNT(*) as count 
        FROM cases 
        GROUP BY status
    """)
    case_stats = {row['status']: row['count'] for row in cur.fetchall()}
    
    # Get blog stats
    cur.execute("SELECT COUNT(*) as total, SUM(CASE WHEN published THEN 1 ELSE 0 END) as published FROM blog_posts")
    blog_stats = cur.fetchone()
    
    return {
        'users': user_stats,
        'cases': case_stats,
        'blog': dict(blog_stats),
        'demo_mode': True
    }

def get_users(cur, params: Dict[str, Any]) -> Dict[str, Any]:
    """Get users list"""
    role = params.get('role')
    
    query = """
        SELECT id, name, email, phone, role, avatar_url, created_at, is_active
        FROM users 
        WHERE is_active = true
    """
    
    if role:
        query += " AND role = %s"
        cur.execute(query, (role,))
    else:
        cur.execute(query)
    
    users = cur.fetchall()
    return {'users': [dict(user) for user in users]}

def get_cases(cur, params: Dict[str, Any]) -> Dict[str, Any]:
    """Get cases list"""
    user_id = params.get('user_id')
    role = params.get('role')
    
    query = """
        SELECT c.id, c.title, c.description, c.status, c.priority, c.created_at,
               client.name as client_name, lawyer.name as lawyer_name
        FROM cases c
        LEFT JOIN users client ON c.client_id = client.id
        LEFT JOIN users lawyer ON c.lawyer_id = lawyer.id
    """
    
    conditions = []
    query_params = []
    
    if user_id and role == 'client':
        conditions.append("c.client_id = %s")
        query_params.append(user_id)
    elif user_id and role == 'lawyer':
        conditions.append("c.lawyer_id = %s")
        query_params.append(user_id)
    
    if conditions:
        query += " WHERE " + " AND ".join(conditions)
    
    query += " ORDER BY c.created_at DESC"
    
    cur.execute(query, query_params)
    cases = cur.fetchall()
    
    return {'cases': [dict(case) for case in cases]}

def get_blog_posts(cur, params: Dict[str, Any]) -> Dict[str, Any]:
    """Get blog posts"""
    published_only = params.get('published', 'false').lower() == 'true'
    
    query = """
        SELECT bp.id, bp.title, bp.slug, bp.excerpt, bp.published, bp.views, 
               bp.created_at, bp.updated_at, u.name as author_name
        FROM blog_posts bp
        LEFT JOIN users u ON bp.author_id = u.id
    """
    
    if published_only:
        query += " WHERE bp.published = true"
    
    query += " ORDER BY bp.created_at DESC"
    
    cur.execute(query)
    posts = cur.fetchall()
    
    return {'blog_posts': [dict(post) for post in posts]}

def get_user_by_id(cur, user_id: str) -> Dict[str, Any]:
    """Get specific user by ID"""
    cur.execute("""
        SELECT id, name, email, phone, role, avatar_url, created_at, is_active
        FROM users WHERE id = %s
    """, (user_id,))
    
    user = cur.fetchone()
    if user:
        return {'user': dict(user)}
    else:
        return {'error': 'User not found'}

def create_user(cur, data: Dict[str, Any]) -> Dict[str, Any]:
    """Create new user"""
    required_fields = ['name', 'email', 'role']
    for field in required_fields:
        if not data.get(field):
            return {'error': f'Field {field} is required'}
    
    user_id = str(uuid.uuid4())
    
    cur.execute("""
        INSERT INTO users (id, name, email, phone, role, avatar_url, password_hash)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        user_id,
        data['name'],
        data['email'],
        data.get('phone'),
        data['role'],
        data.get('avatar_url'),
        'demo_password_hash'  # Demo password
    ))
    
    return {'success': True, 'user_id': user_id}

def create_case(cur, data: Dict[str, Any]) -> Dict[str, Any]:
    """Create new case"""
    required_fields = ['title', 'description', 'client_id']
    for field in required_fields:
        if not data.get(field):
            return {'error': f'Field {field} is required'}
    
    cur.execute("""
        INSERT INTO cases (title, description, client_id, lawyer_id, status, priority)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        data['title'],
        data['description'],
        data['client_id'],
        data.get('lawyer_id'),
        data.get('status', 'pending'),
        data.get('priority', 'medium')
    ))
    
    case_id = cur.fetchone()['id']
    return {'success': True, 'case_id': case_id}

def create_blog_post(cur, data: Dict[str, Any]) -> Dict[str, Any]:
    """Create new blog post"""
    required_fields = ['title', 'content', 'author_id']
    for field in required_fields:
        if not data.get(field):
            return {'error': f'Field {field} is required'}
    
    # Generate slug from title
    slug = data['title'].lower().replace(' ', '-').replace(',', '').replace('.', '')
    
    cur.execute("""
        INSERT INTO blog_posts (title, slug, content, excerpt, author_id, published, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        data['title'],
        slug,
        data['content'],
        data.get('excerpt', ''),
        data['author_id'],
        data.get('published', False),
        data.get('image_url')
    ))
    
    post_id = cur.fetchone()['id']
    return {'success': True, 'post_id': post_id}

def update_case(cur, case_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Update existing case"""
    
    # Build dynamic update query
    update_fields = []
    values = []
    
    for field in ['title', 'description', 'status', 'priority', 'lawyer_id']:
        if field in data:
            update_fields.append(f"{field} = %s")
            values.append(data[field])
    
    if not update_fields:
        return {'error': 'No fields to update'}
    
    values.append(case_id)
    
    cur.execute(f"""
        UPDATE cases 
        SET {', '.join(update_fields)}, updated_at = NOW()
        WHERE id = %s
    """, values)
    
    if cur.rowcount > 0:
        return {'success': True}
    else:
        return {'error': 'Case not found'}

def update_blog_post(cur, post_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Update existing blog post"""
    
    update_fields = []
    values = []
    
    for field in ['title', 'content', 'excerpt', 'published', 'image_url']:
        if field in data:
            update_fields.append(f"{field} = %s")
            values.append(data[field])
    
    if not update_fields:
        return {'error': 'No fields to update'}
    
    values.append(post_id)
    
    cur.execute(f"""
        UPDATE blog_posts 
        SET {', '.join(update_fields)}, updated_at = NOW()
        WHERE id = %s
    """, values)
    
    if cur.rowcount > 0:
        return {'success': True}
    else:
        return {'error': 'Blog post not found'}

def update_user(cur, user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Update existing user"""
    
    update_fields = []
    values = []
    
    for field in ['name', 'email', 'phone', 'role', 'avatar_url', 'is_active']:
        if field in data:
            update_fields.append(f"{field} = %s")
            values.append(data[field])
    
    if not update_fields:
        return {'error': 'No fields to update'}
    
    values.append(user_id)
    
    cur.execute(f"""
        UPDATE users 
        SET {', '.join(update_fields)}, updated_at = NOW()
        WHERE id = %s
    """, values)
    
    if cur.rowcount > 0:
        return {'success': True}
    else:
        return {'error': 'User not found'}

def delete_case(cur, case_id: str) -> Dict[str, Any]:
    """Delete case (soft delete by changing status)"""
    cur.execute("""
        UPDATE cases 
        SET status = 'cancelled', updated_at = NOW()
        WHERE id = %s
    """, (case_id,))
    
    if cur.rowcount > 0:
        return {'success': True}
    else:
        return {'error': 'Case not found'}

def delete_blog_post(cur, post_id: str) -> Dict[str, Any]:
    """Delete blog post"""
    cur.execute("DELETE FROM blog_posts WHERE id = %s", (post_id,))
    
    if cur.rowcount > 0:
        return {'success': True}
    else:
        return {'error': 'Blog post not found'}