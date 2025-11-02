'''
Business: Универсальная система аутентификации и управления делами для юристов и клиентов
Args: event - dict с httpMethod, body, queryStringParameters, headers
      context - объект с request_id, function_name
Returns: HTTP response с данными или ошибкой
'''

import json
import os
import bcrypt
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime, timedelta
import uuid
import random
import string
import requests
import jwt

DSN = os.environ.get('DATABASE_URL', '')
SMSRU_API_KEY = os.environ.get('SMSRU_API_KEY', '')
JWT_SECRET = os.environ.get('JWT_SECRET', 'fallback-secret-key')


def generate_code() -> str:
    return ''.join(random.choices(string.digits, k=6))


def send_sms(phone: str, message: str) -> tuple[bool, str]:
    """Отправка SMS через SMS.RU"""
    
    phone_clean = phone.replace('+', '').replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
    
    if phone_clean.startswith('8'):
        phone_clean = '7' + phone_clean[1:]
    
    url = 'https://sms.ru/sms/send'
    
    try:
        params = {
            'api_id': SMSRU_API_KEY,
            'to': phone_clean,
            'msg': message,
            'json': 1
        }
        
        response = requests.get(url, params=params, timeout=10)
        
        print(f'SMS.RU API response status: {response.status_code}')
        print(f'SMS.RU API response body: {response.text}')
        
        if response.status_code == 200:
            result = response.json()
            if result.get('status') == 'OK':
                return True, 'SMS sent'
            else:
                error_code = result.get('status_code', 'unknown')
                error_text = result.get('status_text', str(result))
                return False, f'API error {error_code}: {error_text}'
        else:
            return False, f'HTTP {response.status_code}'
            
    except Exception as e:
        print(f'SMS.RU API exception: {type(e).__name__} - {str(e)}')
        return False, f'{type(e).__name__}: {str(e)}'


def add_cors_headers(response: Dict[str, Any]) -> Dict[str, Any]:
    """Add CORS headers to response"""
    if 'headers' not in response:
        response['headers'] = {}
    response['headers']['Access-Control-Allow-Origin'] = '*'
    response['headers']['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response['headers']['Access-Control-Allow-Headers'] = 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id'
    return response


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return add_cors_headers({
            'statusCode': 200,
            'headers': {'Content-Type': 'text/plain'},
            'body': '',
            'isBase64Encoded': False
        })
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'login':
            return handle_login(body)
        elif action == 'register':
            return handle_register(body)
        elif action == 'verify':
            return handle_verify(event)
        elif action == 'phone_request_code':
            return handle_phone_request_code(body)
        elif action == 'phone_verify_code':
            return handle_phone_verify_code(body)
        elif action == 'sms_request_code':
            return handle_sms_request_code(body)
        elif action == 'sms_verify_code':
            return handle_sms_verify_code(body)
        elif action == 'create_client':
            return handle_create_client(event, body)
        elif action == 'create_case':
            return handle_create_case(event, body)
        elif action == 'add_interaction':
            return handle_add_interaction(event, body)
    
    elif method == 'GET':
        return handle_get_data(event)
    
    elif method == 'PUT':
        body = json.loads(event.get('body', '{}'))
        return handle_update_case(event, body)
    
    elif method == 'DELETE':
        return handle_delete(event)
    
    return add_cors_headers({
        'statusCode': 400,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'error': 'Invalid action'}),
        'isBase64Encoded': False
    })


def handle_phone_request_code(body: Dict[str, Any]) -> Dict[str, Any]:
    phone = body.get('phone', '').strip().replace("'", "''")
    
    if not phone:
        return add_cors_headers({
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Phone number required'}),
            'isBase64Encoded': False
        })
    
    code = generate_code()
    expires_at = (datetime.now() + timedelta(minutes=10)).isoformat()
    
    conn = psycopg2.connect(DSN)
    conn.autocommit = True
    cur = conn.cursor()
    
    query = f"INSERT INTO t_p52877782_legal_services_nsk.auth_codes (phone, code, expires_at) VALUES ('{phone}', '{code}', '{expires_at}')"
    cur.execute(query)
    
    cur.close()
    conn.close()
    
    sms_text = f'Ваш код для входа: {code}. Код действителен 10 минут.'
    sent, error_msg = send_sms(phone, sms_text)
    
    return add_cors_headers({
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({
            'message': 'Код отправлен на SMS' if sent else f'Код сгенерирован ({error_msg})', 
            'phone': phone,
            'code': code,
            'sms_sent': sent,
            'sms_error': error_msg if not sent else None
        }),
        'isBase64Encoded': False
    })


