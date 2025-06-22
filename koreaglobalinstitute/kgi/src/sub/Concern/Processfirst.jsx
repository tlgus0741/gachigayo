import React, { useState } from 'react';
import './Concern.scss';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";

const Processfirst = () => {

    let navigate = useNavigate();
    let [number, setNumber] = useState(1); // 페이지들의 보여줄 번호
    let [active, setActive] = useState('concernButton');
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
                    <h1>Basic Study Abroad Consultation (Initial Consultation)</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>

            {
                prepare1 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students considering studying in Korea but unsure where to start</li>
                                <li>Students who want to find a study abroad path that matches their goals and situation</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Overview of the study abroad process in Korea</li>
                                <li>Explanation of various study abroad options: undergraduate, graduate school, language programs, and exchange programs</li>
                                <li>Analysis of essential requirements (language skills, academic qualifications, financial status)</li>
                                <li>Personalized study abroad plan based on the student’s goals and circumstances</li>
                            </ul>
                        </div>
                    </div> : null
            }

            <div className='preparing' onClick={ ()=> setPrepare2(!prepare2) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Eligibility & Personalized Study Plan Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare2 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students curious about which schools or majors they can apply to in Korea</li>
                                <li>Students who need to assess whether studying abroad is realistically possible for them</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Custom study abroad plan considering academic background, language skills, budget, and goals</li>
                                <li>Explanation of available options for undergraduate, graduate school, exchange programs, and language courses</li>
                                <li>Timeline and step-by-step checklist for study abroad preparation</li>
                            </ul>
                        </div>
                    </div> : null
            }


            <div className='preparing' onClick={ ()=> setPrepare3(!prepare3) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>School & Major Selection Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare3 == 1 ? 
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


            <div className='preparing' onClick={ ()=> setPrepare4(!prepare4) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Admission Process & Document Preparation Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare4 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to apply to Korean universities but find the admission process overwhelming</li>
                                <li>Students who are struggling with writing admission documents</li>
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


            <div className='preparing' onClick={ ()=> setPrepare5(!prepare5) }>
                <div className='preparingBox'>
                    <BsFillPersonCheckFill className='preparingIcon color'/>
                    <h1>Scholarship & Financial Aid Consultation</h1>
                    <BsFillCaretDownFill className='preparingIcon'/>
                </div>
            </div>
            {
                prepare5 == 1 ? 
                    <div className='preparingOpen'>
                        <div className='preparingWho'>
                            <ul>
                                <h4>Who is this for?</h4>
                                <li>Students who want to reduce their tuition burden</li>
                                <li>Students seeking information on government and university scholarships</li>
                            </ul>
                        </div>
                        <div className='preparingIncluded'>
                            <ul>
                                <h4>What’s included?</h4>
                                <li>Instructions on how to apply for government scholarships (e.g., Global Korea Scholarship, KOICA)</li>
                                <li>Explanation of university scholarship requirements and application procedures</li>
                                <li>Tips for writing scholarship essays and applications</li>
                                <li>Information on living expense support programs for international students</li>
                            </ul>
                        </div>
                    </div> : null
            }

             
            <div className='skipButton'>
                <div className='skipButtonBox'>
                    <button className='skipButtonLeft' onClick={ ()=>{ 
                        setNumber(1),
                        navigate('/concern/preparing/1')
                    }}><BsFillCaretLeftFill /></button>
                    <span>{ number }</span>
                    <button className='skipButtonRight' onClick={ ()=>{ 
                        setNumber(2),
                        navigate('/concern/preparing/2')
                    } }><BsFillCaretRightFill /></button>
                </div>  
            </div>
           
                            
        </>
    )
}

export default Processfirst
