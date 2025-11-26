import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data";
import ProgressBar from "./ProgressBar";

function App() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionCard, setQuestionCard] = useState(0);

  function handleShowAnswer() {
    setShowAnswer((prevIndex) => !prevIndex);
  }

  function handleNextQuestionCard() {
    setShowAnswer(false);
    setQuestionCard((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
    console.log(progressPercentage);
  }

  function handlePreviousQuestionCard() {
    setShowAnswer(false);
    setQuestionCard((prevIndex) => {
      if (prevIndex === 0) return 0;
      return prevIndex - 1;
    });

    console.log(progressPercentage);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight") {
        handleNextQuestionCard();
      }
      if (e.key === "ArrowLeft") {
        handlePreviousQuestionCard();
      }
      if (e.key === "Enter") {
        setShowAnswer((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const progressPercentage = Math.round(
    ((questionCard + 1) / data.length) * 100
  );

  return (
    <>
      <div className="main-container">
        <ProgressBar
          total={data.length}
          currentQuestion={questionCard}
          progressPercentage={progressPercentage}
        />
        <div className="card-container">
          <div className="text-container">
            {showAnswer ? (
              <p className="question-text">{data[questionCard].answer}</p>
            ) : (
              <p className="question-text">{data[questionCard].question}</p>
            )}
          </div>
          <div className="button-bar">
            <button className="btn" onClick={handlePreviousQuestionCard}>
              Previous
            </button>
            <button className="btn" onClick={handleShowAnswer}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            <button className="btn" onClick={handleNextQuestionCard}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
