-- Add auth_token field to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_token VARCHAR(255);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_users_auth_token ON users(auth_token);
