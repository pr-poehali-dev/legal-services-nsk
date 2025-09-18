-- Создание администратора с полными правами
INSERT INTO users (email, password_hash, name, phone, role) VALUES 
('vituartem6397@yandex.ru', '$2b$10$dummy.hash.for.admin.password', 'Главный администратор', '+79994523500', 'admin')
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  role = 'admin',
  updated_at = CURRENT_TIMESTAMP;