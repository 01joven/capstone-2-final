const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const memorialRoutes = require('./routes/memorials');
const reservationRoutes = require('./routes/reservations');
const favoriteRoutes = require('./routes/favorites');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Memorial Map API is running' });
});

app.get('/api/health/db', async (req, res) => {
  const url = process.env.DATABASE_URL || '';
  try {
    const result = await pool.query('SELECT COUNT(*)::int AS count FROM users');
    res.json({
      status: 'ok',
      users: result.rows[0].count,
      dbHost: url.replace(/\/\/[^@]*@/, '//***@').split('?')[0],
      hasJwtSecret: Boolean(process.env.JWT_SECRET),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      code: error.code,
      dbHost: url ? url.replace(/\/\/[^@]*@/, '//***@').split('?')[0] : '(DATABASE_URL not set)',
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/memorials', memorialRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
