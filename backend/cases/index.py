import json
import psycopg2
import os
from datetime import datetime
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: CRUD operations for case management (admin/lawyer only)
    Args: event with httpMethod, body, pathParams, headers
          context with request_id attribute
    Returns: JSON response with cases data or error
    '''
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
        
        if method == 'GET':
            # Get all cases with client names
            cur.execute("""
                SELECT c.id, c.title, c.description, c.status, c.priority, 
                       c.created_at, c.updated_at, c.price, c.progress, 
                       c.category, c.notes, u.name as client_name, u.id as client_id
                FROM cases c
                JOIN users u ON c.user_id = u.id
                ORDER BY c.created_at DESC
            """)
            
            cases = []
            for row in cur.fetchall():
                cases.append({
                    'id': str(row[0]),
                    'title': row[1],
                    'description': row[2],
                    'status': row[3],
                    'priority': row[4],
                    'createdAt': row[5].isoformat() if row[5] else None,
                    'updatedAt': row[6].isoformat() if row[6] else None,
                    'price': row[7],
                    'progress': row[8],
                    'category': row[9],
                    'notes': row[10],
                    'client': row[11],
                    'clientId': str(row[12])
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'cases': cases})
            }
        
        elif method == 'POST':
            # Create new case
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute("""
                INSERT INTO cases (title, description, status, priority, user_id, price, progress, category, notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body_data.get('title'),
                body_data.get('description'),
                body_data.get('status', 'pending'),
                body_data.get('priority', 'medium'),
                body_data.get('clientId'),
                body_data.get('price', 0),
                body_data.get('progress', 0),
                body_data.get('category', ''),
                body_data.get('notes', '')
            ))
            
            case_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'id': str(case_id), 'message': 'Case created successfully'})
            }
        
        elif method == 'PUT':
            # Update case
            path_params = event.get('pathParams', {})
            case_id = path_params.get('id')
            
            if not case_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Case ID is required'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            # Build update query dynamically
            update_fields = []
            update_values = []
            
            if 'title' in body_data:
                update_fields.append('title = %s')
                update_values.append(body_data['title'])
            if 'description' in body_data:
                update_fields.append('description = %s')
                update_values.append(body_data['description'])
            if 'status' in body_data:
                update_fields.append('status = %s')
                update_values.append(body_data['status'])
            if 'priority' in body_data:
                update_fields.append('priority = %s')
                update_values.append(body_data['priority'])
            if 'price' in body_data:
                update_fields.append('price = %s')
                update_values.append(body_data['price'])
            if 'progress' in body_data:
                update_fields.append('progress = %s')
                update_values.append(body_data['progress'])
            if 'category' in body_data:
                update_fields.append('category = %s')
                update_values.append(body_data['category'])
            if 'notes' in body_data:
                update_fields.append('notes = %s')
                update_values.append(body_data['notes'])
            
            update_fields.append('updated_at = CURRENT_TIMESTAMP')
            update_values.append(case_id)
            
            query = f"UPDATE cases SET {', '.join(update_fields)} WHERE id = %s"
            cur.execute(query, update_values)
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Case updated successfully'})
            }
        
        elif method == 'DELETE':
            # Delete case
            path_params = event.get('pathParams', {})
            case_id = path_params.get('id')
            
            if not case_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Case ID is required'})
                }
            
            cur.execute("DELETE FROM cases WHERE id = %s", (case_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Case deleted successfully'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
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