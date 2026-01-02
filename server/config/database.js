const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database tables if they don't exist
const initializeDatabase = async () => {
  try {
    // Check if membership_plans table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'membership_plans'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('Creating membership_plans table...');

      // Create the table
      await pool.query(`
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
      `);

      // Insert default plans
      await pool.query(`
        INSERT INTO membership_plans (name, price, duration_months, features, color, is_active) VALUES
        ('Gold', 2999, 3, ARRAY['View 50 Profiles', 'Send 25 Interests', 'Chat Support'], 'from-yellow-400 to-yellow-600', true),
        ('Platinum', 4999, 6, ARRAY['View 150 Profiles', 'Send 75 Interests', 'Priority Support', 'Profile Highlight'], 'from-gray-300 to-gray-500', true),
        ('Premium', 7999, 12, ARRAY['Unlimited Profiles', 'Unlimited Interests', '24/7 Support', 'Verified Badge', 'Featured Profile'], 'from-purple-400 to-purple-600', true)
        ON CONFLICT (name) DO NOTHING;
      `);

      console.log('membership_plans table created successfully');
    }
  } catch (error) {
    console.error('Database initialization error:', error.message);
  }
};

// Run initialization
initializeDatabase();

module.exports = pool;
