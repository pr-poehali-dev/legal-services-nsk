"""
Business: Система аутентификации пользователей с хешированием паролей
Args: event с httpMethod, body, queryStringParameters; context с request_id
Returns: HTTP response с токеном или ошибкой
"""

import json
import os
import bcrypt
import jwt
import psycopg2
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
from pydantic import BaseModel, ValidationError, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    phone: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    phone: Optional[str] = None
    role: str
    token: str


def get_db_connection():
    """Создает подключение к базе данных"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise Exception('DATABASE_URL not found in environment')
    return psycopg2.connect(database_url)


def hash_password(password: str) -> str:
    """Хеширует пароль с помощью bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password: str, password_hash: str) -> bool:
    """Проверяет пароль против хеша"""
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def generate_jwt_token(user_data: Dict[str, Any]) -> str:
    """Генерирует JWT токен для пользователя"""
    payload = {
        'user_id': user_data['id'],
        'email': user_data['email'],
        'role': user_data['role'],
        'exp': datetime.utcnow() + timedelta(days=7)  # Токен действует 7 дней
    }
    # Используем простой секрет для JWT (в продакшене должен быть в переменных окружения)
    secret = os.environ.get('JWT_SECRET', 'default-jwt-secret-change-in-production')
    return jwt.encode(payload, secret, algorithm='HS256')


def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    """Аутентификация пользователя по email и паролю"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT id, email, password_hash, name, phone, role FROM users WHERE email = %s AND is_active = true",
                (email,)
            )
            user = cursor.fetchone()
            
            if not user:
                return None
                
            if verify_password(password, user[2]):  # user[2] - password_hash
                return {
                    'id': str(user[0]),
                    'email': user[1],
                    'name': user[3],
                    'phone': user[4],
                    'role': user[5]
                }
            return None
    finally:
        conn.close()


def create_user(email: str, password: str, name: str, phone: str) -> Dict[str, Any]:
    """Создает нового пользователя"""
    conn = get_db_connection()
    try:
        password_hash = hash_password(password)
        
        with conn.cursor() as cursor:
            cursor.execute(
                """INSERT INTO users (email, password_hash, name, phone, role) 
                   VALUES (%s, %s, %s, %s, 'client') 
                   RETURNING id, email, name, phone, role""",
                (email, password_hash, name, phone)
            )
            user = cursor.fetchone()
            conn.commit()
            
            return {
                'id': str(user[0]),
                'email': user[1],
                'name': user[2],
                'phone': user[3],
                'role': user[4]
            }
    finally:
        conn.close()


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS headers для всех ответов
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'login':
                # Аутентификация пользователя
                login_data = LoginRequest(**body_data)
                user = authenticate_user(login_data.email, login_data.password)
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': headers,
                        'body': json.dumps({'error': 'Неверный email или пароль'})
                    }
                
                token = generate_jwt_token(user)
                response = UserResponse(
                    id=user['id'],
                    email=user['email'],
                    name=user['name'],
                    phone=user['phone'],
                    role=user['role'],
                    token=token
                )
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps(response.dict())
                }
            
            elif action == 'register':
                # Регистрация нового пользователя
                register_data = RegisterRequest(**body_data)
                
                # Проверяем, что пользователь с таким email не существует
                conn = get_db_connection()
                try:
                    with conn.cursor() as cursor:
                        cursor.execute("SELECT id FROM users WHERE email = %s", (register_data.email,))
                        if cursor.fetchone():
                            return {
                                'statusCode': 400,
                                'headers': headers,
                                'body': json.dumps({'error': 'Пользователь с таким email уже существует'})
                            }
                finally:
                    conn.close()
                
                # Создаем пользователя
                user = create_user(
                    register_data.email,
                    register_data.password,
                    register_data.name,
                    register_data.phone
                )
                
                token = generate_jwt_token(user)
                response = UserResponse(
                    id=user['id'],
                    email=user['email'],
                    name=user['name'],
                    phone=user['phone'],
                    role=user['role'],
                    token=token
                )
                
                return {
                    'statusCode': 201,
                    'headers': headers,
                    'body': json.dumps(response.dict())
                }
            
            else:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Неизвестное действие'})
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