const pool = require('../config/db');

const getSavedItems = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.id as saved_id, s.created_at, m.*
       FROM saved_items s
       JOIN memorials m ON s.memorial_id = m.id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get saved items error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const addSavedItem = async (req, res) => {
  try {
    const { memorial_id } = req.body;

    if (!memorial_id) {
      return res.status(400).json({ message: 'Memorial ID is required.' });
    }

    const result = await pool.query(
      'INSERT INTO saved_items (user_id, memorial_id) VALUES ($1, $2) RETURNING *',
      [req.user.id, memorial_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Already saved.' });
    }
    console.error('Add saved item error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const removeSavedItem = async (req, res) => {
  try {
    await pool.query('DELETE FROM saved_items WHERE id = $1 AND user_id = $2', [
      req.params.id,
      req.user.id,
    ]);

    res.json({ message: 'Removed from saved.' });
  } catch (error) {
    console.error('Remove saved item error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getSavedItems, addSavedItem, removeSavedItem };
