import React, { useEffect, useState } from 'react';
import questions from './questions';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from "motion/react";
import './qstyles.css';
import { useVData } from '../Vcontext';

function Questionnaire() {
    const { logged, setLogged } = useVData();
    //console.log(logged); test if log is working

    const [answers, setAnswers] = useState(() => {
        const savedAnswers = sessionStorage.getItem('answers');
        if (savedAnswers) {
            return JSON.parse(savedAnswers);
        } else {
            const initialAnswers = {};
            questions.forEach(question => {
                initialAnswers[question.id] = "no"; // no initialization if there is no data stored
            });
            return initialAnswers;
        }
    });

    const navigate = useNavigate();

    const handleOptionChange = (questionId, selectedOption) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log('Submitted Answers:', answers);
        sessionStorage.setItem('currentqdata', JSON.stringify(answers));
        navigate('/Budget/Banking');
    };

    const backClick = () => {
        //sessionStorage.clear();
        navigate('/Budget');
    }

    return (
        <>
            <p>
                Input your budgetting information here!
            </p>
            <hr className="ahr"></hr>
            <div className='formHandle'>
                <form onSubmit={handleSubmit} className='qForm'>
                    {questions.map((question) => (
                        <div key={question.id} className='questions'>
                            <h3 className='questionTitle'>{question.question}</h3>
                            <div className='ansSeparation'>
                                {question.options.map((option) => (
                                    <label key={option} className='lStyle'>
                                        <input
                                            type="radio"
                                            value={option}
                                            checked={answers[question.id] === option}
                                            onChange={() => handleOptionChange(question.id, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className='c'>
                        <div className="buttonContainer">
                            <motion.button type="button" className='buttons' onClick={backClick}
                                whileHover={{ scale: 1.1 }}>
                                Back
                            </motion.button>
                            <motion.button type="submit" className='buttons'
                                whileHover={{ scale: 1.1 }}>
                                Submit Answers</motion.button>
                        </div>
                    </div>
                </form>
            </div>
        </>

    );
}

export default Questionnaire;