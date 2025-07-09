import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import './Payment.scss';

// PayPal 설정
const initialOptions = {
  "client-id": "ATo2wPm8KSTlbGNB1zrM_ZAE6g5zZGtH1_PrbY1hTWFTMyKUDw1Kwa7ODQH74YikUD9YNGP0Mahyvpn3",
  currency: "USD",
  intent: "capture"
};

const Payment = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const consultationData = JSON.parse(sessionStorage.getItem('consultationData') || '{}');
  const discountAmount = consultationData.discountAmount || 0;

  const platformNames = {
    kakao: 'KakaoTalk',
    instagram: 'Instagram',
    facebook: 'Facebook'
  };

  useEffect(() => {
    const data = sessionStorage.getItem('consultationData');
    if (!data) {
      navigate('/report');
      return;
    }
  }, [navigate]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (36 - discountAmount).toFixed(2), // 할인된 금액 반영
            currency_code: "USD"
          },
          description: "Consultation Service"
        }
      ]
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const captureId = details.purchase_units?.[0]?.payments?.captures?.[0]?.id;
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/consultations`, {
        ...consultationData,
        paymentStatus: 'completed',
        paymentId: details.id,
        captureId: captureId,
        amount: 36 - discountAmount,
        paymentDetails: details
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        sessionStorage.removeItem('consultationData');
        navigate('/payment-success');
      } else {
        setError('Failed to save consultation data. Please contact support.');
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      console.error('Payment error:', err);
    }
  };

  const onError = (err) => {
    setError('Payment failed. Please try again.');
    console.error('PayPal error:', err);
  };

  if (!consultationData) {
    return null;
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment Details</h2>
        
        <div className="consultation-summary">
          <h3>Consultation Summary</h3>
          <div className="summary-item">
            <span>Name:</span>
            <span>{consultationData.name}</span>
          </div>
          <div className="summary-item">
            <span>Email:</span>
            <span>{consultationData.email}</span>
          </div>
          <div className="summary-item">
            <span>Platform:</span>
            <span>{platformNames[consultationData.platform]}</span>
          </div>
          {consultationData.platformId && (
            <div className="summary-item">
              <span>Platform ID:</span>
              <span>{consultationData.platformId}</span>
            </div>
          )}
          <div className="summary-item">
            <span>Preferred Date:</span>
            <span>{consultationData.preferredDate}</span>
          </div>
          {consultationData.fileName && (
            <div className="summary-item">
              <span>Attached File:</span>
              <span>{consultationData.fileName}</span>
            </div>
          )}
        </div>

        <div className="payment-amount">
          <h3>Amount to Pay</h3>
          <p className="amount">${36 - discountAmount}</p>
          {discountAmount > 0 && (
            <p className="discount-info">Original Price: $36 (50% discount applied)</p>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="paypal-container">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Payment;