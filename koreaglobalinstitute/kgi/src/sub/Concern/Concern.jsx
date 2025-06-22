import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Concern.scss';
// import Processfirst from "./Processfirst";
// import Processsecond from "./Processsecond";
// import Livefirst from "./Livefirst";
// import Livesecond from "./Livesecond";
// import { BsFillCaretLeftFill } from "react-icons/bs";
// import { BsFillCaretRightFill } from "react-icons/bs";

// Scroll-in animation wrapper
const ConcernItem = ({ children, className = '' }) => {
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
    <div ref={ref} className={`concern-animate${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Concern = () => {
    let navigate = useNavigate();

    return (
        <> 
        <div style={{paddingTop: '100px'}}></div>
        <ConcernItem>
            <div className='concern'>
                    <div className='concernTitle'>
                        <h1>Concern</h1>
                    </div>
                    <div className='concernButtonBox'>
                        <button className= 'concernButton' onClick={ ()=> { navigate('preparing/1') } }>A student preparing for study abroad</button>
                        <button className= 'concernButton'  onClick={ ()=> { navigate('live/1') } }>A student living abroad for studies</button>
                        <button className= 'concernButton' onClick={ ()=> { navigate('finish/1') } }>A student who has completed their study abroad</button>
                    </div>
                    <Outlet></Outlet>
            </div>
        </ConcernItem>
        </>
    )
}

export default Concern
