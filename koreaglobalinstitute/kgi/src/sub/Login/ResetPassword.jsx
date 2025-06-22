import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ResetPassword.scss';

// Scroll-in animation wrapper
const ResetPasswordItem = ({ children, className = '' }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reset-password-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 1단계: 이메일로 인증코드 발송
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError(''); 
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:1000/api/send-reset-code', { email });
      if (res.data.success) {
        setMessage('Verification code sent to your email.');
        setStep(2);
      } else {
        setError(res.data.message || 'Failed to send code.');
      }
    } catch (err) {
      setError('Failed to send code.');
    } finally {
      setLoading(false);
    }
  };

  // 2단계: 인증코드 확인 및 비밀번호 재설정
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(''); 
    setMessage('');
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post('http://localhost:1000/api/reset-password', {
        email, code, newPassword
      });
      if (res.data.success) {
        setMessage('Password has been reset. You can now log in.');
        setStep(3);
      } else {
        setError(res.data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordItem className="reset-password-container">
      <div className="reset-password-card">
        <h2>Reset Password</h2>
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <label>Verification Code</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} required />
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            <label>Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
          </form>
        )}
        {step === 3 && (
          <div>
            <div className="success-message">Password reset complete!</div>
            <a href="/login" className="login-link">Go to Login</a>
          </div>
        )}
      </div>
    </ResetPasswordItem>
  );
};

export default ResetPassword; 