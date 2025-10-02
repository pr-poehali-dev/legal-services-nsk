-- Добавляем поле phone в таблицу users
ALTER TABLE t_p52877782_legal_services_nsk.users 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Создаем таблицу cases (дела/обращения)
CREATE TABLE IF NOT EXISTS t_p52877782_legal_services_nsk.cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES t_p52877782_legal_services_nsk.users(id),
    lawyer_id UUID REFERENCES t_p52877782_legal_services_nsk.users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'new',
    priority VARCHAR(20) DEFAULT 'medium',
    category VARCHAR(100),
    price DECIMAL(10, 2) DEFAULT 0,
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем таблицу payments (платежи)
CREATE TABLE IF NOT EXISTS t_p52877782_legal_services_nsk.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES t_p52877782_legal_services_nsk.users(id),
    case_id UUID REFERENCES t_p52877782_legal_services_nsk.cases(id),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индексы для производительности
CREATE INDEX IF NOT EXISTS idx_cases_client_id ON t_p52877782_legal_services_nsk.cases(client_id);
CREATE INDEX IF NOT EXISTS idx_cases_lawyer_id ON t_p52877782_legal_services_nsk.cases(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON t_p52877782_legal_services_nsk.payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_case_id ON t_p52877782_legal_services_nsk.payments(case_id);