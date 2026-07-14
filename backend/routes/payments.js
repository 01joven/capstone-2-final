const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getUserPayments, createPayment } = require('../controllers/paymentController');

const router = express.Router();

router.get('/', authMiddleware, getUserPayments);
router.post('/create', authMiddleware, createPayment);

module.exports = router;
