import React, { useState, useEffect } from 'react';
import CameraPermission from '../components/CameraPermission';
import './Test.css';  // Import the CSS file

const generateRandomQuestions = () => {
  const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], correct: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris"], correct: 2 },
    { question: "What color is the sky?", options: ["Blue", "Green", "Red"], correct: 0 },
    { question: "How many days are in a week?", options: ["5", "6", "7"], correct: 2 },
    { question: "What is the square root of 9?", options: ["1", "3", "4"], correct: 1 },
    
  ];

  // Shuffle the questions array
  return questions.sort(() => Math.random() - 0.5);
};

function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const shuffledQuestions = generateRandomQuestions();
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerChange = (index) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = index;
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    const score = responses.reduce((total, response, index) => {
      return total + (response === questions[index].correct ? 1 : 0);
    }, 0);
    
    alert(`You scored ${score} out of ${questions.length}`);
    // Implement redirection or other logic after submitting
  };

  return (
    <div className="test-container">
      <CameraPermission />
      <div className="question-container">
        {questions.length > 0 ? (
          <>
            <h3 className="question">{questions[currentQuestion]?.question}</h3>
            <div className="options">
              {questions[currentQuestion]?.options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    name="option"
                    checked={responses[currentQuestion] === index}
                    onChange={() => handleAnswerChange(index)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <div className="navigation-buttons">
              <button 
                className="nav-button" 
                onClick={() => setCurrentQuestion(currentQuestion - 1)} 
                disabled={currentQuestion === 0}>
                Previous
              </button>
              <button 
                className="nav-button" 
                onClick={() => setCurrentQuestion(currentQuestion + 1)} 
                disabled={currentQuestion === questions.length - 1}>
                Next
              </button>
              {currentQuestion === questions.length - 1 && (
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
              )}
            </div>
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
}

export default Test;