def handle_phone_verify_code(body: Dict[str, Any]) -> Dict[str, Any]:
    phone = body.get('phone', '').strip().replace("'", "''")
    code = body.get('code', '').strip().replace("'", "''")
    
    if not phone or not code:
        return add_cors_headers({
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Phone and code required'}),
            'isBase64Encoded': False
        })
    
    conn = psycopg2.connect(DSN)
    conn.autocommit = True
    cur = conn.cursor()
    
    query = f"""
        SELECT id, phone, code, used, expires_at, created_at FROM t_p52877782_legal_services_nsk.auth_codes 
        WHERE phone = '{phone}' AND code = '{code}' AND used = false AND expires_at > NOW()
        ORDER BY created_at DESC LIMIT 1
    """
    cur.execute(query)
    row = cur.fetchone()
    
    if not row:
        cur.close()
        conn.close()
        return add_cors_headers({
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid or expired code'}),
            'isBase64Encoded': False
        })
    
    auth_code_id = row[0]
    
    cur.execute(f"UPDATE t_p52877782_legal_services_nsk.auth_codes SET used = true WHERE id = {auth_code_id}")
    
    cur.execute(f"SELECT id, phone, name, email, role, created_at FROM t_p52877782_legal_services_nsk.users WHERE phone = '{phone}'")
    user_row = cur.fetchone()
    
    if not user_row:
        name = body.get('name', f'Клиент {phone[-4:]}').replace("'", "''")
        email = f'{phone}@temp.local'.replace("'", "''")
        cur.execute(f"""
            INSERT INTO t_p52877782_legal_services_nsk.users (phone, name, email, password_hash, role)
            VALUES ('{phone}', '{name}', '{email}', 'phone_auth', 'client')
            RETURNING id, phone, name, email, role, created_at
        """)
        user_row = cur.fetchone()
    
    user_id, user_phone, user_name, user_email, user_role, user_created = user_row
    
    token = str(uuid.uuid4())
    cur.execute(f"UPDATE t_p52877782_legal_services_nsk.users SET auth_token = '{token}' WHERE id = '{user_id}'")
    
    result = {
        'token': token,
        'user': {
            'id': str(user_id),
            'name': user_name,
            'phone': user_phone,
            'role': user_role,
            'email': user_email,
            'created_at': user_created.isoformat() if user_created else None
        }
    }
    
    cur.close()
    conn.close()
    
    return add_cors_headers({
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(result),
        'isBase64Encoded': False
    })


def handle_sms_request_code(body: Dict[str, Any]) -> Dict[str, Any]:
    """Запрос кода через SMS.RU"""
    phone = body.get('phone', '').strip().replace("'", "''")
    
    if not phone:
        return add_cors_headers({
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Номер телефона обязателен'}),
            'isBase64Encoded': False
        })
    
    code = generate_code()
    expires_at = (datetime.now() + timedelta(minutes=10)).isoformat()
    
    conn = psycopg2.connect(DSN)
    conn.autocommit = True
    cur = conn.cursor()
    
    query = f"INSERT INTO t_p52877782_legal_services_nsk.auth_codes (phone, code, expires_at) VALUES ('{phone}', '{code}', '{expires_at}')"
    cur.execute(query)
    
    cur.close()
    conn.close()
    
    sms_text = f'Ваш код для входа: {code}. Код действителен 10 минут.'
    sent, error_msg = send_sms(phone, sms_text)
    
    return add_cors_headers({
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({
            'message': 'Код отправлен в SMS' if sent else f'Ошибка отправки: {error_msg}',
            'phone': phone,
            'sent': sent,
            'error': error_msg if not sent else None
        }),
        'isBase64Encoded': False
    })


