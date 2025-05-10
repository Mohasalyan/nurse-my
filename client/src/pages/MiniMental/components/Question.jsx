import React from 'react';
import './Question.css';

const Question = ({ question, onAnswerChange }) => (
  <div className="question">
    <p>
      {question.text} <span>({question.points} נקודה)</span>
    </p>
    <div className="answers">
      <label>
        <input
          type="radio"
          name={question.id}
          checked={question.answer === true}
          onChange={() => onAnswerChange(true)}
        />
        נכון
      </label>
      <label>
        <input
          type="radio"
          name={question.id}
          checked={question.answer === false}
          onChange={() => onAnswerChange(false)}
        />
        לא נכון
      </label>
    </div>
  </div>
);

export default Question;
