'''
Business: Аутентификация пользователей с паролями, регистрация юристов
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с request_id, function_name
Returns: HTTP response с токеном или ошибкой
'''

import json
import os
import bcrypt
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime, timedelta
import uuid

DSN = os.environ.get('DATABASE_URL', '')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'login':
            return handle_login(body)
        elif action == 'register':
            return handle_register(body)
        elif action == 'verify':
            return handle_verify(event)
    
    return {
        'statusCode': 400,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Invalid action'}),
        'isBase64Encoded': False
    }

def handle_login(body: Dict[str, Any]) -> Dict[str, Any]:
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email и пароль обязательны'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(DSN)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(
        "SELECT id, email, password_hash, name, role FROM t_p52877782_legal_services_nsk.users WHERE email = %s",
        (email,)
    )
    user = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if not user:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный email или пароль'}),
            'isBase64Encoded': False
        }
    
    if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный email или пароль'}),
            'isBase64Encoded': False
        }
    
    token = str(user['id'])
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'token': token,
            'user': {
                'id': str(user['id']),
                'email': user['email'],
                'name': user['name'],
                'role': user['role']
            }
        }),
        'isBase64Encoded': False
    }

def handle_register(body: Dict[str, Any]) -> Dict[str, Any]:
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    name = body.get('name', '').strip()
    
    if not email or not password or not name:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Все поля обязательны'}),
            'isBase64Encoded': False
        }
    
    if len(password) < 6:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'}),
            'isBase64Encoded': False
        }
    
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    conn = psycopg2.connect(DSN)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(
        "SELECT id FROM t_p52877782_legal_services_nsk.users WHERE email = %s",
        (email,)
    )
    existing_user = cursor.fetchone()
    
    if existing_user:
        cursor.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Пользователь с таким email уже существует'}),
            'isBase64Encoded': False
        }
    
    user_id = str(uuid.uuid4())
    
    cursor.execute(
        """
        INSERT INTO t_p52877782_legal_services_nsk.users (id, email, password_hash, name, role)
        VALUES (%s, %s, %s, %s, 'lawyer')
        RETURNING id, email, name, role
        """,
        (user_id, email, password_hash, name)
    )
    
    new_user = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    token = str(new_user['id'])
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'token': token,
            'user': {
                'id': str(new_user['id']),
                'email': new_user['email'],
                'name': new_user['name'],
                'role': new_user['role']
            }
        }),
        'isBase64Encoded': False
    }

def handle_verify(event: Dict[str, Any]) -> Dict[str, Any]:
    token = event.get('headers', {}).get('X-Auth-Token', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Токен не предоставлен'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(DSN)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(
        "SELECT id, email, name, role FROM t_p52877782_legal_services_nsk.users WHERE id = %s",
        (token,)
    )
    user = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if not user:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный токен'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'user': {
                'id': str(user['id']),
                'email': user['email'],
                'name': user['name'],
                'role': user['role']
            }
        }),
        'isBase64Encoded': False
    }
