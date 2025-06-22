import React, { useState } from 'react'
import './Concern.scss';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";


const Livesecond = () => {
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
                    <h1>Korean Language & Language Test Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare1 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students preparing for study abroad in Korea with limited Korean language skills</li>
                                <li>Students who need a specific TOPIK (Test of Proficiency in Korean) score</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Recommended study methods for learning Korean</li>
                                <li>Strategies for preparing for TOPIK, IELTS, and TOEFL exams</li>
                                <li>Essential Korean phrases and expressions to know before studying abroad</li>
                                <li>Introduction to recommended Korean language schools and online courses</li>
                            </ul>
                        </div>
                    </div> : null
            }

            <div className='preparing' onClick={ ()=> setPrepare2(!prepare2) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Accommodation Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare2 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students wondering where to live before starting their study abroad journey in Korea</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Comparison of accommodation options: dormitories, studio apartments, shared housing</li>
                                <li>Guidance on dormitory application methods and deadlines</li>
                                <li>Pros and cons of living in Seoul vs. other cities</li>
                                <li>Tips for finding safe areas and saving on living costs</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare3(!prepare3) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Life in Korea & Cultural Adaptation Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare3 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students with limited understanding of Korean culture</li>
                                <li>Students seeking practical information about life in Korea</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Explanation of Korean academic culture: campus life, relationships with professors, and group projects</li>
                                <li>Guide to common cultural mistakes and etiquette for international students</li>
                                <li>Essential life tips: public transportation, shopping, and visiting the hospital</li>
                                <li>How to make friends in Korea and join international student communities</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare4(!prepare4) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Post-Study Career & Employment Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare4 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to work in Korea after graduation</li>
                                <li>Students considering visa extensions or work visa (E-7) applications after studying abroad</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Analysis of in-demand majors and industries in Korea</li>
                                <li>Introduction to companies that hire international students and recommended job search sites</li>
                                <li>Resume writing and interview preparation consulting</li>
                                <li>Guidance on applying for a work visa (E-7) and meeting the requirements</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare5(!prepare5) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>International Student Networking & Mentoring Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare5 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to connect with the international student community while preparing to study abroad</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Connecting with international students from the same school or major</li>
                                <li>Recommended networking events and gatherings for international students</li>
                                <li>One-on-one mentoring opportunities with senior international students currently studying in Korea</li>
                            </ul>
                        </div>
                    </div> : null
            }

            <div className='skipButton'>
                    <div className='skipButtonBox'>
                        <button className='skipButtonLeft' onClick={ ()=>{ 
                            setNumber(1),
                            navigate('/concern/live/1')
                        }}><BsFillCaretLeftFill /></button>
                        <span>{ number }</span>
                        <button className='skipButtonRight' onClick={ ()=>{ 
                            setNumber(2),
                            navigate('/concern/live/2')
                        } }><BsFillCaretRightFill /></button>
                    </div>  
            </div>
        </>
    )
}

export default Livesecond
