-- Create sms_codes table for storing verification codes
CREATE TABLE IF NOT EXISTS sms_codes (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for sms_codes
CREATE INDEX IF NOT EXISTS idx_sms_codes_phone_code ON sms_codes(phone, code);
CREATE INDEX IF NOT EXISTS idx_sms_codes_expires ON sms_codes(expires_at);

-- Create index on users phone
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
