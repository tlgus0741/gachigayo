import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReportHistory.scss';

// Scroll-in animation wrapper
const ReportHistoryItem = ({ children, className = '' }) => {
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
    <div ref={ref} className={`report-history-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();

  // 로그인 체크 (localStorage 사용)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // 이메일 기반으로 조회 (로그인 시스템이 있다면 사용자 이메일로 필터)
        // 백엔드에서 req.user.email을 사용하므로, 더 이상 프론트에서 이메일 파라미터를 보낼 필요 없음
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/consultations`, {
          withCredentials: true // 세션 정보가 전달되도록 설정
        });
        setReports(res.data.reports || []);
      } catch (err) {
        setError('Failed to load reports.');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleCancelClick = (report) => {
    setSelectedReport(report);
    setShowCancelModal(true);
  };

  const handleCancelSubmit = async () => {
    if (!cancelReason.trim()) {
      setCancelError('Please provide a reason for cancellation');
      return;
    }

    setIsCancelling(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/consultations/cancel`, {
        consultationId: selectedReport._id,
        cancelReason: cancelReason
      });

      if (response.data.success) {
        // Update the reports list
        setReports(reports.map(report => 
          report._id === selectedReport._id 
            ? { ...report, status: 'cancelled', cancelReason, cancelDate: new Date() }
            : report
        ));
        setShowCancelModal(false);
        setCancelReason('');
        setCancelError('');
      } else {
        setCancelError(response.data.error || 'Failed to cancel consultation');
        console.error('Cancel error:', response.data.error);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to cancel consultation. Please try again.';
      setCancelError(errorMessage);
      console.error('Cancel error:', err);
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <ReportHistoryItem className="report-history-container">
      <div className="report-history-content">
        <h2 className="history-title">My Consultation History</h2>
        {reports.length === 0 ? (
          <p className="no-reports">No consultation requests found.</p>
        ) : (
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report._id} className={`report-card ${report.status === 'cancelled' ? 'cancelled' : ''}`}>
                <div className="report-header">
                  <h3>Consultation Request</h3>
                  <span className={`status ${report.status || 'pending'}`}>
                    {report.status === 'completed' ? 'Completed' : report.status === 'cancelled' ? 'Cancelled' : 'Active'}
                  </span>
                </div>
                <div className="report-details">
                  <p><strong>Date:</strong> {formatDate(report.preferredDate)}</p>
                  <p><strong>Time:</strong> {formatTime(report.preferredTime)}</p>
                  <p><strong>Platform:</strong> {report.platform}</p>
                  <p><strong>Platform ID:</strong> {report.platformId}</p>
                  {report.message && <p><strong>Message:</strong> {report.message}</p>}
                  {report.status === 'cancelled' && (
                    <>
                      <p><strong>Cancellation Reason:</strong> {report.cancelReason}</p>
                      <p><strong>Cancelled By:</strong> {report.cancelledBy === 'admin' ? 'Administrator' : 'You'}</p>
                      <p><strong>Cancelled On:</strong> {formatDate(report.cancelDate)}</p>
                    </>
                  )}
                </div>
                {report.status !== 'cancelled' && report.status !== 'completed' && (
                  <button 
                    className="cancel-btn"
                    onClick={() => handleCancelClick(report)}
                  >
                    Cancel Consultation
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {showCancelModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Cancel Consultation</h3>
              <p>Please provide a reason for cancelling your consultation:</p>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter your reason for cancellation..."
                rows="4"
              />
              {cancelError && <p className="error-message">{cancelError}</p>}
              <div className="modal-buttons">
                <button onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                  setCancelError('');
                }} disabled={isCancelling}>Close</button>
                <button onClick={handleCancelSubmit} className="confirm-cancel" disabled={isCancelling}>
                  {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ReportHistoryItem>
  );
};

export default ReportHistory; 