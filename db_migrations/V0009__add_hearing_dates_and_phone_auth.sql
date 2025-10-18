-- Добавляем поля для дат заседаний и результатов в таблицу cases
ALTER TABLE t_p52877782_legal_services_nsk.cases
ADD COLUMN hearing_date timestamp NULL,
ADD COLUMN hearing_result text NULL,
ADD COLUMN next_hearing_date timestamp NULL;

-- Создаем индекс для быстрого поиска по дате заседания
CREATE INDEX idx_cases_hearing_date ON t_p52877782_legal_services_nsk.cases(hearing_date);

-- Добавляем таблицу для одноразовых паролей (OTP)
CREATE TABLE t_p52877782_legal_services_nsk.auth_codes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    phone varchar(20) NOT NULL,
    code varchar(6) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at timestamp NOT NULL,
    used boolean DEFAULT false,
    user_id uuid NULL REFERENCES t_p52877782_legal_services_nsk.users(id)
);

-- Индекс для быстрого поиска кодов по телефону
CREATE INDEX idx_auth_codes_phone ON t_p52877782_legal_services_nsk.auth_codes(phone, expires_at);

-- Делаем поле phone уникальным в таблице users (один телефон = один клиент)
ALTER TABLE t_p52877782_legal_services_nsk.users
ADD CONSTRAINT unique_phone UNIQUE (phone);

-- Создаем таблицу для истории уведомлений в WhatsApp
CREATE TABLE t_p52877782_legal_services_nsk.whatsapp_notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id uuid NOT NULL REFERENCES t_p52877782_legal_services_nsk.cases(id),
    client_id uuid NOT NULL REFERENCES t_p52877782_legal_services_nsk.users(id),
    message text NOT NULL,
    notification_type varchar(50) NOT NULL,
    sent_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status varchar(20) DEFAULT 'sent'
);

-- Индекс для просмотра истории уведомлений по делу
CREATE INDEX idx_whatsapp_notifications_case ON t_p52877782_legal_services_nsk.whatsapp_notifications(case_id);
CREATE INDEX idx_whatsapp_notifications_client ON t_p52877782_legal_services_nsk.whatsapp_notifications(client_id);