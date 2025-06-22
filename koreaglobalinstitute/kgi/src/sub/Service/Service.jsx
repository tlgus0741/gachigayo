import React, { useEffect, useRef, useState } from 'react';
import './Service.scss'
import { CgChevronDoubleDown } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

// Scroll-in animation wrapper
const ServiceItem = ({ children, className = '' }) => {
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
    <div ref={ref} className={`service-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Service = () => {
    const navigate = useNavigate();

  return(
    <>
        <section style={{paddingTop: '100px', paddingBottom: '180px' ,backgroundColor: '#ffc8dd'} } className=''>
            <ServiceItem>
              <div className='service first'>
                  <div className='firstTitle'>
                      <h1>We support your journey to studying in Korea, <br /> from preparation to employment.</h1>
                  </div>
                  <div className='firstBox service-card'>
                      <div className='firstBoxLeft'>
                          <h4>💰<br/>$36</h4>
                      </div>
                      <div className='firstBoxRight'>
                          <ul>
                              <li>- 1:1 Personalized Consultation (Chat-Based & Convenient!)</li>
                              <li>- From visas to university selection to living tips!</li>
                              <li>- No need to stress alone—get expert guidance tailored to you!</li>
                          </ul>
                      </div>
                  </div>
              </div>
            </ServiceItem>

            {/* <div className='service second'>
                <div className='secondBox'>
                    <div className='secondFlexBox'>
                        <h4>Preparing for study abroad</h4>
                    </div>
                    <div className='secondFlexBox'>
                        <h4>Studying abroad</h4>
                    </div>
                    <div className='secondFlexBox'>
                        <h4>After studying abroad</h4>
                    </div>
                </div>
            </div> */}

            <ServiceItem>
              <div className='service third'>
                  <div className='thirdTitle'>
                      <h4><span>Choose</span> the Consultation Service That Works Best for You</h4>
                  </div>
                  <div className='thirdBox'>
                      <div className='thirdFlexBox service-card'>
                          <h4>💬 KakaoTalk</h4>
                          <span>Trusted by Koreans, with follow-up notifications after the consultation</span>
                      </div>
                      <div className='thirdFlexBox service-card'>
                          <h4>🌍 Facebook</h4>
                          <span>Easily accessible in international student communities</span>
                      </div>
                      <div className='thirdFlexBox service-card'>
                          <h4>📸 Instagram</h4>
                          <span>Perfect for a friendly and emotional connection via DM</span>
                      </div>
                  </div>
              </div>
            </ServiceItem>
        </section>

        <section style={{ backgroundColor: '#cdb4db' }}>
          <ServiceItem>
            <div className='service fourth'>
                <div className='fourthTitle'>
                    <h1><span>Need More Help?</span><br />Get 50% Off Your Next Session!</h1>
                </div>
                <div className='fourthBox'>
                    <div className='fourthFlexBox service-card'>    
                        <h4>Get a Discount After Payment! 🎉</h4>
                        <span>🔹After payment, you'll receive a discount code via email or message (valid for 6 months)</span>
                    </div>
                    <div className='fourthFlexBox service-card'>
                        <h4>Write a review and get an additional coupon! 🎁</h4>
                        <span>🔹Leave a review and enjoy additional discounts!</span>
                    </div>
                </div>
            </div>
          </ServiceItem>
        </section>

        <section style={{ backgroundColor: '#bde0fe' }}>
          <ServiceItem>
            <div className='service fifth'>
                <div className='fifthTitle'>
                    <h4>How Will This Consultation Change Your Study Abroad Journey?</h4>
                    <span>Here’s what you’ll gain</span>
                </div>
                <div className='fifthBox'>
                    <div className="fifthFlexBox service-card">
                        <h4>✅<br /> Certainty</h4>
                        <span>A clear and structured study abroad plan—no more uncertainty!</span>
                    </div>
                    <div className="fifthFlexBox service-card">
                        <h4>✅<br />tips</h4>
                        <span>Practical tips on visas & university selection tailored to your needs</span>
                    </div>
                    <div className="fifthFlexBox service-card">
                        <h4>✅<br />know-how</h4>
                        <span>All the "I wish I had known this earlier" information in one session!</span>
                    </div>
                    <div className="fifthFlexBox service-card marginnone">
                        <h4>✅<br />confidence</h4>
                        <span>Less stress & second-guessing—gain confidence in your decisions!</span>
                    </div>
                </div>
                <div className='applyButton'>
                    <CgChevronDoubleDown  size="30px" className='applyDown'/>
                    <button className="animated-btn" onClick={ () => navigate('/report') }>Apply for a Consultation Now!</button>
                </div>
            </div>
          </ServiceItem>
        </section>
    </>
  )
}

export default Service