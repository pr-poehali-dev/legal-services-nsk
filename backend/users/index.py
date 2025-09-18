import json
import psycopg2
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all users for admin dashboard
    Args: event with httpMethod
          context with request_id attribute  
    Returns: JSON response with users list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Get database connection
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database URL not configured'})
        }
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        # Get all users with case counts
        cur.execute("""
            SELECT u.id, u.email, u.name, u.phone, u.role, u.created_at,
                   COUNT(c.id) as total_cases,
                   COALESCE(SUM(CASE WHEN c.status = 'completed' THEN c.price ELSE 0 END), 0) as total_paid
            FROM users u
            LEFT JOIN cases c ON u.id = c.user_id
            GROUP BY u.id, u.email, u.name, u.phone, u.role, u.created_at
            ORDER BY u.created_at DESC
        """)
        
        users = []
        for row in cur.fetchall():
            users.append({
                'id': str(row[0]),
                'email': row[1],
                'name': row[2],
                'phone': row[3] or '',
                'role': row[4],
                'registeredAt': row[5].isoformat() if row[5] else None,
                'totalCases': row[6],
                'totalPaid': row[7],
                'isLawyer': row[4] in ['lawyer', 'admin'],
                'status': 'active'
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'users': users})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if 'conn' in locals():
            conn.close()