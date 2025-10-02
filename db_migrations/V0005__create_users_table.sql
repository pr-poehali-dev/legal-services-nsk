CREATE TABLE IF NOT EXISTS t_p52877782_legal_services_nsk.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'lawyer', 'client')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON t_p52877782_legal_services_nsk.users(email);
CREATE INDEX idx_users_role ON t_p52877782_legal_services_nsk.users(role);

INSERT INTO t_p52877782_legal_services_nsk.users (email, password_hash, name, role) 
VALUES ('admin@legal.ru', '$2b$10$rKZLvJ9jXqF5Y8ZxQ0XvJOHxVzW5gM2qN1P3RtYuWsVzXcBnMjKLe', 'Администратор', 'admin')
ON CONFLICT (email) DO NOTHING;