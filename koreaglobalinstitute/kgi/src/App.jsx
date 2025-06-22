import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, Outlet, Navigate } from 'react-router-dom';
import './App.css'
import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { FaUserCircle, FaInstagram, FaFacebook } from "react-icons/fa";
import Home from './sub/Home/Home';
import About from './sub/About/About';
import Concern from './sub/Concern/Concern';
import Livefirst from './sub/Concern/Livefirst';
import Livesecond from './sub/Concern/Livesecond';
import Processfirst from './sub/Concern/Processfirst';
import Processsecond from './sub/Concern/Processsecond';
import Finishfirst from './sub/Concern/Finishfirst';
import Finishsecond from './sub/Concern/Finishsecond';
import Service from './sub/Service/Service';
import Login from './sub/Login/Login';
import Register from './sub/Register/Register';
import Report from './sub/Report/Report';
import Payment from './sub/Payment/Payment';
import PaymentSuccess from './sub/Payment/PaymentSuccess';
import ReportHistory from './sub/Report/ReportHistory';
import ResetPassword from './sub/Login/ResetPassword';
import Profile from './sub/Profile/Profile';
import AdminDashboard from './sub/Admin/AdminDashboard';
import TermsOfService from './sub/Policy/TermsOfService';
import PrivacyPolicy from './sub/Policy/PrivacyPolicy';
import RefundPolicy from './sub/Policy/RefundPolicy';

function App() {
  const [active, setActive] = useState('navBar')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  let navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || '';
      const role = localStorage.getItem('userRole') || 'user';
      
      setIsLoggedIn(loginStatus);
      setUserName(name);
      setUserRole(role);
    };

    // 초기 로드 시 확인
    checkLoginStatus();

    // localStorage 변경 감지
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('user');
    navigate('/login');
  };

  return (
    <>
        <section className='navBarSection'>
            <header className='header custom-flex'>
                <div className='logoDiv'>
                    <a href='/' className='logo'>
                        <h1>Gachigayo</h1>
                    </a>
                </div>
                <div className={ active }>
                    <ul className="navLists custom-flex">
                        <li className='navItem'>
                            <a href='/' className='navLink'>Home</a>
                        </li>
                        <li className='navItem'>
                            <a href="/about" className='navLink'>About Our Service</a>
                        </li>
                        <li className='navItem'>
                            <a href="/concern/preparing/1" className='navLink'>Your Concerns</a>
                        </li>
                        <li className='navItem'>
                            <a href="/service" className='navLink'>Services</a>
                        </li>
                        {userRole !== 'admin' && (
                          <li className='navItem'>
                              <a href='/report-history' className='navLink'>My Consultations</a>
                          </li>
                        )}
                        {isLoggedIn && userRole === 'admin' && (
                          <li className='navItem'>
                              <Link to="/admin-dashboard" className='navLink'>Admin Dashboard</Link>
                          </li>
                        )}
                        {userRole !== 'admin' && (
                          <button className='custom-btn'>
                                <a href="/report">Get Started Now</a>
                          </button>
                        )}
                        {isLoggedIn ? (
                          <>
                            <div className="user-status" ref={profileRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column',}}>
                              <button
                                className="profile-btn"
                                onClick={() => setProfileOpen((open) => !open)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                              >
                                <FaUserCircle className="user-icon" />
                                <span className="user-name">{userName || 'User'}</span>
                              </button>
                              {profileOpen && (
                                <div className="profile-dropdown">
                                  {userRole !== 'admin' && (
                                    <a href="/report-history" className="dropdown-item">My Consultations</a>
                                  )}
                                  <a href="/profile" className="dropdown-item">Edit My Info</a>
                                  {userRole === 'admin' && (
                                    <Link to="/admin-dashboard" className="dropdown-item">Admin Dashboard</Link>
                                  )}
                                  <button onClick={handleLogout} className="dropdown-item logout">Logout</button>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <button className='custom-login-btn'>
                              <a href="/login">Login/Sign Up</a>
                            </button>
                          </>
                        )}
                    </ul>

                    <div onClick={ ()=>setActive('navBar')} className="closeNavbar">
                        <IoIosCloseCircle className='custom-icon'/>
                    </div>
                </div>

                <div onClick={ ()=>setActive('navBar activeNavbar')} className='toggleNavbar'>
                    <TbGridDots className='custom-icon'/>
                </div>
            </header>
        </section>

            <Routes>
                <Route path="*" element={ <div>없는페이지임</div> } />
                <Route path="/" element={ <Home></Home> } />
                <Route path="/about" element={ <About></About> } />
                <Route path="/concern" element={ <Concern></Concern> }>
                    <Route path="preparing/1" element= { <Processfirst></Processfirst> } />
                    <Route path="preparing/2" element= { <Processsecond></Processsecond> } />
                    <Route path="live/1" element= { <Livefirst></Livefirst> } />
                    <Route path="live/2" element= { <Livesecond></Livesecond> } />
                    <Route path="finish/1" element= { <Finishfirst></Finishfirst> } />
                    <Route path="finish/2" element= { <Finishsecond></Finishsecond> } />
                </Route>
                <Route path='/service' element={ <Service></Service> } />
                <Route path='/report' element={ isLoggedIn && userRole === 'admin' ? <Navigate to="/admin-dashboard" replace /> : (isLoggedIn ? <Report></Report> : <Login></Login>) } />
                <Route path='/login' element={ <Login setIsLoggedIn={setIsLoggedIn}></Login> } />
                <Route path='/register' element={ <Register></Register> } />
                <Route path='/payment' element={ <Payment></Payment> } />
                <Route path='/payment-success' element={ <PaymentSuccess /> } />
                <Route path='/report-history' element={isLoggedIn && userRole === 'admin' ? <Navigate to="/admin-dashboard" replace /> : <ReportHistory />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/terms-of-service' element={<TermsOfService />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/refund-policy' element={<RefundPolicy />} />
                {isLoggedIn && userRole === 'admin' && (
                  <Route path='/admin-dashboard' element={<AdminDashboard />} />
                )}
            </Routes>

        <footer className="app-footer">
          <div className='footer-container'>
            <div className="footer-left">
              <div className="footer-logo">Gachigayo</div>
              <div className="footer-policies">
                <Link to="/terms-of-service" className="policy-link">Terms of Service</Link>
                <Link to="/privacy-policy" className="policy-link">Privacy Policy</Link>
                <Link to="/refund-policy" className="policy-link">Refund Policy</Link>
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-details">
                <p>Company Name: Gachigayo Korea</p>
                <p>CEO: Sihyeon Kim</p>
                <p>Business Registration Number: 302-26-01924</p>
                <p>Online Sales Business: Currently being reported</p>
                <p>Email: koreaglobalinstitute@gmail.com</p>
              </div>
              <div className="footer-social-section">
                <div className="social-links-wrapper">
                  <p className="follow-us-text">Follow us:</p>
                  <div className="social-links">
                    <a href="https://www.instagram.com/gachigayo_korea?igsh=aHIya2MwbTV5N3d4&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FaInstagram className="social-icon" />
                    </a>
                    <a href="https://www.facebook.com/gachigayo" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FaFacebook className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="copyright">© 2025 Gachigayo Korea. All rights reserved.</p>
        </footer>
    </>
  )
}

export default App
