'''
Business: SMS authentication - send code and verify
Args: event - dict with httpMethod (POST), body (action: "send" or "verify", phone, code)
      context - object with attributes: request_id, function_name
Returns: HTTP response with token or success status
'''

import json
import random
import string
import os
from typing import Dict, Any
from datetime import datetime, timedelta
import psycopg2
import jwt

def generate_code() -> str:
    """Generate 6-digit verification code"""
    return ''.join(random.choices(string.digits, k=6))

def send_sms(phone: str, code: str) -> bool:
    """Send SMS using sms.ru API"""
    import urllib.request
    import urllib.parse
    
    api_key = os.environ.get('SMSRU_API_KEY')
    if not api_key:
        return False
    
    # Clean phone number
    phone_clean = ''.join(filter(str.isdigit, phone))
    
    message = f'Ваш код для входа: {code}\nЮридическая консультация'
    
    params = {
        'api_id': api_key,
        'to': phone_clean,
        'msg': message,
        'json': 1
    }
    
    url = 'https://sms.ru/sms/send?' + urllib.parse.urlencode(params)
    
    try:
        with urllib.request.urlopen(url) as response:
            result = json.loads(response.read().decode())
            return result.get('status') == 'OK'
    except Exception:
        return False

def save_code_to_db(phone: str, code: str) -> bool:
    """Save verification code to database"""
    try:
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return False
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        phone_escaped = phone.replace("'", "''")
        code_escaped = code.replace("'", "''")
        
        # Delete old codes
        cur.execute(f"DELETE FROM sms_codes WHERE phone = '{phone_escaped}'")
        
        # Insert new code (expires in 5 minutes)
        expiry = (datetime.now() + timedelta(minutes=5)).strftime('%Y-%m-%d %H:%M:%S')
        cur.execute(f"""
            INSERT INTO sms_codes (phone, code, expires_at, created_at)
            VALUES ('{phone_escaped}', '{code_escaped}', '{expiry}', NOW())
        """)
        
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception:
        return False

def verify_code(phone: str, code: str) -> bool:
    """Verify code from database"""
    try:
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return False
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        phone_escaped = phone.replace("'", "''")
        code_escaped = code.replace("'", "''")
        
        # Check if code valid
        cur.execute(f"""
            SELECT code FROM sms_codes 
            WHERE phone = '{phone_escaped}' AND code = '{code_escaped}' AND expires_at > NOW()
            ORDER BY created_at DESC LIMIT 1
        """)
        
        result = cur.fetchone()
        
        # Delete used code
        if result:
            cur.execute(f"DELETE FROM sms_codes WHERE phone = '{phone_escaped}' AND code = '{code_escaped}'")
            conn.commit()
        
        cur.close()
        conn.close()
        
        return result is not None
    except Exception:
        return False

def get_or_create_user(phone: str) -> Dict[str, Any]:
    """Get existing user or create new one"""
    try:
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return None
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        phone_escaped = phone.replace("'", "''")
        
        # Find existing user
        cur.execute(f"""
            SELECT id, phone, name, role, created_at 
            FROM users WHERE phone = '{phone_escaped}'
        """)
        
        user = cur.fetchone()
        
        if user:
            user_data = {
                'id': str(user[0]),
                'phone': user[1],
                'name': user[2],
                'role': user[3],
                'created_at': user[4].isoformat() if user[4] else None
            }
        else:
            # Create new user (email required, use phone-based placeholder)
            email_placeholder = phone.replace('+', '').replace(' ', '') + '@sms-user.local'
            email_escaped = email_placeholder.replace("'", "''")
            
            cur.execute(f"""
                INSERT INTO users (phone, name, role, email, password_hash, created_at)
                VALUES ('{phone_escaped}', 'Клиент', 'client', '{email_escaped}', 'sms-auth', NOW())
                RETURNING id, phone, name, role, created_at
            """)
            
            new_user = cur.fetchone()
            conn.commit()
            
            user_data = {
                'id': str(new_user[0]),
                'phone': new_user[1],
                'name': new_user[2],
                'role': new_user[3],
                'created_at': new_user[4].isoformat() if new_user[4] else None
            }
        
        cur.close()
        conn.close()
        
        return user_data
    except Exception:
        return None

def generate_jwt(user_data: Dict[str, Any]) -> str:
    """Generate JWT token"""
    jwt_secret = os.environ.get('JWT_SECRET', 'default-secret')
    
    payload = {
        'user_id': user_data['id'],
        'phone': user_data['phone'],
        'role': user_data['role'],
        'exp': datetime.utcnow() + timedelta(days=30)
    }
    
    return jwt.encode(payload, jwt_secret, algorithm='HS256')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    # Handle CORS OPTIONS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Parse request
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', '').strip()
    phone = body_data.get('phone', '').strip()
    
    if not phone:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Phone is required'}),
            'isBase64Encoded': False
        }
    
    # Action: send code
    if action == 'send':
        code = generate_code()
        
        if not save_code_to_db(phone, code):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Failed to save code'}),
                'isBase64Encoded': False
            }
        
        sms_sent = send_sms(phone, code)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'sms_sent': sms_sent,
                'message': 'Code sent' if sms_sent else 'Code saved'
            }),
            'isBase64Encoded': False
        }
    
    # Action: verify code
    elif action == 'verify':
        code = body_data.get('code', '').strip()
        
        if not code:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Code is required'}),
                'isBase64Encoded': False
            }
        
        if not verify_code(phone, code):
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid or expired code'}),
                'isBase64Encoded': False
            }
        
        user_data = get_or_create_user(phone)
        if not user_data:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Failed to get user'}),
                'isBase64Encoded': False
            }
        
        token = generate_jwt(user_data)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'token': token,
                'user': user_data
            }),
            'isBase64Encoded': False
        }
    
    else:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid action. Use "send" or "verify"'}),
            'isBase64Encoded': False
        }