import json
import os
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для панели юриста/администратора
    Args: event с httpMethod, headers, queryStringParameters, body
    Returns: Список дел и клиентов для юриста, назначение на дела
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
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
        
        if not user_row or (user_row[1] != 'lawyer' and user_row[1] != 'admin'):
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Доступ запрещён'})
            }
        
        params = event.get('queryStringParameters', {}) or {}
        data_type = params.get('type', 'cases')
        
        if data_type == 'cases':
            cur.execute('''
                SELECT c.id, c.title, c.description, c.status, c.priority, 
                       c.category, c.price, c.progress, c.created_at,
                       u.name as client_name, u.email as client_email, u.phone as client_phone
                FROM t_p52877782_legal_services_nsk.cases c
                LEFT JOIN t_p52877782_legal_services_nsk.users u ON c.client_id = u.id
                ORDER BY c.created_at DESC
            ''')
            
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
                    'client_name': row[9],
                    'client_email': row[10],
                    'client_phone': row[11]
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(cases)
            }
        
        elif data_type == 'clients':
            cur.execute('''
                SELECT u.id, u.name, u.email, u.phone, u.created_at,
                       COUNT(c.id) as cases_count
                FROM t_p52877782_legal_services_nsk.users u
                LEFT JOIN t_p52877782_legal_services_nsk.cases c ON u.id = c.client_id
                WHERE u.role = 'client'
                GROUP BY u.id, u.name, u.email, u.phone, u.created_at
                ORDER BY u.created_at DESC
            ''')
            
            rows = cur.fetchall()
            clients = []
            for row in rows:
                clients.append({
                    'id': str(row[0]),
                    'name': row[1],
                    'email': row[2],
                    'phone': row[3],
                    'created_at': row[4].isoformat() if row[4] else '',
                    'cases_count': row[5] or 0
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(clients),
                'isBase64Encoded': False
            }
    
    elif method == 'PUT':
        import psycopg2
        
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'DATABASE_URL не настроен'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        cur.execute("SELECT id, role FROM t_p52877782_legal_services_nsk.users WHERE id::text = %s", (token,))
        user_row = cur.fetchone()
        
        if not user_row or (user_row[1] != 'lawyer' and user_row[1] != 'admin'):
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Доступ запрещён'}),
                'isBase64Encoded': False
            }
        
        lawyer_id = user_row[0]
        body_data = json.loads(event.get('body', '{}'))
        
        case_id = body_data.get('case_id')
        action = body_data.get('action')
        
        if not case_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'case_id обязателен'}),
                'isBase64Encoded': False
            }
        
        if action == 'assign':
            cur.execute(
                """
                UPDATE t_p52877782_legal_services_nsk.cases 
                SET lawyer_id = %s, status = 'in_progress', updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING id, title, status
                """,
                (lawyer_id, case_id)
            )
            
            updated_case = cur.fetchone()
            
            if not updated_case:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Дело не найдено'}),
                    'isBase64Encoded': False
                }
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': str(updated_case[0]),
                    'title': updated_case[1],
                    'status': updated_case[2],
                    'message': 'Вы назначены на это дело'
                }),
                'isBase64Encoded': False
            }
        
        elif action == 'update_status':
            new_status = body_data.get('status')
            new_progress = body_data.get('progress')
            
            fields = ['updated_at = CURRENT_TIMESTAMP']
            values = []
            
            if new_status:
                fields.append('status = %s')
                values.append(new_status)
            
            if new_progress is not None:
                fields.append('progress = %s')
                values.append(new_progress)
            
            values.append(case_id)
            
            cur.execute(
                f"UPDATE t_p52877782_legal_services_nsk.cases SET {', '.join(fields)} WHERE id = %s RETURNING id, status, progress",
                tuple(values)
            )
            
            updated_case = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': str(updated_case[0]),
                    'status': updated_case[1],
                    'progress': updated_case[2]
                }),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неизвестное действие'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }