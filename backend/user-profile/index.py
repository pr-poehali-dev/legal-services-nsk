"""
Business: Управление профилем пользователя и личными данными
Args: event с httpMethod, body, headers; context с request_id
Returns: HTTP response с данными профиля или результатом операции
"""

import json
import os
import jwt
import psycopg2
from typing import Dict, Any, Optional
from pydantic import BaseModel, ValidationError, EmailStr


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None


class ProfileResponse(BaseModel):
    id: str
    email: str
    name: str
    phone: Optional[str] = None
    role: str
    created_at: str
    is_active: bool


def get_db_connection():
    """Создает подключение к базе данных"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise Exception('DATABASE_URL not found in environment')
    return psycopg2.connect(database_url)


def verify_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """Проверяет JWT токен и возвращает данные пользователя"""
    try:
        secret = os.environ.get('JWT_SECRET', 'default-jwt-secret-change-in-production')
        payload = jwt.decode(token, secret, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def get_user_profile(user_id: str) -> Optional[Dict[str, Any]]:
    """Получает профиль пользователя по ID"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """SELECT id, email, name, phone, role, created_at, is_active 
                   FROM users WHERE id = %s""",
                (user_id,)
            )
            user = cursor.fetchone()
            
            if not user:
                return None
                
            return {
                'id': str(user[0]),
                'email': user[1],
                'name': user[2],
                'phone': user[3],
                'role': user[4],
                'created_at': user[5].isoformat(),
                'is_active': user[6]
            }
    finally:
        conn.close()


def update_user_profile(user_id: str, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Обновляет профиль пользователя"""
    conn = get_db_connection()
    try:
        # Формируем динамический запрос обновления
        update_fields = []
        values = []
        
        if 'name' in update_data and update_data['name']:
            update_fields.append('name = %s')
            values.append(update_data['name'])
            
        if 'phone' in update_data and update_data['phone']:
            update_fields.append('phone = %s')
            values.append(update_data['phone'])
        
        if not update_fields:
            # Нет полей для обновления, возвращаем текущий профиль
            return get_user_profile(user_id)
        
        values.append(user_id)  # Добавляем user_id для WHERE условия
        
        with conn.cursor() as cursor:
            query = f"""
                UPDATE users 
                SET {', '.join(update_fields)}, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING id, email, name, phone, role, created_at, is_active
            """
            cursor.execute(query, values)
            updated_user = cursor.fetchone()
            conn.commit()
            
            if not updated_user:
                return None
                
            return {
                'id': str(updated_user[0]),
                'email': updated_user[1],
                'name': updated_user[2],
                'phone': updated_user[3],
                'role': updated_user[4],
                'created_at': updated_user[5].isoformat(),
                'is_active': updated_user[6]
            }
    finally:
        conn.close()


def get_user_cases(user_id: str, role: str) -> list:
    """Получает дела пользователя в зависимости от роли"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            if role == 'client':
                # Клиент видит только свои дела
                cursor.execute(
                    """SELECT c.id, c.title, c.description, c.status, c.priority, 
                              c.category, c.price, c.progress, c.created_at, c.updated_at,
                              u.name as lawyer_name
                       FROM cases c 
                       LEFT JOIN users u ON c.lawyer_id = u.id
                       WHERE c.client_id = %s 
                       ORDER BY c.created_at DESC""",
                    (user_id,)
                )
            elif role in ['lawyer', 'admin']:
                # Юрист и админ видят все дела
                cursor.execute(
                    """SELECT c.id, c.title, c.description, c.status, c.priority, 
                              c.category, c.price, c.progress, c.created_at, c.updated_at,
                              u1.name as client_name, u2.name as lawyer_name
                       FROM cases c 
                       LEFT JOIN users u1 ON c.client_id = u1.id
                       LEFT JOIN users u2 ON c.lawyer_id = u2.id
                       ORDER BY c.created_at DESC"""
                )
            else:
                return []
            
            cases = cursor.fetchall()
            result = []
            
            for case in cases:
                case_data = {
                    'id': str(case[0]),
                    'title': case[1],
                    'description': case[2],
                    'status': case[3],
                    'priority': case[4],
                    'category': case[5],
                    'price': float(case[6]) if case[6] else 0,
                    'progress': case[7],
                    'created_at': case[8].isoformat(),
                    'updated_at': case[9].isoformat()
                }
                
                if role == 'client':
                    case_data['lawyer_name'] = case[10]
                else:
                    case_data['client_name'] = case[10]
                    case_data['lawyer_name'] = case[11]
                
                result.append(case_data)
            
            return result
    finally:
        conn.close()


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS headers для всех ответов
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    }
    
    # Обработка CORS preflight запроса
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Проверяем авторизацию
        auth_header = event.get('headers', {}).get('Authorization') or event.get('headers', {}).get('authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({'error': 'Токен авторизации отсутствует'})
            }
        
        token = auth_header.split(' ')[1]
        user_data = verify_jwt_token(token)
        
        if not user_data:
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({'error': 'Недействительный токен авторизации'})
            }
        
        user_id = user_data['user_id']
        user_role = user_data['role']
        
        if method == 'GET':
            # Получение профиля пользователя
            query_params = event.get('queryStringParameters') or {}
            include_cases = query_params.get('include_cases') == 'true'
            
            profile = get_user_profile(user_id)
            if not profile:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
            
            response_data = profile
            
            # Добавляем дела если запрошены
            if include_cases:
                cases = get_user_cases(user_id, user_role)
                response_data['cases'] = cases
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(response_data)
            }
        
        elif method == 'PUT':
            # Обновление профиля пользователя
            body_data = json.loads(event.get('body', '{}'))
            update_data = UpdateProfileRequest(**body_data)
            
            updated_profile = update_user_profile(user_id, update_data.dict(exclude_unset=True))
            
            if not updated_profile:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(updated_profile)
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({'error': 'Метод не поддерживается'})
            }
    
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Ошибка валидации данных', 'details': str(e)})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Внутренняя ошибка сервера', 'details': str(e)})
        }