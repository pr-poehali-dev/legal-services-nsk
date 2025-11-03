'''
Business: CRM system for legal services - manage clients, cases, and interactions, handle car lawyer form submissions
Args: event with httpMethod, queryStringParameters, body; context with request_id
Returns: HTTP response with client data, cases, interactions
'''

import json
import os
from typing import Dict, Any, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not set')
    return psycopg2.connect(dsn)

def add_cors_headers(response: Dict[str, Any]) -> Dict[str, Any]:
    """Add CORS headers to response"""
    if 'headers' not in response:
        response['headers'] = {}
    response['headers']['Access-Control-Allow-Origin'] = '*'
    response['headers']['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response['headers']['Access-Control-Allow-Headers'] = 'Content-Type, X-Auth-Token'
    return response

def send_whatsapp_message(name: str, phone: str, message: str = '') -> bool:
    """Send WhatsApp notification via Green API"""
    instance_id = os.environ.get('GREENAPI_INSTANCE_ID')
    token = os.environ.get('GREENAPI_TOKEN')
    
    if not instance_id or not token:
        return False
    
    chat_id = '79994523500@c.us'
    api_url = f'https://1103.api.green-api.com/waInstance{instance_id}/sendMessage/{token}'
    
    whatsapp_text = f'''🚗 *Новая заявка с сайта - Автоюрист*

👤 *Имя:* {name}
📞 *Телефон:* {phone}'''
    
    if message:
        whatsapp_text += f'\n\n💬 *Сообщение:*\n{message}'
    
    whatsapp_text += f'\n\n⏰ *Время:* {datetime.now().strftime("%d.%m.%Y, %H:%M:%S")}'
    
    payload = {
        'chatId': chat_id,
        'message': whatsapp_text
    }
    
    response = requests.post(api_url, json=payload, timeout=10)
    return response.status_code == 200

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return add_cors_headers({
            'statusCode': 200,
            'headers': {'Content-Type': 'text/plain'},
            'body': '',
            'isBase64Encoded': False
        })
    
    params = event.get('queryStringParameters', {}) or {}
    
    if method == 'POST' and params.get('action') == 'car_lawyer_form':
        body_data = json.loads(event.get('body', '{}'))
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        message = body_data.get('message', '')
        
        if not name or not phone:
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Name and phone are required'}),
                'isBase64Encoded': False
            })
        
        success = send_whatsapp_message(name, phone, message)
        
        if not success:
            return add_cors_headers({
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Failed to send WhatsApp message'}),
                'isBase64Encoded': False
            })
        
        return add_cors_headers({
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'message': 'Заявка успешно отправлена'}),
            'isBase64Encoded': False
        })
    
    token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token')
    
    if not token:
        return add_cors_headers({
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        })
    
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        cursor.execute("SELECT id, role FROM users WHERE auth_token = %s", (token,))
        user = cursor.fetchone()
        
        if not user:
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            })
        
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            request_type = params.get('type', 'list')
            
            if request_type == 'client_detail':
                client_id = params.get('client_id')
                if not client_id:
                    return add_cors_headers({
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'client_id required'}),
                        'isBase64Encoded': False
                    })
                
                cursor.execute("""
                    SELECT id, name, email, phone, created_at 
                    FROM users 
                    WHERE id = %s AND role = 'client'
                """, (client_id,))
                client = cursor.fetchone()
                
                if not client:
                    return add_cors_headers({
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Client not found'}),
                        'isBase64Encoded': False
                    })
                
                cursor.execute("""
                    SELECT id, title, status, priority, category, price, progress, created_at
                    FROM cases
                    WHERE client_id = %s
                    ORDER BY created_at DESC
                """, (client_id,))
                cases = cursor.fetchall()
                
                cursor.execute("""
                    SELECT i.id, i.type, i.description, i.created_at, u.name as created_by
                    FROM interactions i
                    LEFT JOIN users u ON i.created_by = u.id
                    WHERE i.client_id = %s
                    ORDER BY i.created_at DESC
                """, (client_id,))
                interactions = cursor.fetchall()
                
                cursor.execute("""
                    SELECT 
                        COALESCE(SUM(CASE WHEN payment_status = 'paid' THEN price ELSE 0 END), 0) as total_paid,
                        COALESCE(SUM(CASE WHEN payment_status = 'pending' THEN price ELSE 0 END), 0) as total_debt
                    FROM cases
                    WHERE client_id = %s
                """, (client_id,))
                finances = cursor.fetchone()
                
                result = {
                    **dict(client),
                    'cases': [dict(c) for c in cases],
                    'interactions': [dict(i) for i in interactions],
                    'total_paid': float(finances['total_paid']) if finances else 0,
                    'total_debt': float(finances['total_debt']) if finances else 0
                }
                
                return add_cors_headers({
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps(result, default=str),
                    'isBase64Encoded': False
                })
            
            cursor.execute("""
                SELECT 
                    u.id, u.name, u.email, u.phone,
                    COUNT(DISTINCT c.id) as cases_count,
                    COALESCE(SUM(c.price), 0) as total_revenue
                FROM users u
                LEFT JOIN cases c ON c.client_id = u.id
                WHERE u.role = 'client'
                GROUP BY u.id, u.name, u.email, u.phone
                ORDER BY u.created_at DESC
            """)
            clients = cursor.fetchall()
            
            return add_cors_headers({
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps([dict(c) for c in clients], default=str),
                'isBase64Encoded': False
            })
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'add_interaction':
                client_id = body_data.get('client_id')
                interaction_type = body_data.get('type')
                description = body_data.get('description')
                
                if not all([client_id, interaction_type, description]):
                    return add_cors_headers({
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Missing required fields'}),
                        'isBase64Encoded': False
                    })
                
                cursor.execute("""
                    INSERT INTO interactions (client_id, type, description, created_by)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id
                """, (client_id, interaction_type, description, user['id']))
                
                conn.commit()
                
                return add_cors_headers({
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'success': True, 'id': cursor.fetchone()['id']}),
                    'isBase64Encoded': False
                })
        
        return add_cors_headers({
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        })
    
    finally:
        cursor.close()
        conn.close()