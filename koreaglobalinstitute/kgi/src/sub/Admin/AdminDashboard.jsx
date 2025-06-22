import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCompleting, setIsCompleting] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/'); // 관리자가 아니면 홈으로 리다이렉트
      return;
    }

    const fetchAllConsultations = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/consultations', {
          withCredentials: true
        });
        setConsultations(response.data.reports || []);
      } catch (err) {
        setError('Failed to load consultations.');
        console.error('Admin Dashboard Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllConsultations();
  }, [navigate]);

  const handleRowClick = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailModal(true);
  };

  const handleCancelClick = (consultation, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setSelectedConsultation(consultation);
    setShowCancelModal(true);
    setCancelReason('');
    setCancelError('');
  };

  const handleCompleteClick = async (consultationId, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsCompleting(prev => ({ ...prev, [consultationId]: true }));
    try {
      const response = await axios.post('http://localhost:1000/api/consultations/complete', 
        { consultationId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setConsultations(prevConsultations =>
          prevConsultations.map(consultation =>
            consultation._id === consultationId ? { ...consultation, status: 'completed' } : consultation
          )
        );
      } else {
        alert('Failed to complete consultation: ' + (response.data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error completing consultation.');
      console.error('Complete Consultation Error:', err);
    } finally {
      setIsCompleting(prev => ({ ...prev, [consultationId]: false }));
    }
  };

  const handleCancelSubmit = async () => {
    if (!cancelReason.trim()) {
      setCancelError('Please provide a reason for cancellation');
      return;
    }
    if (!selectedConsultation) {
      setCancelError('No consultation selected for cancellation.');
      return;
    }

    setIsCancelling(true);
    setCancelError('');

    try {
      const response = await axios.post('http://localhost:1000/api/consultations/cancel', {
        consultationId: selectedConsultation._id,
        cancelReason: cancelReason,
        cancelledByAdmin: true
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setConsultations(prevConsultations =>
          prevConsultations.map(consultation =>
            consultation._id === selectedConsultation._id 
              ? { ...consultation, status: 'cancelled', cancelReason, cancelDate: new Date(), cancelledBy: 'admin' }
              : consultation
          )
        );
        setShowCancelModal(false);
        alert('Consultation cancelled and refunded successfully.');
      } else {
        setCancelError(response.data.error || 'Failed to cancel consultation.');
        console.error('Admin Cancel error:', response.data.error);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to cancel consultation. Please try again.';
      setCancelError(errorMessage);
      console.error('Admin Cancel error:', err);
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 페이지네이션 관련 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(consultations.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading Admin Dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard - All Consultations</h2>
      {consultations.length === 0 ? (
        <p className="no-consultations">No consultations found.</p>
      ) : (
        <>
          <div className="consultations-table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Account Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Platform</th>
                  <th>Payment Status</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((consultation) => (
                  <tr 
                    key={consultation._id} 
                    className={`status-${consultation.status || 'pending'} clickable-row`}
                    onClick={() => handleRowClick(consultation)}
                  >
                    <td>{consultation._id.substring(0, 8)}...</td>
                    <td>{consultation.name}</td>
                    <td>{consultation.email}</td>
                    <td>{consultation.userAccountEmail || 'N/A'}</td>
                    <td>{formatDate(consultation.preferredDate)}</td>
                    <td>{formatTime(consultation.preferredTime)}</td>
                    <td>{consultation.platform}</td>
                    <td>{consultation.paymentStatus || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${consultation.status || 'pending'}`}>
                        {consultation.status ? consultation.status.toUpperCase() : 'PENDING'}
                      </span>
                    </td>
                    <td className="consultation-actions">
                      {consultation.status !== 'completed' && consultation.status !== 'cancelled' && (
                        <button 
                          className="action-btn complete-btn"
                          onClick={(e) => handleCompleteClick(consultation._id, e)}
                          disabled={isCompleting[consultation._id]}
                        >
                          {isCompleting[consultation._id] ? 'Completing...' : 'Complete'}
                        </button>
                      )}
                      {consultation.status !== 'cancelled' && (
                        <button 
                          className="action-btn cancel-btn"
                          onClick={(e) => handleCancelClick(consultation, e)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination()}
        </>
      )}

      {showDetailModal && selectedConsultation && (
        <div className="modal-overlay">
          <div className="modal-content detail-modal">
            <h3>Consultation Details</h3>
            <div className="detail-content">
              <div className="detail-row">
                <strong>Name:</strong> {selectedConsultation.name}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {selectedConsultation.email}
              </div>
              <div className="detail-row">
                <strong>Account Email:</strong> {selectedConsultation.userAccountEmail || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Date:</strong> {formatDate(selectedConsultation.preferredDate)}
              </div>
              <div className="detail-row">
                <strong>Time:</strong> {formatTime(selectedConsultation.preferredTime)}
              </div>
              <div className="detail-row">
                <strong>Platform:</strong> {selectedConsultation.platform}
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span className={`status-badge status-${selectedConsultation.status || 'pending'}`}>
                  {selectedConsultation.status ? selectedConsultation.status.toUpperCase() : 'PENDING'}
                </span>
              </div>
              <div className="detail-row">
                <strong>Payment Status:</strong> {selectedConsultation.paymentStatus || 'N/A'}
              </div>
              <div className="detail-row message-content">
                <strong>Message:</strong>
                <div className="message-text">
                  {selectedConsultation.message || 'No message provided'}
                </div>
              </div>
              <div className="detail-row">
                <strong>Attached File:</strong> {selectedConsultation.fileName || 'No file attached'}
              </div>
            </div>
            <button onClick={() => setShowDetailModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}

      {showCancelModal && selectedConsultation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cancel Consultation</h3>
            <p>Are you sure you want to cancel the consultation for {selectedConsultation.name} on {formatDate(selectedConsultation.preferredDate)}?</p>
            <div className="form-group">
              <label htmlFor="cancelReason">Reason for Cancellation:</label>
              <textarea
                id="cancelReason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows="4"
                placeholder="Enter reason for cancellation (required)"
              />
              {cancelError && <div className="error-message">{cancelError}</div>}
            </div>
            <div className="modal-actions">
              <button 
                onClick={handleCancelSubmit} 
                disabled={isCancelling}
                className="action-btn cancel-btn"
              >
                {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
              <button onClick={() => setShowCancelModal(false)} className="action-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 