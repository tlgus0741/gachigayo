import React from 'react';
import './Policy.scss'; // Policy.css 대신 Policy.scss 임포트

const TermsOfService = () => {
  return (
    <div className="main-content-wrapper">
        <div className="policy-container">
        <h1>Terms of Service</h1>
        <p><strong>1. Purpose</strong><br />The purpose of these terms and conditions is to stipulate the conditions and procedures for using the study abroad consultation service provided by Gachigayo Korea (hereinafter referred to as 'the Company').</p>
        <p><strong>2. Service Content</strong><br />The Company provides consultation and information related to studying abroad in Korea for foreigners.<br />Consultations are conducted by appointment and can be held via KakaoTalk, Instagram, or Facebook, as chosen by the user.</p>
        <p><strong>3. Fees and Payment</strong><br />The consultation service is fee-based, and payment is processed through PayPal.<br />The service will be provided after payment is completed.</p>
        <p><strong>4. Booking and Cancellation</strong><br />Bookings are made for pre-arranged times, and users can cancel their bookings.<br />A full refund is possible only if cancellation is requested at least 7 days before the scheduled consultation.</p>
        <p><strong>5. Limitation of Liability</strong><br />The Company is not responsible for the results of information provided through consultation, as its application is at the user's discretion.</p>
        <p><strong>6. Amendment of Terms</strong><br />The Company may amend these terms and conditions without prior notice, and the amended terms shall become effective upon announcement.</p>
        </div>
    </div>
  );
};

export default TermsOfService; 