def handle_sms_verify_code(body: Dict[str, Any]) -> Dict[str, Any]:
    """Проверка кода из SMS"""
    phone = body.get('phone', '').strip().replace("'", "''")
    code = body.get('code', '').strip().replace("'", "''")
    
    if not phone or not code:
        return add_cors_headers({
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Телефон и код обязательны'}),
            'isBase64Encoded': False
        })
    
    conn = psycopg2.connect(DSN)
    conn.autocommit = True
    cur = conn.cursor()
    
    query = f"""
        SELECT id FROM t_p52877782_legal_services_nsk.auth_codes 
        WHERE phone = '{phone}' AND code = '{code}' AND used = false AND expires_at > NOW()
        ORDER BY created_at DESC LIMIT 1
    """
    cur.execute(query)
    row = cur.fetchone()
    
    if not row:
        cur.close()
        conn.close()
        return add_cors_headers({
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Неверный или истёкший код'}),
            'isBase64Encoded': False
        })
    
    auth_code_id = row[0]
    cur.execute(f"UPDATE t_p52877782_legal_services_nsk.auth_codes SET used = true WHERE id = {auth_code_id}")
    
    cur.execute(f"SELECT id, phone, name, email, role, created_at FROM t_p52877782_legal_services_nsk.users WHERE phone = '{phone}'")
    user_row = cur.fetchone()
    
    if not user_row:
        name = body.get('name', f'Клиент {phone[-4:]}').replace("'", "''")
        email = f'{phone}@temp.local'.replace("'", "''")
        cur.execute(f"""
            INSERT INTO t_p52877782_legal_services_nsk.users (phone, name, email, password_hash, role)
            VALUES ('{phone}', '{name}', '{email}', 'sms_auth', 'client')
            RETURNING id, phone, name, email, role, created_at
        """)
        user_row = cur.fetchone()
    
    user_id, user_phone, user_name, user_email, user_role, user_created = user_row
    
    token = str(uuid.uuid4())
    cur.execute(f"UPDATE t_p52877782_legal_services_nsk.users SET auth_token = '{token}' WHERE id = '{user_id}'")
    
    result = {
        'token': token,
        'user': {
            'id': str(user_id),
            'name': user_name,
            'phone': user_phone,
            'role': user_role,
            'email': user_email,
            'created_at': user_created.isoformat() if user_created else None
        }
    }
    
    cur.close()
    conn.close()
    
    return add_cors_headers({
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(result),
        'isBase64Encoded': False
    })


