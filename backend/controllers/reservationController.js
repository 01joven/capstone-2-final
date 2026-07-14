const pool = require('../config/db');

const getUserReservations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, m.name as memorial_name, m.image_url as memorial_image
       FROM reservations r
       JOIN memorials m ON r.memorial_id = m.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get reservations error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const createReservation = async (req, res) => {
  try {
    const { memorial_id, visitor_name, contact, reservation_date } = req.body;

    if (!memorial_id || !visitor_name || !contact || !reservation_date) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const memorial = await pool.query('SELECT price FROM memorials WHERE id = $1', [memorial_id]);
    if (memorial.rows.length === 0) {
      return res.status(404).json({ message: 'Memorial not found.' });
    }

    const totalPrice = memorial.rows[0].price;

    const result = await pool.query(
      `INSERT INTO reservations (user_id, memorial_id, visitor_name, contact, reservation_date, total_price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, memorial_id, visitor_name, contact, reservation_date, totalPrice]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getUserReservations, createReservation };
