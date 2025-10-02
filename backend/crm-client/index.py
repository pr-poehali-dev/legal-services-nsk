import json
import os
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для личного кабинета клиента
    Args: event с httpMethod, headers, queryStringParameters
    Returns: Список дел и платежей клиента
    '''
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
            'body': ''
        }
    
    headers = event.get('headers', {})
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'})
        }
    
    if method == 'GET':
        import psycopg2
        
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'DATABASE_URL не настроен'})
            }
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        cur.execute("SELECT id, role FROM t_p52877782_legal_services_nsk.users WHERE id::text = %s", (token,))
        user_row = cur.fetchone()
        
        if not user_row or user_row[1] != 'client':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Доступ запрещён'})
            }
        
        user_id = user_row[0]
        params = event.get('queryStringParameters', {}) or {}
        data_type = params.get('type', 'cases')
        
        if data_type == 'cases':
            cur.execute('''
                SELECT c.id, c.title, c.description, c.status, c.priority, 
                       c.category, c.price, c.progress, c.created_at,
                       u.name as lawyer_name
                FROM t_p52877782_legal_services_nsk.cases c
                LEFT JOIN t_p52877782_legal_services_nsk.users u ON c.lawyer_id = u.id
                WHERE c.client_id = %s
                ORDER BY c.created_at DESC
            ''', (user_id,))
            
            rows = cur.fetchall()
            cases = []
            for row in rows:
                cases.append({
                    'id': str(row[0]),
                    'title': row[1],
                    'description': row[2],
                    'status': row[3],
                    'priority': row[4],
                    'category': row[5],
                    'price': float(row[6]) if row[6] else 0,
                    'progress': row[7] or 0,
                    'created_at': row[8].isoformat() if row[8] else '',
                    'lawyer_name': row[9]
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(cases)
            }
        
        elif data_type == 'payments':
            cur.execute('''
                SELECT id, amount, description, status, created_at
                FROM t_p52877782_legal_services_nsk.payments
                WHERE client_id = %s
                ORDER BY created_at DESC
            ''', (user_id,))
            
            rows = cur.fetchall()
            payments = []
            for row in rows:
                payments.append({
                    'id': str(row[0]),
                    'amount': float(row[1]),
                    'description': row[2],
                    'status': row[3],
                    'created_at': row[4].isoformat() if row[4] else ''
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(payments)
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
