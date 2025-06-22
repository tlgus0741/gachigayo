import React, { useState } from 'react'
import './Concern.scss';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";


const Livefirst = () => {
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
                    <h1>Study Abroad Eligibility & Personalized Study Plan Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare1 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students considering studying in Korea but unsure which schools or majors they can apply to</li>
                                <li>Students who need to determine whether studying abroad is realistically possible</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>A customized study abroad plan based on academic background, language skills, budget, and goals</li>
                                <li>Explanation of available study paths: undergraduate, graduate school, exchange programs, and language courses</li>
                                <li>Timeline and step-by-step checklist for study abroad preparation</li>
                            </ul>
                        </div>
                    </div> : null
            }

            <div className='preparing' onClick={ ()=> setPrepare2(!prepare2) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>School & Major Selection Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare2 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students struggling to choose the right university and major in Korea</li>
                                <li>Students looking for a program that aligns with their career goals, such as employment, research, or entrepreneurship</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Recommended list of universities and majors based on the student’s goals, interests, and academic performance</li>
                                <li>Analysis of departments with strong job prospects and practical curricula</li>
                                <li>Comparison of prestigious universities vs. career-focused universities</li>
                                <li>Information on Korean university rankings, admission competition rates, and school-specific features</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare3(!prepare3) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Admission Process & Document Preparation Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare3 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to apply to Korean universities but find the admission process overwhelming</li>
                                <li>Students struggling with writing application documents</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Guidance on preparing admission applications and required documents</li>
                                <li>Tips and feedback on writing personal statements, study plans, and recommendation letters</li>
                                <li>University-specific application timelines and submission deadlines</li>
                                <li>Information on required language proficiency tests such as TOPIK, IELTS, and TOEFL</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare4(!prepare4) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Scholarship & Financial Aid Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare4 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to reduce tuition costs</li>
                                <li>Students seeking information on government and university scholarships</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Instructions on how to apply for government scholarships (e.g., Global Korea Scholarship, KOICA)</li>
                                <li>Explanation of university scholarship requirements and application procedures</li>
                                <li>Tips for writing scholarship essays and applications</li>
                                <li>Information on financial support programs available for international students</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare5(!prepare5) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Visa Application & Residency Preparation Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare5 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students preparing for a student visa (D-2) or language training visa (D-4)</li>
                                <li>Students who lack information about the visa screening process</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Step-by-step guide for visa application and required documents</li>
                                <li>Key factors in visa approval and tips to increase approval chances</li>
                                <li>Guidance on extending your stay or changing to a different visa (e.g., work visa)</li>
                                <li>Practical tips on initial settlement: health insurance, opening a bank account, and getting a phone plan</li>
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

export default Livefirst
