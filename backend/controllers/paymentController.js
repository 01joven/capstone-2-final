const pool = require('../config/db');

const getUserPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, r.visitor_name, r.reservation_date, m.name as memorial_name
       FROM payments p
       JOIN reservations r ON p.reservation_id = r.id
       JOIN memorials m ON r.memorial_id = m.id
       WHERE r.user_id = $1
       ORDER BY p.transaction_date DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const createPayment = async (req, res) => {
  try {
    const { reservation_id } = req.body;

    if (!reservation_id) {
      return res.status(400).json({ message: 'Reservation ID is required.' });
    }

    const reservation = await pool.query(
      'SELECT * FROM reservations WHERE id = $1 AND user_id = $2',
      [reservation_id, req.user.id]
    );

    if (reservation.rows.length === 0) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    const result = await pool.query(
      `INSERT INTO payments (reservation_id, amount, payment_status)
       VALUES ($1, $2, 'completed')
       RETURNING *`,
      [reservation_id, reservation.rows[0].total_price]
    );

    await pool.query("UPDATE reservations SET status = 'confirmed' WHERE id = $1", [reservation_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getUserPayments, createPayment };
