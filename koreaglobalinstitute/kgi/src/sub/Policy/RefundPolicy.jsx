import React from 'react';
import './Policy.scss'; // Policy.css 대신 Policy.scss 임포트

const RefundPolicy = () => {
  return (
    <div className="main-content-wrapper">
      <div className="policy-container">
        <h1>Refund Policy</h1>
        <p><strong>1. General Principles</strong><br />After payment for the consultation service, a full refund will be issued if a cancellation request is made at least 24 hours before the scheduled consultation.</p>
        <p><strong>2. Non-Refundable Cases</strong><br />No refunds will be issued for cancellations made within 24 hours of the scheduled consultation or after the consultation has been completed.</p>
        <p><strong>3. Additional Consultation Discount Policy</strong><br />If you apply for another consultation within 6 months after your first consultation, you can receive the service at a 50% discounted price.</p>
        <p><strong>4. Refund Procedure</strong><br />Refunds are processed via PayPal and are typically completed within 3~5 business days of the request.</p>
        <p><strong>5. Inquiries</strong><br />For refund-related inquiries, please contact koreaglobalinstitute@gmail.com.</p>
      </div>
    </div>
  );
};

export default RefundPolicy; 