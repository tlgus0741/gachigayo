import React from 'react';
import './Policy.scss'; // Policy.css 스타일 파일 사용

const PrivacyPolicy = () => {
  return (
    <div className="main-content-wrapper">
      <div className="policy-container" >
        <h1>Privacy Policy</h1>
        <p><strong>1. Collected Information</strong><br />- Required: Nationality, Email, ID, Password, Name<br />- During Consultation Booking: Appointment Date/Time, Consultation Method, Attached Files<br />- Email address for sending email notifications during service use</p>
        <p><strong>2. Purpose of Collection</strong><br />- User registration and identification<br />- Sending notifications for consultation bookings, changes, and completion<br />- User verification for paid services</p>
        <p><strong>3. Retention Period</strong><br />Data is stored for 1 year after service withdrawal, and then immediately destroyed.</p>
        <p><strong>4. Third-Party Provision</strong><br />The Company does not provide personal information to third parties without the user's consent.</p>
        <p><strong>5. User Rights</strong><br />Users can request to view, modify, or delete their personal information.</p>
        <p><strong>6. Inquiries</strong><br />For personal information inquiries, please contact koreaglobalinstitute@gmail.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 