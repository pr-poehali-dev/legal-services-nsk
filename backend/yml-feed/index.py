import json
import os
from typing import Dict, Any
from datetime import datetime
import xml.etree.ElementTree as ET

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Генерация YML фида для Яндекс.Услуги (Исполнители)
    Args: event - dict с httpMethod
          context - object с attributes: request_id
    Returns: XML YML feed для категории Юристы/Адвокаты
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    site_url = 'https://юридический-сервис.рф'
    company_name = 'Юридический сервис'
    
    yml_catalog = ET.Element('yml_catalog', date=datetime.utcnow().strftime('%Y-%m-%d %H:%M'))
    shop = ET.SubElement(yml_catalog, 'shop')
    
    ET.SubElement(shop, 'name').text = company_name
    ET.SubElement(shop, 'company').text = company_name
    ET.SubElement(shop, 'url').text = site_url
    
    currencies = ET.SubElement(shop, 'currencies')
    ET.SubElement(currencies, 'currency', id='RUR', rate='1')
    
    categories = ET.SubElement(shop, 'categories')
    ET.SubElement(categories, 'category', id='1').text = 'Юридические услуги'
    ET.SubElement(categories, 'category', id='2', parentId='1').text = 'Гражданское право'
    ET.SubElement(categories, 'category', id='3', parentId='1').text = 'Уголовное право'
    ET.SubElement(categories, 'category', id='4', parentId='1').text = 'Семейное право'
    ET.SubElement(categories, 'category', id='5', parentId='1').text = 'Корпоративное право'
    ET.SubElement(categories, 'category', id='6', parentId='1').text = 'Земельное право'
    
    offers = ET.SubElement(shop, 'offers')
    
    services = [
        {
            'id': '1',
            'name': 'Консультация юриста',
            'category_id': '1',
            'price': '2000',
            'description': 'Профессиональная юридическая консультация по любым правовым вопросам. Анализ ситуации, разъяснение законодательства, рекомендации по дальнейшим действиям.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '2',
            'name': 'Представительство в суде',
            'category_id': '2',
            'price': '15000',
            'description': 'Защита ваших интересов в судах всех инстанций. Подготовка процессуальных документов, участие в заседаниях, ведение дела под ключ.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '3',
            'name': 'Составление исков и жалоб',
            'category_id': '2',
            'price': '5000',
            'description': 'Профессиональная подготовка исковых заявлений, апелляционных и кассационных жалоб с учетом актуальной судебной практики.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '4',
            'name': 'Защита по уголовным делам',
            'category_id': '3',
            'price': '30000',
            'description': 'Квалифицированная защита подозреваемых и обвиняемых на всех стадиях уголовного процесса. Участие в следственных действиях и судебных заседаниях.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '5',
            'name': 'Раздел имущества при разводе',
            'category_id': '4',
            'price': '20000',
            'description': 'Юридическое сопровождение раздела совместно нажитого имущества супругов. Оценка имущества, подготовка соглашений, судебное представительство.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '6',
            'name': 'Взыскание алиментов',
            'category_id': '4',
            'price': '8000',
            'description': 'Помощь в взыскании алиментов на содержание детей и нетрудоспособных членов семьи. Подготовка документов, судебное взыскание.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '7',
            'name': 'Регистрация ООО',
            'category_id': '5',
            'price': '12000',
            'description': 'Полное юридическое сопровождение регистрации общества с ограниченной ответственностью. Подготовка документов, подача в ФНС, получение ОГРН.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '8',
            'name': 'Договорное право',
            'category_id': '5',
            'price': '7000',
            'description': 'Подготовка и экспертиза договоров любой сложности. Защита интересов при заключении сделок, минимизация рисков.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '9',
            'name': 'Оформление земельных участков',
            'category_id': '6',
            'price': '15000',
            'description': 'Юридическое сопровождение сделок с землей, оформление прав на землю, межевание, решение земельных споров.',
            'url': f'{site_url}/#services'
        },
        {
            'id': '10',
            'name': 'Абонентское обслуживание',
            'category_id': '1',
            'price': '25000',
            'description': 'Комплексное юридическое обслуживание бизнеса. Консультации, подготовка документов, представительство в органах власти.',
            'url': f'{site_url}/#services'
        }
    ]
    
    for service in services:
        offer = ET.SubElement(offers, 'offer', id=service['id'], type='service', available='true')
        
        ET.SubElement(offer, 'name').text = service['name']
        ET.SubElement(offer, 'url').text = service['url']
        ET.SubElement(offer, 'price').text = service['price']
        ET.SubElement(offer, 'currencyId').text = 'RUR'
        ET.SubElement(offer, 'categoryId').text = service['category_id']
        ET.SubElement(offer, 'description').text = service['description']
        
        ET.SubElement(offer, 'sales_notes').text = 'Первая консультация бесплатно'
        
        ET.SubElement(offer, 'param', name='Опыт работы').text = 'Более 10 лет'
        ET.SubElement(offer, 'param', name='Регион').text = 'Вся Россия'
        ET.SubElement(offer, 'param', name='Формат').text = 'Онлайн и офлайн'
    
    xml_string = ET.tostring(yml_catalog, encoding='utf-8', method='xml')
    xml_declaration = b'<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE yml_catalog SYSTEM "shops.dtd">\n'
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600'
        },
        'body': (xml_declaration + xml_string).decode('utf-8'),
        'isBase64Encoded': False
    }
