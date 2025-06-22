import React, { useEffect, useRef, useState } from 'react';
import './About.scss';

// Scroll-in animation wrapper
const AboutItem = ({ children, className = '' }) => {
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
    <div ref={ref} className={`about-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const About = () => {
    return (
        <>
            <section>
                <div style={{paddingTop: '100px'}}></div>
                <AboutItem>
                  <div className='detail'>
                      <div className='detailHeader'>
                          <h1 className='mainFont'>About Our Service</h1> 
                      </div>
                  </div>
                </AboutItem>
            </section>
            <section>
                <AboutItem>
                  <div className="content">
                      <div className='contentLeft'>
                          <h1>Hello, I’m Kim Si-hyun, the founder and consultant at Korea Global Institute.</h1>
                      </div>
                      <div className='contentRight'>
                          <p>
                              I’ve met countless people who dream of coming to Korea.
                              <br />
                              Many of them want to study abroad in Korea but feel lost or overwhelmed,
                              <br /> not knowing where to start.
                              <br />
                              <br />
                              Isn’t there a way I can directly help them?
                              <br />
                              Can’t I be the one to turn their dreams into reality?
                          </p>
                      </div>
                  </div>
                  <div className='line'></div>
                </AboutItem>
            </section>
            <section>
                <AboutItem>
                  <div className="content">
                      <div className='contentLeft'>
                          <h1>Is there no way to study abroad in Korea?</h1>
                      </div>
                      <div className="contentRight">
                          <p>
                              “I don’t know which school to choose.”
                              <br />
                              “Where do I even start?”
                              <br />
                              “I have no idea how to live in Korea.”
                              <br />
                              <br />
                              Have you been endlessly searching through countless pieces of information, <br />unsure of where to begin?
                              <br />
                              <br />
                              From choosing the right school to preparing for your visa, improving your language skills, 
                              <br />
                              and adjusting to the culture, <br />does it all feel like an overwhelming mountain to climb?
                          </p>
                      </div>
                  </div>
                  <div className='line'></div>
                </AboutItem>
            </section>
            <section>
                <AboutItem>
                  <div className="content">
                      <div className='contentLeft'>
                          <h1>Is studying abroad the only way?</h1>
                      </div>
                      <div className='contentRight'>
                          <p>
                              Studying abroad is just one way to pursue your dreams in Korea.
                              <br />
                              <br />
                              There are many other paths you can take.
                              <br />
                              <br />
                              Don’t give up just because of financial difficulties or challenging circumstances.</p>
                      </div>
                  </div>
                  <div className='line'></div>
                </AboutItem>
            </section>
            <section>
                <AboutItem>
                  <div className='content'>
                      <div className='contentLeft'>
                          <h1>I want you to know that your dreams can become a reality.</h1>
                      </div>
                      <div className='contentRight'>
                          <p>
                              Of course, nothing in life is 100% guaranteed.
                              <br />
                              Receiving counseling doesn’t mean there’s a guarantee that everyone will make it to Korea.
                              <br />
                              <br />
                              But what I want to tell you is this: you can do it.
                              <br />
                              There is a way for you to come to Korea.
                          </p>
                      </div>
                  </div>
                  <div className='line'></div>
                </AboutItem>
            </section>
            <section className='mb50'>
                <AboutItem>
                  <div className='content'>
                          <div className='contentLeft'>
                              <h1>You don’t have to receive counseling from Korea Global Institute.</h1>
                          </div>
                          <div className='contentRight'>
                              <p>
                                  If you want to study abroad in Korea but are rushing into counseling right away,
                                  <br />
                                  I’d advise against it.
                                  <br />
                                  With a little research, you can absolutely succeed on your own.
                                  <br />
                                  <br />
                                  We’re simply here to be your reliable partner, 
                                  <br />
                                  helping make your study abroad journey easier and faster to achieve.
                              </p>
                          </div>
                  </div>
                  <div className='line'></div>
                </AboutItem>
            </section>
        </>
    )
}

export default About
