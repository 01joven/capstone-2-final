const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, profile_image_url, onboarding_completed, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const reservations = await pool.query(
      'SELECT COUNT(*) FROM reservations WHERE user_id = $1',
      [req.user.id]
    );

    const saved = await pool.query(
      'SELECT COUNT(*) FROM saved_items WHERE user_id = $1',
      [req.user.id]
    );

    res.json({
      ...result.rows[0],
      stats: {
        reservations: parseInt(reservations.rows[0].count),
        saved: parseInt(saved.rows[0].count),
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (email) {
      updates.push(`email = $${paramCount++}`);
      values.push(email);
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      updates.push(`password_hash = $${paramCount++}`);
      values.push(passwordHash);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update.' });
    }

    values.push(req.user.id);
    const result = await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, name, email, profile_image_url`,
      values
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const completeOnboarding = async (req, res) => {
  try {
    await pool.query('UPDATE users SET onboarding_completed = TRUE WHERE id = $1', [req.user.id]);
    res.json({ message: 'Onboarding completed.' });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getProfile, updateProfile, completeOnboarding };
