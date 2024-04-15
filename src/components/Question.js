import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [, setOnAnswered] = useState(onAnswered);

  // add useEffect code
  useEffect(() => {
    const timerId = setTimeout( () => {
      if (timeRemaining !== 0 ) { 
        setTimeRemaining(timeRemaining - 1)
       } else {
        setTimeRemaining(10);
        handleMissAnswer(false);
       } 
    },1000)
    
    return function cleanup(){
      clearTimeout(timerId);
    }


  })

  function handleMissAnswer (a) {
    onAnswered(a);
  }

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining </h5>
    </>
  );
}

export default Question;
