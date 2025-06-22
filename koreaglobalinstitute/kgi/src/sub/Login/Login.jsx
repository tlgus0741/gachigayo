import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

// Scroll-in animation wrapper
const LoginItem = ({ children, className = '' }) => {
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
    <div ref={ref} className={`login-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:1000/api/login', {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true
      });
      
      if (response.data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', response.data.user.name);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userRole', response.data.user.role || 'user');
        console.log('Logged in successfully. User email saved to localStorage:', formData.email);
        
        // Remember me 기능을 위한 로컬 스토리지 저장 (비밀번호도 저장)
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
          localStorage.setItem('rememberedPassword', formData.password); // 비밀번호 저장
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }
        
        if (setIsLoggedIn) {
          setIsLoggedIn(true);
        }
        navigate('/');
      } else {
        setError(response.data.message || 'User not found.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Please try again.'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
    navigate('/login');
  };

  const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  // 비밀번호 찾기 핸들러
  const handleForgotPassword = () => {
    alert('Password reset functionality will be implemented soon.');
  };

  // 컴포넌트 마운트 시 저장된 이메일/비밀번호 불러오기
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail, password: rememberedPassword || '' }));
      setRememberMe(true);
    }
  }, []);

  return (
    <LoginItem className="login-container">
      {isLoggedIn() ? (
        <div className="logout-section">
          <h2>You are already logged in</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="login-btn">Login</button>
          <p className="register-link">
            Don't have an account?<Link to="/register">Register</Link>
          </p>
          <p className="forgot-password">
            <Link to="/reset-password">Forgot your password?</Link>
          </p>
        </form>
      )}
    </LoginItem>
  );
};

export default Login; 