-- Создание таблицы взаимодействий с клиентами
CREATE TABLE IF NOT EXISTS t_p52877782_legal_services_nsk.interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES t_p52877782_legal_services_nsk.users(id),
    type VARCHAR(50) NOT NULL CHECK (type IN ('call', 'email', 'meeting', 'note')),
    description TEXT NOT NULL,
    created_by UUID REFERENCES t_p52877782_legal_services_nsk.users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_interactions_client_id ON t_p52877782_legal_services_nsk.interactions(client_id);
CREATE INDEX IF NOT EXISTS idx_interactions_created_at ON t_p52877782_legal_services_nsk.interactions(created_at DESC);
