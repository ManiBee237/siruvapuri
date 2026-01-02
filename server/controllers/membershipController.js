const db = require('../config/database');

// Get all membership plans
const getMembershipPlans = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM membership_plans ORDER BY price ASC'
    );

    res.json({
      success: true,
      plans: result.rows
    });
  } catch (error) {
    console.error('Get membership plans error:', error);
    res.status(500).json({ error: 'Failed to fetch membership plans' });
  }
};

// Create a new membership plan
const createMembershipPlan = async (req, res) => {
  try {
    const { name, price, duration_months, features, color } = req.body;

    // Check if plan with same name exists
    const existingPlan = await db.query(
      'SELECT id FROM membership_plans WHERE LOWER(name) = LOWER($1)',
      [name]
    );

    if (existingPlan.rows.length > 0) {
      return res.status(400).json({ error: 'A plan with this name already exists' });
    }

    const result = await db.query(
      `INSERT INTO membership_plans (name, price, duration_months, features, color, is_active)
       VALUES ($1, $2, $3, $4, $5, true)
       RETURNING *`,
      [name, price, duration_months, features || [], color || 'from-gray-400 to-gray-600']
    );

    res.json({
      success: true,
      message: 'Membership plan created successfully',
      plan: result.rows[0]
    });
  } catch (error) {
    console.error('Create membership plan error:', error);
    res.status(500).json({ error: 'Failed to create membership plan' });
  }
};

// Update a membership plan
const updateMembershipPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { name, price, duration_months, features, color } = req.body;

    // Check if plan exists
    const existingPlan = await db.query(
      'SELECT id FROM membership_plans WHERE id = $1',
      [planId]
    );

    if (existingPlan.rows.length === 0) {
      return res.status(404).json({ error: 'Membership plan not found' });
    }

    // Check if another plan with same name exists
    const duplicateName = await db.query(
      'SELECT id FROM membership_plans WHERE LOWER(name) = LOWER($1) AND id != $2',
      [name, planId]
    );

    if (duplicateName.rows.length > 0) {
      return res.status(400).json({ error: 'A plan with this name already exists' });
    }

    const result = await db.query(
      `UPDATE membership_plans SET
        name = $1,
        price = $2,
        duration_months = $3,
        features = $4,
        color = $5,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [name, price, duration_months, features || [], color, planId]
    );

    res.json({
      success: true,
      message: 'Membership plan updated successfully',
      plan: result.rows[0]
    });
  } catch (error) {
    console.error('Update membership plan error:', error);
    res.status(500).json({ error: 'Failed to update membership plan' });
  }
};

// Toggle plan active status
const toggleMembershipPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const result = await db.query(
      `UPDATE membership_plans SET
        is_active = NOT is_active,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [planId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Membership plan not found' });
    }

    res.json({
      success: true,
      message: `Plan ${result.rows[0].is_active ? 'activated' : 'deactivated'} successfully`,
      plan: result.rows[0]
    });
  } catch (error) {
    console.error('Toggle membership plan error:', error);
    res.status(500).json({ error: 'Failed to toggle membership plan' });
  }
};

// Delete a membership plan
const deleteMembershipPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const result = await db.query(
      'DELETE FROM membership_plans WHERE id = $1 RETURNING *',
      [planId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Membership plan not found' });
    }

    res.json({
      success: true,
      message: 'Membership plan deleted successfully'
    });
  } catch (error) {
    console.error('Delete membership plan error:', error);
    res.status(500).json({ error: 'Failed to delete membership plan' });
  }
};

module.exports = {
  getMembershipPlans,
  createMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
  toggleMembershipPlan
};
