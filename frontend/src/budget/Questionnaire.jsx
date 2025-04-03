import React, { useEffect, useState } from 'react';
import questions from './questions';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from "motion/react";
import './qstyles.css';
import { useVData } from '../Vcontext';

function Questionnaire() {
    const { logged, setLogged } = useVData();
    
    const [answers, setAnswers] = useState(() => {
        const savedAnswers = sessionStorage.getItem('currentqdata');
        if (savedAnswers) {
            return JSON.parse(savedAnswers);
        } else {
            const initialAnswers = {};
            questions.forEach(question => {
                // Store both the selected option and the question type
                initialAnswers[question.id] = {
                    response: question.options[Math.floor((question.options.length - 1) / 2)],
                    type: question.type,
                    weight: question.weight
                };
            });
            return initialAnswers;
        }
    });

    const navigate = useNavigate();

    const handleOptionChange = (questionId, selectedOption, questionType, questionWeight) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: {
                response: selectedOption,
                type: questionType,
                weight: questionWeight
            },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sessionStorage.setItem('currentqdata', JSON.stringify(answers));
        navigate('/Budget/Banking');
    };

    const backClick = () => {
        sessionStorage.removeItem('currentqdata');
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
                                            // Update the checked condition to look at response
                                            checked={answers[question.id]?.response === option}
                                            // Pass question.type to handleOptionChange
                                            onChange={() => handleOptionChange(question.id, option, question.type, question.weight)}
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