def handle_get_data(event: Dict[str, Any]) -> Dict[str, Any]:
    try:
        headers = event.get('headers', {})
        auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
        
        print(f'GET DATA REQUEST: type={event.get("queryStringParameters", {}).get("type")}')
        
        if not auth_token:
            print('ERROR: No auth token')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            })
        
        try:
            decoded = jwt.decode(auth_token, JWT_SECRET, algorithms=['HS256'])
            user_id = decoded.get('user_id')
            print(f'Decoded JWT: user_id={user_id}')
        except jwt.ExpiredSignatureError:
            print('ERROR: Token expired')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Token expired'}),
                'isBase64Encoded': False
            })
        except Exception as jwt_err:
            print(f'ERROR: Invalid token - {str(jwt_err)}')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            })
        
        conn = psycopg2.connect(DSN)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT * FROM t_p52877782_legal_services_nsk.users WHERE id = %s",
            (user_id,)
        )
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Access denied'}),
                'isBase64Encoded': False
            })
        
        query_params = event.get('queryStringParameters') or {}
        request_type = query_params.get('type', 'cases')
        
        if request_type == 'cases':
            if user['role'] in ['lawyer', 'admin']:
                cur.execute(
                    """
                    SELECT 
                        c.*,
                        u.name as client_name,
                        u.email as client_email,
                        u.phone as client_phone
                    FROM t_p52877782_legal_services_nsk.cases c
                    LEFT JOIN t_p52877782_legal_services_nsk.users u ON c.client_id = u.id
                    ORDER BY c.created_at DESC
                    """
                )
            else:
                cur.execute(
                    """
                    SELECT c.* 
                    FROM t_p52877782_legal_services_nsk.cases c
                    WHERE c.client_id = %s
                    ORDER BY c.created_at DESC
                    """,
                    (user_id,)
                )
            
            cases = cur.fetchall()
            
            result = [{
                'id': str(c['id']),
                'title': c['title'],
                'description': c['description'],
                'status': c['status'],
                'priority': c['priority'],
                'category': c['category'],
                'price': float(c['price']) if c['price'] else 0,
                'progress': c['progress'] or 0,
                'created_at': c['created_at'].isoformat() if c['created_at'] else None,
                'client_name': c.get('client_name'),
                'client_email': c.get('client_email'),
                'client_phone': c.get('client_phone'),
                'hearing_date': c['hearing_date'].isoformat() if c.get('hearing_date') else None,
                'hearing_result': c.get('hearing_result'),
                'next_hearing_date': c['next_hearing_date'].isoformat() if c.get('next_hearing_date') else None,
                'lawyer_name': 'Юрист'
            } for c in cases]
            
            cur.close()
            conn.close()
            
            return add_cors_headers({
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            })
        
        elif request_type == 'clients':
            print(f'CLIENTS REQUEST from user role={user["role"]}')
            if user['role'] not in ['lawyer', 'admin']:
                cur.close()
                conn.close()
                return add_cors_headers({
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Access denied'}),
                    'isBase64Encoded': False
                })
            
            cur.execute(
                """
                SELECT 
                    u.*,
                    COUNT(c.id) as cases_count
                FROM t_p52877782_legal_services_nsk.users u
                LEFT JOIN t_p52877782_legal_services_nsk.cases c ON u.id = c.client_id
                WHERE u.role = 'client'
                GROUP BY u.id
                ORDER BY u.created_at DESC
                """
            )
            clients = cur.fetchall()
            print(f'SUCCESS: Loaded {len(clients)} clients from database')
            
            result = [{
                'id': str(cl['id']),
                'name': cl['name'],
                'email': cl['email'],
                'phone': cl['phone'],
                'created_at': cl['created_at'].isoformat() if cl['created_at'] else None,
                'cases_count': cl['cases_count'] or 0
            } for cl in clients]
            
            print(f'RESPONSE: Returning {len(result)} clients')
            cur.close()
            conn.close()
            
            return add_cors_headers({
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            })
        
        elif request_type == 'client_detail':
            if user['role'] not in ['lawyer', 'admin']:
                cur.close()
                conn.close()
                return add_cors_headers({
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Access denied'}),
                    'isBase64Encoded': False
                })
            
            client_id = query_params.get('client_id')
            if not client_id:
                cur.close()
                conn.close()
                return add_cors_headers({
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'client_id required'}),
                    'isBase64Encoded': False
                })
            
            cur.execute(
                "SELECT * FROM t_p52877782_legal_services_nsk.users WHERE id = %s AND role = 'client'",
                (client_id,)
            )
            client = cur.fetchone()
            
            if not client:
                cur.close()
                conn.close()
                return add_cors_headers({
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Client not found'}),
                    'isBase64Encoded': False
                })
            
            cur.execute(
                """
                SELECT 
                    c.*,
                    u.name as client_name,
                    u.email as client_email,
                    u.phone as client_phone
                FROM t_p52877782_legal_services_nsk.cases c
                LEFT JOIN t_p52877782_legal_services_nsk.users u ON c.client_id = u.id
                WHERE c.client_id = %s
                ORDER BY c.created_at DESC
                """,
                (client_id,)
            )
            cases = cur.fetchall()
            
            cur.execute(
                """
                SELECT 
                    i.*,
                    u.name as created_by_name
                FROM t_p52877782_legal_services_nsk.interactions i
                LEFT JOIN t_p52877782_legal_services_nsk.users u ON i.created_by = u.id
                WHERE i.client_id = %s
                ORDER BY i.created_at DESC
                """,
                (client_id,)
            )
            interactions = cur.fetchall()
            
            cur.execute(
                """
                SELECT 
                    COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) as total_paid,
                    COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as total_debt
                FROM t_p52877782_legal_services_nsk.payments
                WHERE client_id = %s
                """,
                (client_id,)
            )
            financial = cur.fetchone()
            
            result = {
                'id': str(client['id']),
                'name': client['name'],
                'email': client['email'],
                'phone': client['phone'],
                'created_at': client['created_at'].isoformat() if client['created_at'] else None,
                'cases': [{
                    'id': str(c['id']),
                    'title': c['title'],
                    'description': c['description'],
                    'status': c['status'],
                    'priority': c['priority'],
                    'category': c['category'],
                    'price': float(c['price']) if c['price'] else 0,
                    'progress': c['progress'] or 0,
                    'created_at': c['created_at'].isoformat() if c['created_at'] else None
                } for c in cases],
                'interactions': [{
                    'id': str(i['id']),
                    'type': i['type'],
                    'description': i['description'],
                    'created_at': i['created_at'].isoformat() if i['created_at'] else None,
                    'created_by': i.get('created_by_name', 'Юрист')
                } for i in interactions],
                'total_paid': float(financial['total_paid']) if financial else 0,
                'total_debt': float(financial['total_debt']) if financial else 0
            }
            
            cur.close()
            conn.close()
            
            return add_cors_headers({
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            })
        
        elif request_type == 'payments':
            cur.execute(
                """
                SELECT * FROM t_p52877782_legal_services_nsk.payments
                WHERE client_id = %s
                ORDER BY created_at DESC
                """,
                (user_id,)
            )
            payments = cur.fetchall()
            
            result = [{
                'id': str(p['id']),
                'amount': float(p['amount']),
                'description': p['description'],
                'status': p['status'],
                'created_at': p['created_at'].isoformat() if p['created_at'] else None
            } for p in payments]
            
            cur.close()
            conn.close()
            
            return add_cors_headers({
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            })
    
        cur.close()
        conn.close()
        
        return add_cors_headers({
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid request type'}),
            'isBase64Encoded': False
        })
    except Exception as e:
        print(f'EXCEPTION in handle_get_data: {type(e).__name__} - {str(e)}')
        return add_cors_headers({
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        })


