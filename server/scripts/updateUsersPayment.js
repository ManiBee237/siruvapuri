const pool = require('../config/database');

async function updatePaymentStatus() {
  try {
    const result = await pool.query(
      "UPDATE users SET payment_status = 'paid' WHERE is_approved = true"
    );

    console.log(`Updated ${result.rowCount} users to paid status`);
    pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error updating payment status:', error);
    pool.end();
    process.exit(1);
  }
}

updatePaymentStatus();
