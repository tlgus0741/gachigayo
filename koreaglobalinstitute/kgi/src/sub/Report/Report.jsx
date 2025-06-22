import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Report.scss';
import axios from 'axios';

// Scroll-in animation wrapper
const ReportItem = ({ children, className = '' }) => {
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
    <div ref={ref} className={`report-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Report = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: '',
    platformId: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [file, setFile] = useState(null);
  const [dateError, setDateError] = useState('');
  const [fileError, setFileError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    
    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        setFileError('File size must be less than 5MB');
        setFile(null);
        e.target.value = null;
      } else {
        setFileError('');
        setFile(selectedFile);
      }
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    const day = new Date(value).getDay();
    if (day !== 0 && day !== 6) {
      setDateError('You can only select Saturday or Sunday.');
      setFormData(prev => ({ ...prev, preferredDate: '' }));
    } else {
      setDateError('');
      setFormData(prev => ({ ...prev, preferredDate: value }));
    }
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    setCouponError('');

    try {
      const response = await axios.post('http://localhost:1000/api/verify-coupon', {
        code: couponCode,
        email: formData.email
      });

      if (response.data.success) {
        setCouponApplied(true);
        setDiscountAmount(18); // $36의 50%
        setCouponError('');
      } else {
        setCouponError(response.data.message);
        setCouponApplied(false);
        setDiscountAmount(0);
      }
    } catch (err) {
      setCouponError('Failed to verify coupon. Please try again.');
      setCouponApplied(false);
      setDiscountAmount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const day = new Date(formData.preferredDate).getDay();
    if (day !== 0 && day !== 6) {
      setDateError('You can only select Saturday or Sunday.');
      return;
    }
    
    // Create FormData object to handle file upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    if (file) {
      submitData.append('file', file);
    }
    if (couponApplied) {
      submitData.append('couponCode', couponCode);
    }

    // Store form data in sessionStorage for access after payment
    const dataToStore = {
      ...formData,
      fileName: file ? file.name : null,
      couponCode: couponApplied ? couponCode : null,
      discountAmount: discountAmount
    };
    sessionStorage.setItem('consultationData', JSON.stringify(dataToStore));
    console.log('Data stored in sessionStorage:', dataToStore);
    
    // Navigate to payment page
    navigate('/payment');
  };

  return (
    <ReportItem>
      <div className="report-container">
        <div className="report-form">
          <h1 className="report-title">Consultation Request</h1>
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="platform">Preferred Platform for Consultation</label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
                className="platform-select"
              >
                <option value="">Select a platform</option>
                <option value="kakao">KakaoTalk</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="platformId">Preferred Platform ID</label>
              <input
                type="text"
                id="platformId"
                name="platformId"
                value={formData.platformId}
                onChange={handleChange}
                required
                placeholder="Enter your KakaoTalk/Instagram/Facebook ID"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Consultation Date</label>
              <div className="date-notice">
                ※ Date selection is based on Korea Standard Time (KST). Only Saturday and Sunday are available.
              </div>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleDateChange}
                required
              />
              {dateError && <p className="date-error">{dateError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Consultation Time</label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Please enter your message (required)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="file">Attach File (Optional)</label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                {file && (
                  <div className="file-info">
                    <span>{file.name}</span>
                    <button 
                      type="button" 
                      onClick={() => {
                        setFile(null);
                        document.getElementById('file').value = '';
                      }}
                      className="remove-file"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {fileError && <p className="file-error">{fileError}</p>}
                <p className="file-hint">Max file size: 5MB. Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="coupon">Coupon Code (Optional)</label>
              <div className="coupon-input-group">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter your coupon code"
                  disabled={couponApplied}
                />
                {!couponApplied && (
                  <button 
                    type="button" 
                    onClick={handleCouponSubmit}
                    className="verify-coupon-btn"
                  >
                    Apply
                  </button>
                )}
              </div>
              {couponError && <p className="error-message">{couponError}</p>}
              {couponApplied && (
                <p className="success-message">
                  Coupon applied! You will receive a 50% discount on your consultation.
                </p>
              )}
            </div>

            <div className="price-info">
              <p>Consultation Fee: ${36 - discountAmount}</p>
              {discountAmount > 0 && (
                <p className="discount-info">Original Price: $36 (50% discount applied)</p>
              )}
            </div>

            <button type="submit" className="submit-btn">Proceed to Payment</button>
          </form>
        </div>
      </div>
    </ReportItem>
  );
};

export default Report;