def handle_create_client(event: Dict[str, Any], body: Dict[str, Any]) -> Dict[str, Any]:
    try:
        headers = event.get('headers', {})
        auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
        
        print(f'CREATE CLIENT REQUEST: action={body.get("action")}, name={body.get("name")}, phone={body.get("phone")}')
        
        if not auth_token:
            print('ERROR: No auth token')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            })
        
        try:
            decoded = jwt.decode(auth_token, JWT_SECRET, algorithms=['HS256'])
            user_id = decoded.get('user_id')
            print(f'Decoded JWT: user_id={user_id}')
        except jwt.ExpiredSignatureError:
            print('ERROR: Token expired')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Token expired'}),
                'isBase64Encoded': False
            })
        except Exception as jwt_err:
            print(f'ERROR: Invalid token - {str(jwt_err)}')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            })
        
        conn = psycopg2.connect(DSN)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT * FROM t_p52877782_legal_services_nsk.users WHERE id = %s AND role IN ('lawyer', 'admin')",
            (user_id,)
        )
        user = cur.fetchone()
        
        if not user:
            print(f'ERROR: User {user_id} not found or not lawyer/admin')
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Access denied'}),
                'isBase64Encoded': False
            })
        
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        email = body.get('email', '').strip()
        
        if not name or not phone:
            print(f'ERROR: Missing name or phone: name={name}, phone={phone}')
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Name and phone are required'}),
                'isBase64Encoded': False
            })
        
        cur.execute(
            "SELECT id FROM t_p52877782_legal_services_nsk.users WHERE phone = %s",
            (phone,)
        )
        existing_user = cur.fetchone()
        
        if existing_user:
            print(f'ERROR: Phone {phone} already exists')
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Клиент с таким телефоном уже существует'}),
                'isBase64Encoded': False
            })
        
        if not email:
            email = f'{phone}@temp.local'
        
        print(f'Creating client: name={name}, phone={phone}, email={email}')
        
        cur.execute(
            """
            INSERT INTO t_p52877782_legal_services_nsk.users 
            (name, phone, email, password_hash, role)
            VALUES (%s, %s, %s, 'sms_auth', 'client')
            RETURNING id, name, phone, email, created_at
            """,
            (name, phone, email)
        )
        new_client = cur.fetchone()
        conn.commit()
        
        print(f'SUCCESS: Client created with id={new_client["id"]}')
        
        cur.close()
        conn.close()
        
        return add_cors_headers({
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'client': {
                    'id': str(new_client['id']),
                    'name': new_client['name'],
                    'phone': new_client['phone'],
                    'email': new_client['email'],
                    'created_at': new_client['created_at'].isoformat() if new_client['created_at'] else None,
                    'cases_count': 0
                }
            }),
            'isBase64Encoded': False
        })
    except Exception as e:
        print(f'EXCEPTION in handle_create_client: {type(e).__name__} - {str(e)}')
        return add_cors_headers({
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        })


def handle_create_case(event: Dict[str, Any], body: Dict[str, Any]) -> Dict[str, Any]:
    try:
        headers = event.get('headers', {})
        auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
        
        print(f'CREATE CASE REQUEST: title={body.get("title")}, client_id={body.get("client_id")}')
        
        if not auth_token:
            print('ERROR: No auth token')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            })
        
        try:
            decoded = jwt.decode(auth_token, JWT_SECRET, algorithms=['HS256'])
            user_id = decoded.get('user_id')
            print(f'Decoded JWT: user_id={user_id}')
        except jwt.ExpiredSignatureError:
            print('ERROR: Token expired')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Token expired'}),
                'isBase64Encoded': False
            })
        except Exception as jwt_err:
            print(f'ERROR: Invalid token - {str(jwt_err)}')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            })
        
        conn = psycopg2.connect(DSN)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT * FROM t_p52877782_legal_services_nsk.users WHERE id = %s AND role IN ('lawyer', 'admin')",
            (user_id,)
        )
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Access denied'}),
                'isBase64Encoded': False
            })
        
        client_id = body.get('client_id')
        title = body.get('title', '')
        description = body.get('description', '')
        category = body.get('category', '')
        priority = body.get('priority', 'medium')
        price = body.get('price', 0)
        
        if not client_id or not title:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'client_id and title required'}),
                'isBase64Encoded': False
            })
        
        cur.execute(
            """
            INSERT INTO t_p52877782_legal_services_nsk.cases 
            (client_id, lawyer_id, title, description, category, priority, price, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, 'pending')
            RETURNING *
            """,
            (client_id, user_id, title, description, category, priority, price)
        )
        new_case = cur.fetchone()
        conn.commit()
        
        cur.execute(
            "SELECT phone FROM t_p52877782_legal_services_nsk.users WHERE id = %s",
            (client_id,)
        )
        client = cur.fetchone()
        
        if client and client['phone']:
            whatsapp_msg = f"""📋 *Новое дело создано*

Тема: {title}
Описание: {description}
Категория: {category}
Статус: В ожидании

Ваш юрист свяжется с вами в ближайшее время."""
            
            send_whatsapp(client['phone'], whatsapp_msg)
            
            cur.execute(
                """
                INSERT INTO t_p52877782_legal_services_nsk.whatsapp_notifications
                (case_id, client_id, message, notification_type)
                VALUES (%s, %s, %s, 'case_created')
                """,
                (new_case['id'], client_id, whatsapp_msg)
            )
            conn.commit()
        
        print(f'SUCCESS: Case created with id={new_case["id"]}')
        
        cur.close()
        conn.close()
        
        return add_cors_headers({
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'id': str(new_case['id']), 'message': 'Case created'}),
            'isBase64Encoded': False
        })
    except Exception as e:
        print(f'EXCEPTION in handle_create_case: {type(e).__name__} - {str(e)}')
        return add_cors_headers({
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        })


