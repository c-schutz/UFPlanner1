import React, { useState } from 'react';
import questions from './questions';
import { useNavigate } from 'react-router-dom';

function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Answers:', answers);
    navigate('/Budget/Banking');
  };

  const backClick = () =>{
    navigate(-1);
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <h3>{question.question}</h3>
            {question.options.map((option) => (
              <label key={option}>
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
        ))}
        <button type="submit">Submit Answers</button>
      </form>
      <div className="navigation-buttons">
        <button type="button" onClick={backClick}>Back</button>
      </div>
    </div>
  );
}

export default Questionnaire;