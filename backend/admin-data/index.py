import json
import psycopg2
import os
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all users and cases for admin dashboard with fallback data
    Args: event with httpMethod
          context with request_id attribute
    Returns: JSON response with users and cases
    '''
    method: str = event.get('httpMethod', 'GET')
    query_params = event.get('queryStringParameters') or {}
    
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
    
    # Handle different HTTP methods for case management
    
    # Fallback demo data
    demo_users = [
        {
            'id': 'demo-1',
            'email': 'demo@example.com',
            'name': 'Демо Пользователь',
            'phone': '+7 (999) 123-45-67',
            'role': 'client',
            'registeredAt': '2024-09-18T09:00:00Z',
            'totalCases': 1,
            'totalPaid': 25000,
            'isLawyer': False,
            'status': 'active'
        },
        {
            'id': 'demo-2',
            'email': 'client2@example.com', 
            'name': 'Второй Клиент',
            'phone': '+7 (999) 234-56-78',
            'role': 'client',
            'registeredAt': '2024-09-18T10:00:00Z',
            'totalCases': 0,
            'totalPaid': 0,
            'isLawyer': False,
            'status': 'active'
        }
    ]
    
    demo_cases = [
        {
            'id': 'demo-case-1',
            'title': 'Демо дело - консультация',
            'description': 'Юридическая консультация по семейному праву',
            'status': 'pending',
            'priority': 'medium',
            'createdAt': '2024-09-18T09:00:00Z',
            'updatedAt': '2024-09-18T09:00:00Z',
            'clientId': 'demo-1',
            'client': 'Демо Пользователь',
            'price': 25000,
            'progress': 30,
            'category': 'Семейное право',
            'notes': 'Требуется дополнительная документация'
        }
    ]
    
    # Handle non-GET methods first
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Дело создано (demo режим)',
                    'id': f"demo-new-{len(demo_cases) + 1}"
                })
            }
        except Exception as e:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': False, 'error': str(e)})
            }
    
    elif method == 'PUT':
        try:
            case_id = query_params.get('id')
            body_data = json.loads(event.get('body', '{}'))
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': f'Дело {case_id} обновлено (demo режим)'
                })
            }
        except Exception as e:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': False, 'error': str(e)})
            }
    
    elif method == 'DELETE':
        try:
            case_id = query_params.get('id')
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': f'Дело {case_id} удалено (demo режим)'
                })
            }
        except Exception as e:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': False, 'error': str(e)})
            }
    
    elif method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # GET method - return data
    # Try to get real data from database
    db_url = os.environ.get('DATABASE_URL')
    users = []
    cases = []
    
    if db_url:
        try:
            conn = psycopg2.connect(db_url)
            cur = conn.cursor()
            
            # Get users with case counts
            cur.execute("""
                SELECT u.id, u.email, u.name, u.phone, u.role, u.created_at,
                       COUNT(c.id) as total_cases,
                       COALESCE(SUM(CASE WHEN c.status = 'completed' THEN c.price ELSE 0 END), 0) as total_paid
                FROM users u
                LEFT JOIN cases c ON u.id = c.user_id
                GROUP BY u.id, u.email, u.name, u.phone, u.role, u.created_at
                ORDER BY u.created_at DESC
            """)
            
            for row in cur.fetchall():
                users.append({
                    'id': str(row[0]),
                    'email': row[1],
                    'name': row[2],
                    'phone': row[3] or '',
                    'role': row[4],
                    'registeredAt': row[5].isoformat() if row[5] else None,
                    'totalCases': row[6],
                    'totalPaid': float(row[7]) if row[7] else 0,
                    'isLawyer': row[4] in ['lawyer', 'admin'],
                    'status': 'active'
                })
            
            # Get cases with client names
            cur.execute("""
                SELECT c.id, c.title, c.description, c.status, c.priority,
                       c.created_at, c.updated_at, c.price, c.progress,
                       c.category, c.notes, u.name as client_name, u.id as client_id
                FROM cases c
                JOIN users u ON c.user_id = u.id
                ORDER BY c.created_at DESC
            """)
            
            for row in cur.fetchall():
                cases.append({
                    'id': str(row[0]),
                    'title': row[1],
                    'description': row[2],
                    'status': row[3],
                    'priority': row[4],
                    'createdAt': row[5].isoformat() if row[5] else None,
                    'updatedAt': row[6].isoformat() if row[6] else None,
                    'price': float(row[7]) if row[7] else 0,
                    'progress': row[8] if row[8] is not None else 0,
                    'category': row[9] or '',
                    'notes': row[10] or '',
                    'client': row[11],
                    'clientId': str(row[12])
                })
                
            conn.close()
            
        except Exception as db_error:
            # If database fails, return demo data with error info
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'users': demo_users,
                    'cases': demo_cases,
                    'demo_mode': True,
                    'db_error': str(db_error)
                })
            }
    
    # If no database URL, use demo data
    if not users and not cases:
        users = demo_users
        cases = demo_cases
        
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'users': users,
            'cases': cases,
            'demo_mode': not db_url or len(users) <= 2
        })
    }