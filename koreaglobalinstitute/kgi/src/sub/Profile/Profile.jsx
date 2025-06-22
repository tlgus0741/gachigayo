import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  padding: 8rem 0;
`;

const ProfileItem = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2.8rem;
  background: white;
  border-radius: 10px;
  text-align: center;
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &.delete {
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  }
  
  &.cancel {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    try {
      const email = localStorage.getItem('userEmail');
      const res = await axios.post('http://localhost:1000/api/change-password', {
        email,
        currentPassword,
        newPassword
      });
      if (res.data.success) {
        setMessage('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(res.data.message || 'Failed to change password.');
      }
    } catch (err) {
      setError('Failed to change password due to server error.');
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeleting(true);
    setError('');
    setMessage('');

    try {
      const email = localStorage.getItem('userEmail');
      const res = await axios.post('http://localhost:1000/api/delete-account', {
        email
      });
      
      if (res.data.success) {
        // 로컬 스토리지 정리
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('rememberedEmail');
        
        setMessage('Account deleted successfully.');
        navigate('/login');
      } else {
        setError(res.data.message || 'Failed to delete account.');
      }
    } catch (err) {
      setError('Failed to delete account due to server error.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  return (
    <ProfileWrapper>
    <ProfileItem className="profile-container">
        <h2>Edit My Info</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter current password"
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" className="profile-btn">Change Password</button>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
        <button 
          className="delete-account-btn"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          Delete Account
        </button>
      </ProfileItem>

        {showDeleteModal && (
        <DeleteModal>
          <ModalContent>
            <h3>Delete Account</h3>
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <ButtonGroup>
              <Button 
                className="delete" 
                onClick={confirmDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <LoadingSpinner />
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </Button>
              <Button 
                className="cancel" 
                onClick={cancelDeleteAccount}
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalContent>
        </DeleteModal>
        )}
    </ProfileWrapper>
  );
};

export default Profile; 