def handle_delete(event: Dict[str, Any]) -> Dict[str, Any]:
    """Удаление записей из различных таблиц"""
    try:
        headers = event.get('headers', {})
        auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
        params = event.get('queryStringParameters', {})
        table = params.get('table', '').replace("'", "''")
        record_id = params.get('id', '').replace("'", "''")
        
        print(f'DELETE REQUEST: table={table}, id={record_id}')
        
        if not auth_token or not table or not record_id:
            print(f'ERROR: Missing params - token={bool(auth_token)}, table={table}, id={record_id}')
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Missing parameters'}),
                'isBase64Encoded': False
            })
        
        try:
            decoded = jwt.decode(auth_token, JWT_SECRET, algorithms=['HS256'])
            user_id = decoded.get('user_id')
            print(f'Decoded JWT: user_id={user_id}')
        except jwt.ExpiredSignatureError:
            print('ERROR: Token expired')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Token expired'}),
                'isBase64Encoded': False
            })
        except Exception as jwt_err:
            print(f'ERROR: Invalid token - {str(jwt_err)}')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            })
        
        conn = psycopg2.connect(DSN)
        conn.autocommit = True
        cur = conn.cursor()
        
        cur.execute(
            "SELECT role FROM t_p52877782_legal_services_nsk.users WHERE id = %s",
            (user_id,)
        )
        row = cur.fetchone()
        if not row or row[0] not in ['admin', 'lawyer']:
            print(f'ERROR: Access denied for user {user_id}')
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            })
        
        allowed_tables = ['cases', 'users', 'blog_posts', 'blog_comments', 'auth_codes', 'payments', 'whatsapp_notifications']
        if table not in allowed_tables:
            print(f'ERROR: Invalid table {table}')
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid table'}),
                'isBase64Encoded': False
            })
        
        if table == 'users':
            cur.execute(f"DELETE FROM t_p52877782_legal_services_nsk.whatsapp_notifications WHERE client_id = '{record_id}'")
            cur.execute(f"DELETE FROM t_p52877782_legal_services_nsk.payments WHERE client_id = '{record_id}'")
            cur.execute(f"DELETE FROM t_p52877782_legal_services_nsk.cases WHERE client_id = '{record_id}'")
        elif table == 'cases':
            cur.execute(f"DELETE FROM t_p52877782_legal_services_nsk.whatsapp_notifications WHERE case_id = '{record_id}'")
            cur.execute(f"DELETE FROM t_p52877782_legal_services_nsk.payments WHERE case_id = '{record_id}'")
        
        cur.execute(f"DELETE FROM t_p52877782_legal_services_nsk.{table} WHERE id = '{record_id}'")
        
        print(f'SUCCESS: Deleted {table} record {record_id}')
        
        cur.close()
        conn.close()
        
        return add_cors_headers({
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'message': 'Record deleted'}),
            'isBase64Encoded': False
        })
    except Exception as e:
        print(f'EXCEPTION in handle_delete: {type(e).__name__} - {str(e)}')
        return add_cors_headers({
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        })


