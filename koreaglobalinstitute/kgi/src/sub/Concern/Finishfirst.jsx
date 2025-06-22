import React, { useState } from 'react'
import './Concern.scss';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";


const Finishfirst = () => {
    let [number, setNumber] = useState(1); // 페이지들의 보여줄 번호
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
                    <h1>Job Search Consultation in Korea</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare1 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to work in Korea but don’t know how to prepare</li>
                                <li>Students who lack information about companies that hire foreigners</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Analysis of job fields and industry trends where foreigners can work in Korea</li>
                                <li>Recommendations for companies that actively hire foreigners and job search websites</li>
                                <li>Guidelines for writing resumes and cover letters tailored to Korean companies</li>
                                <li>Mock interviews and feedback for successful job applications</li>
                            </ul>
                        </div>
                    </div> : null
            }

            <div className='preparing' onClick={ ()=> setPrepare2(!prepare2) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Work Visa (E-7) & Residency Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare2 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to stay in Korea and work after graduation</li>
                                <li>Students who are curious about work visa requirements and procedures</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Step-by-step guide to applying for the E-7 (Professional Work Visa) and required documents</li>
                                <li>How to apply for the D-10 (Job-Seeking Visa) and strategies for extending your stay</li>
                                <li>Explanation of the procedures companies must follow when hiring foreigners</li>
                                <li>Tips to increase the chances of work visa approval</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare3(!prepare3) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Graduate School & Research Program Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare3 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to continue their studies through a master’s or PhD program</li>
                                <li>Students looking for research opportunities and scholarship information</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Recommendations for universities and research labs with strong master's/PhD programs</li>
                                <li>Guidance on applying for research scholarships and funding opportunities</li>
                                <li>Step-by-step guide to preparing graduate school application documents (research proposal, recommendation letters)</li>
                                <li>Tips on how to contact professors and choose a research topic</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare4(!prepare4) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Career Planning After Returning Home</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare4 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who have completed their degree in Korea but are considering job opportunities in their home country</li>
                                <li>Students who want to build a global career using their study abroad experience</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Strategies for leveraging study abroad experience when job hunting</li>
                                <li>Information on global companies connected to Korea and overseas job opportunities</li>
                                <li>Recommended industries and job roles that value international experience</li>
                                <li>Tips on effectively incorporating Korean study experience into a resume</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare5(!prepare5) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Entrepreneurship & Business Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare5 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Foreigners who want to start a business in Korea</li>
                                <li>Students interested in applying for a business visa (D-8) or working as freelancers</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Step-by-step guide on how foreigners can start a business in Korea</li>
                                <li>Eligibility requirements and legal conditions for obtaining a D-8 (Business Visa)</li>
                                <li>Information on government support programs and startup funding opportunities</li>
                                <li>Advice on designing a successful business model in the Korean market</li>
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