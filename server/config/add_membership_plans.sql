-- Migration: Add membership_plans table
-- Run this script if membership_plans table doesn't exist

-- Create Membership Plans table
CREATE TABLE IF NOT EXISTS membership_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  features TEXT[] DEFAULT '{}',
  color VARCHAR(100) DEFAULT 'from-gray-400 to-gray-600',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default membership plans (only if table is empty)
INSERT INTO membership_plans (name, price, duration_months, features, color, is_active)
SELECT 'Gold', 2999, 3, ARRAY['View 50 Profiles', 'Send 25 Interests', 'Chat Support'], 'from-yellow-400 to-yellow-600', true
WHERE NOT EXISTS (SELECT 1 FROM membership_plans WHERE name = 'Gold');

INSERT INTO membership_plans (name, price, duration_months, features, color, is_active)
SELECT 'Platinum', 4999, 6, ARRAY['View 150 Profiles', 'Send 75 Interests', 'Priority Support', 'Profile Highlight'], 'from-gray-300 to-gray-500', true
WHERE NOT EXISTS (SELECT 1 FROM membership_plans WHERE name = 'Platinum');

INSERT INTO membership_plans (name, price, duration_months, features, color, is_active)
SELECT 'Premium', 7999, 12, ARRAY['Unlimited Profiles', 'Unlimited Interests', '24/7 Support', 'Verified Badge', 'Featured Profile'], 'from-purple-400 to-purple-600', true
WHERE NOT EXISTS (SELECT 1 FROM membership_plans WHERE name = 'Premium');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_membership_plans_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_membership_plans_updated_at ON membership_plans;
CREATE TRIGGER update_membership_plans_updated_at BEFORE UPDATE ON membership_plans
    FOR EACH ROW EXECUTE FUNCTION update_membership_plans_updated_at();