def handle_update_case(event: Dict[str, Any], body: Dict[str, Any]) -> Dict[str, Any]:
    try:
        headers = event.get('headers', {})
        auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
        
        print(f'UPDATE CASE REQUEST: case_id={body.get("case_id")}')
        
        if not auth_token:
            print('ERROR: No auth token')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            })
        
        try:
            decoded = jwt.decode(auth_token, JWT_SECRET, algorithms=['HS256'])
            user_id = decoded.get('user_id')
            print(f'Decoded JWT: user_id={user_id}')
        except jwt.ExpiredSignatureError:
            print('ERROR: Token expired')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Token expired'}),
                'isBase64Encoded': False
            })
        except Exception as jwt_err:
            print(f'ERROR: Invalid token - {str(jwt_err)}')
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            })
        
        conn = psycopg2.connect(DSN)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT * FROM t_p52877782_legal_services_nsk.users WHERE id = %s AND role IN ('lawyer', 'admin')",
            (user_id,)
        )
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Access denied'}),
                'isBase64Encoded': False
            })
        
        case_id = body.get('case_id')
        
        if not case_id:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'case_id required'}),
                'isBase64Encoded': False
            })
        
        cur.execute(
            """
            SELECT c.*, u.phone as client_phone 
            FROM t_p52877782_legal_services_nsk.cases c
            LEFT JOIN t_p52877782_legal_services_nsk.users u ON c.client_id = u.id
            WHERE c.id = %s
            """,
            (case_id,)
        )
        old_case = cur.fetchone()
        
        if not old_case:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Case not found'}),
                'isBase64Encoded': False
            })
        
        updates = []
        params = []
        
        for field in ['title', 'description', 'status', 'priority', 'category', 'progress']:
            if field in body:
                updates.append(f"{field} = %s")
                params.append(body[field])
        
        if 'price' in body:
            updates.append("price = %s")
            params.append(float(body['price']))
        
        hearing_date_changed = False
        if 'hearing_date' in body:
            updates.append("hearing_date = %s")
            params.append(body['hearing_date'] if body['hearing_date'] else None)
            hearing_date_changed = True
        
        result_changed = False
        if 'hearing_result' in body:
            updates.append("hearing_result = %s")
            params.append(body['hearing_result'])
            result_changed = True
        
        if 'next_hearing_date' in body:
            updates.append("next_hearing_date = %s")
            params.append(body['next_hearing_date'] if body['next_hearing_date'] else None)
        
        if not updates:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'No fields to update'}),
                'isBase64Encoded': False
            })
        
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(case_id)
        
        query = f"""
            UPDATE t_p52877782_legal_services_nsk.cases 
            SET {', '.join(updates)}
            WHERE id = %s
            RETURNING *
        """
        
        cur.execute(query, params)
        updated_case = cur.fetchone()
        conn.commit()
        
        if old_case['client_phone'] and (hearing_date_changed or result_changed):
            messages = []
            
            if hearing_date_changed and body.get('hearing_date'):
                hearing_dt = datetime.fromisoformat(body['hearing_date'].replace('Z', '+00:00'))
                formatted_date = hearing_dt.strftime('%d.%m.%Y в %H:%M')
                messages.append(f"📅 *Назначено заседание*\n\nДело: {old_case['title']}\nДата: {formatted_date}")
            
            if result_changed and body.get('hearing_result'):
                messages.append(f"✅ *Обновлён результат*\n\nДело: {old_case['title']}\nРезультат: {body['hearing_result']}")
            
            for msg in messages:
                send_whatsapp(old_case['client_phone'], msg)
                
                cur.execute(
                    """
                    INSERT INTO t_p52877782_legal_services_nsk.whatsapp_notifications
                    (case_id, client_id, message, notification_type)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (case_id, old_case['client_id'], msg, 'hearing_update' if hearing_date_changed else 'result_update')
                )
            
            conn.commit()
        
        cur.close()
        conn.close()
        
        return add_cors_headers({
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Case updated', 'id': str(updated_case['id'])}),
            'isBase64Encoded': False
        })
    except Exception as e:
        print(f'EXCEPTION in handle_update_case: {type(e).__name__} - {str(e)}')
        return add_cors_headers({
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        })


def handle_login(body: Dict[str, Any]) -> Dict[str, Any]:
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    
    if not email or not password:
        return add_cors_headers({
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Email и пароль обязательны'}),
            'isBase64Encoded': False
        })
    
    conn = psycopg2.connect(DSN)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(
        "SELECT id, email, password_hash, name, role, phone, created_at FROM t_p52877782_legal_services_nsk.users WHERE email = %s",
        (email,)
    )
    user = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if not user:
        return add_cors_headers({
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Неверный email или пароль'}),
            'isBase64Encoded': False
        })
    
    if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return add_cors_headers({
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Неверный email или пароль'}),
            'isBase64Encoded': False
        })
    
    token = str(uuid.uuid4())
    
    conn2 = psycopg2.connect(DSN)
    cursor2 = conn2.cursor()
    cursor2.execute(f"UPDATE t_p52877782_legal_services_nsk.users SET auth_token = '{token}' WHERE id = '{user['id']}'")
    conn2.commit()
    cursor2.close()
    conn2.close()
    
    return add_cors_headers({
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'token': token,
            'user': {
                'id': str(user['id']),
                'email': user['email'],
                'name': user['name'],
                'role': user['role'],
                'phone': user.get('phone'),
                'created_at': user['created_at'].isoformat() if user.get('created_at') else None
            }
        }),
        'isBase64Encoded': False
    })


def handle_register(body: Dict[str, Any]) -> Dict[str, Any]:
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    name = body.get('name', '').strip()
    role = body.get('role', 'client')
    
    if not email or not password or not name:
        return add_cors_headers({
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Все поля обязательны'}),
            'isBase64Encoded': False
        })
    
    if len(password) < 6:
        return add_cors_headers({
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'}),
            'isBase64Encoded': False
        })
    
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
        return add_cors_headers({
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Пользователь с таким email уже существует'}),
            'isBase64Encoded': False
        })
    
    user_id = str(uuid.uuid4())
    
    cursor.execute(
        """
        INSERT INTO t_p52877782_legal_services_nsk.users (id, email, password_hash, name, role)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id, email, name, role, created_at
        """,
        (user_id, email, password_hash, name, role)
    )
    
    new_user = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    token = str(new_user['id'])
    
    return add_cors_headers({
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'token': token,
            'user': {
                'id': str(new_user['id']),
                'email': new_user['email'],
                'name': new_user['name'],
                'role': new_user['role'],
                'created_at': new_user['created_at'].isoformat() if new_user.get('created_at') else None
            }
        }),
        'isBase64Encoded': False
    })


def handle_add_interaction(event: Dict[str, Any], body: Dict[str, Any]) -> Dict[str, Any]:
    try:
        headers = event.get('headers', {})
        auth_token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
        
        if not auth_token:
            return add_cors_headers({
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            })
        
        try:
            decoded = jwt.decode(auth_token, JWT_SECRET, algorithms=['HS256'])
            user_id = decoded.get('user_id')
        except:
            user_id = auth_token.split(':')[0] if ':' in auth_token else auth_token
        
        conn = psycopg2.connect(DSN)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT * FROM t_p52877782_legal_services_nsk.users WHERE id = %s",
            (user_id,)
        )
        user = cur.fetchone()
        
        if not user or user['role'] not in ['lawyer', 'admin']:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Access denied'}),
                'isBase64Encoded': False
            })
        
        client_id = body.get('client_id')
        interaction_type = body.get('type', 'note')
        description = body.get('description', '').strip()
        
        if not client_id or not description:
            cur.close()
            conn.close()
            return add_cors_headers({
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'client_id and description required'}),
                'isBase64Encoded': False
            })
        
        cur.execute(
            """
            INSERT INTO t_p52877782_legal_services_nsk.interactions 
            (client_id, type, description, created_by)
            VALUES (%s, %s, %s, %s)
            RETURNING id, created_at
            """,
            (client_id, interaction_type, description, user_id)
        )
        new_interaction = cur.fetchone()
        conn.commit()
        
        cur.close()
        conn.close()
        
        return add_cors_headers({
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'id': str(new_interaction['id']),
                'created_at': new_interaction['created_at'].isoformat() if new_interaction['created_at'] else None
            }),
            'isBase64Encoded': False
        })
    except Exception as e:
        print(f'EXCEPTION in handle_add_interaction: {type(e).__name__} - {str(e)}')
        return add_cors_headers({
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        })


def handle_verify(event: Dict[str, Any]) -> Dict[str, Any]:
    token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token', '')
    
    if not token:
        return add_cors_headers({
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Токен не предоставлен'}),
            'isBase64Encoded': False
        })
    
    user_id = token.split(':')[0] if ':' in token else token
    
    conn = psycopg2.connect(DSN)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(
        "SELECT id, email, name, role, phone, created_at FROM t_p52877782_legal_services_nsk.users WHERE id = %s",
        (user_id,)
    )
    user = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if not user:
        return add_cors_headers({
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Неверный токен'}),
            'isBase64Encoded': False
        })
    
    return add_cors_headers({
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'user': {
                'id': str(user['id']),
                'email': user['email'],
                'name': user['name'],
                'role': user['role'],
                'phone': user.get('phone'),
                'created_at': user['created_at'].isoformat() if user.get('created_at') else None
            }
        }),
        'isBase64Encoded': False
    })