import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { paymentAPI, reservationAPI } from '../services/api';
import './Payments.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [pendingReservation, setPendingReservation] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    paymentAPI.getAll().then(({ data }) => setPayments(data));

    const reservationId = searchParams.get('reservation');
    if (reservationId) {
      reservationAPI.getUserReservations().then(({ data }) => {
        const found = data.find((r) => r.id === parseInt(reservationId));
        if (found && found.status === 'pending') {
          setPendingReservation(found);
        }
      });
    }
  }, [searchParams]);

  const handlePay = async () => {
    await paymentAPI.create(pendingReservation.id);
    setPendingReservation(null);
    paymentAPI.getAll().then(({ data }) => setPayments(data));
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">Payments</h1>

        {pendingReservation && (
          <div className="payment-checkout card">
            <h3>Complete Payment</h3>
            <p>Memorial: <strong>{pendingReservation.memorial_name}</strong></p>
            <p>Date: {new Date(pendingReservation.reservation_date).toLocaleDateString()}</p>
            <p className="payment-amount">
              Amount: ₱{parseFloat(pendingReservation.total_price).toLocaleString()}
            </p>
            <button className="btn btn-primary" onClick={handlePay}>Pay Now</button>
          </div>
        )}

        <h2 className="section-title">Payment History</h2>
        {payments.length === 0 ? (
          <p style={{ color: 'var(--text-light)' }}>No payments yet.</p>
        ) : (
          <div className="payments-list">
            {payments.map((p) => (
              <div key={p.id} className="payment-item card">
                <div>
                  <h3>{p.memorial_name}</h3>
                  <p>Visitor: {p.visitor_name}</p>
                  <p>Date: {new Date(p.transaction_date).toLocaleDateString()}</p>
                </div>
                <div className="payment-item-right">
                  <p className="payment-amount">₱{parseFloat(p.amount).toLocaleString()}</p>
                  <span className={`badge badge-${p.payment_status}`}>{p.payment_status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Payments;
