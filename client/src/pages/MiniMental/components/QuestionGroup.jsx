import React from 'react';
import Question from './Question';
import './QuestionGroup.css';

const QuestionGroup = ({ section, onAnswer }) => (
  <fieldset className="question-group">
    <legend>{section.title}</legend>
    {section.description && <p className="description">{section.description}</p>}
    {section.questions.map((q) => (
      <Question
        key={q.id}
        question={q}
        onAnswerChange={(ans) => onAnswer(section.id, q.id, ans)}
      />
    ))}
  </fieldset>
);

export default QuestionGroup;
