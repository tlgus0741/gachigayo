import React, { useEffect, useRef, useState } from 'react';
import './Home.scss';
import { FaRegCheckCircle } from "react-icons/fa";
import { BiCaretRight } from "react-icons/bi";
import 'animate.css';
import { useNavigate } from 'react-router-dom';

// Scroll-in animation wrapper
const HomeItem = ({ children, className = '' }) => {
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
    <div ref={ref} className={`home-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Home = () => {
    const navigate = useNavigate();
  return (
    <>
        <section style={{paddingTop: '100px'} }>
            <HomeItem>
              <div className='background'>
                  <div className='backgroundLeft'>
                      <div className='backgroundLeftContent'>
                          <h1>If you're not struggling with preparing to study in Korea, <span>feel free to leave our site.</span></h1>
                          <p>You can definitely prepare for studying in Korea on your own.</p>
                          <button className='custom-btn  btn'>
                              <a href="/report">Get Started Now</a>
                          </button>
                      </div>
                  </div>
                  <div className='backgroundRight'>
                      <div className='leftImg'>
                          <div className='leftImg1'></div>
                      </div>
                      <div className='rightImg'>
                          <div className='rightImg1'></div>
                          <div className='rightImg2'></div>
                      </div>
                  </div>
                  <div style={ { clear: 'both'}}></div>
              </div>
            </HomeItem>
        </section>

        <section>
            <HomeItem>
              <div className='firstContent custom-center width'>
                  <p>But you don't know <br /> <span>where to start?</span></p>
                  <p>Do you have <br /> questions about <br/> <span>preparing to study abroad?</span></p>
                  <h1>Then, we'll be here to help you.</h1>
              </div>
            </HomeItem>
        </section>

        <section>
            <HomeItem>
              <div className='secondContent'>
                  <div className='secondLeftContent width'>
                      <h1 className='mainFont'><BiCaretRight />'Those who we can help.'</h1>
                  </div>
                  <div className='secondRightContent'>
                      <div className='listimg'>
                            <div className='mainimg'></div>
                      </div>
                      <div className='list'>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Those who want to study abroad</span> in Korea but don't know where to start.</p>
                          </div>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Those who have questions</span> about preparing for studying in Korea.</p>
                          </div>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Students who are struggling</span> with choosing a major.</p>
                          </div>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Those who are worried</span> if studying abroad in Korea is possible.</p>
                          </div>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Those who are concerned </span>about adapting to life in Korea as an international student.</p>
                          </div>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Those who have financial concerns</span> and need scholarships.</p>
                          </div>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Those interested in short-term programs</span> in Korea instead of full-time study.</p>
                          </div>
                          <div className='listContent'>
                              <FaRegCheckCircle className='listIcon'/>
                              <p><span>Those who are worried</span> about their career prospects after studying abroad in Korea.</p>
                          </div>
                      </div>
                      <div style={ {clear:'both'} }></div>
                  </div>
              </div>
            </HomeItem>
        </section>

        <section>
            <HomeItem>
              <div className='centerBackground'>
                  <div className="img1"></div>
              </div>
            </HomeItem>
        </section>

        <section>
            <HomeItem>
              <div className='thirdContent'>
                  <p className='first mainFont'>we've prepared this:</p>
                  <div className='mainContent'>
                      <div className='leftContent'>
                          <h1>A Korean study abroad <span> counseling service</span></h1>
                          <p className='second'>to help you achieve a successful student life <span> and turn your dreams into reality.</span></p>
                      </div>
                      <div className='rightContent'>
                          <button className='custom-btn applybtn btn' onClick={ () => navigate('/report') }>Apply for Consultation</button>
                      </div>
                  </div>

              </div>
            </HomeItem>
        </section>
        <section>

        </section>
        
        <section>
            <div>

            </div>
        </section>
       
    </>
   
  )
}

export default Home
