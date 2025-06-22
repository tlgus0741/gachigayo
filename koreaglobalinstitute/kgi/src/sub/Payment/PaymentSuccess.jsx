import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.scss';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <h2>Payment Completed!</h2>
        <p>Your consultation request and payment have been successfully processed.</p>
        <div className="success-btn-group">
          <button className="success-btn" onClick={() => navigate('/')}>Go to Home</button>
          <button className="success-btn outline" onClick={() => navigate('/report-history')}>View My Reports</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 