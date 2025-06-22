import React, { useState } from 'react'
import './Concern.scss';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";


const Finishfirst = () => {


    let [number, setNumber] = useState(2); // 페이지들의 보여줄 번호
    let navigate = useNavigate();
    let [prepare1, setPrepare1] = useState(0);
    let [prepare2, setPrepare2] = useState(0);
    let [prepare3, setPrepare3] = useState(0);
    let [prepare4, setPrepare4] = useState(0);
    let [prepare5, setPrepare5] = useState(0);


    return (
        <>
            <div className='preparing' onClick={ ()=> setPrepare1(!prepare1) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Networking & Career Development Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>

            {
                prepare1 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to expand their professional network in Korea</li>
                                <li>Job seekers looking to build industry connections</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Recommendations for job fairs and networking events for foreigners</li>
                                <li>Guidance on joining industry-specific communities and professional associations</li>
                                <li>Mentorship programs connecting students with international alumni working in Korea</li>
                                <li>Additional learning resources for career development</li>
                            </ul>
                        </div>
                    </div> : null
            }

            <div className='preparing' onClick={ ()=> setPrepare2(!prepare2) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Permanent Residency (F-2) & Long-Term Stay Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare2 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to stay in Korea long-term</li>
                                <li>Students interested in pathways from study abroad to permanent residency</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Long-term visa options for international students after employment</li>
                                <li>Eligibility requirements and application process for permanent residency (F-2) in Korea</li>
                                <li>Information on marriage visas, family visas, and other ways to extend your stay</li>
                                <li>Legal advice on ensuring a stable residency status in Korea</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='skipButton'>
                <div className='skipButtonBox'>
                    <button className='skipButtonLeft' onClick={ ()=>{ 
                        setNumber(1),
                        navigate('/concern/finish/1')
                    }}><BsFillCaretLeftFill /></button>
                    <span>{ number }</span>
                    <button className='skipButtonRight' onClick={ ()=>{ 
                        setNumber(2),
                        navigate('/concern/finish/2')
                    } }><BsFillCaretRightFill /></button>
                </div>  
            </div>
        </>
    )
}

export default Finishfirst