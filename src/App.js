import React, { useState } from "react";
import "./App.css";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Answers from "./components/Answers";
import {
  HOOKS_QUESTIONS,
  GENERAL_QUESTIONS,
  STEPHEN_QUESTIONS,
} from "./questionBank";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  const [start, setStart] = useState(false);

  const [questions, setQuestions] = useState(HOOKS_QUESTIONS);

  const question = questions[currentQuestion];

  const handleClick = (e) => {
    setCurrentAnswer(e.target.value);
    setError("");
  };

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className="correct">Correct</span>;
    }
    return <span className="failed">Incorrect</span>;
  };

  const renderResultData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    setAnswers([]);
    setCurrentAnswer("");
    setCurrentQuestion(0);
    setShowResults(false);
    setStart(false);
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };

    if (!currentAnswer) {
      setError("Please setect an answer.");
      return;
    }
    answers.push(answer);
    setAnswers(answers);
    setCurrentAnswer("");
    console.log(currentAnswer);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }
    setShowResults(true);
  };

  const startUpHooks = () => {
    setStart(true);
    setQuestions(questions);
  };

  const startUpGeneral = () => {
    setStart(true);
    setQuestions(GENERAL_QUESTIONS);
  };

  const startUpStephen = () => {
    setStart(true);
    setQuestions(STEPHEN_QUESTIONS);
  };

  if (!start) {
    return (
      <div className="container results">
        <h2>Select a Quiz</h2>
        <button className="btn btn-primary" onClick={startUpHooks}>
          React Hooks
        </button>
        <button className="btn btn-primary" onClick={startUpGeneral}>
          General
        </button>
        <button className="btn btn-primary" onClick={startUpStephen}>
          Silly
        </button>
      </div>
    );
  } else if (showResults) {
    return (
      <div className="container results">
        <h2>Results</h2>
        <ul>{renderResultData()}</ul>
        <button className="btn btn-primary" onClick={restart}>
          Back to quiz select
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Progress total={questions.length} current={currentQuestion + 1} />
        <Question question={question.question} />
        {renderError()}
        <Answers
          question={question}
          currentAnswer={currentAnswer}
          handleClick={handleClick}
        />
        <button className="btn btn-primary" onClick={next}>
          Submit
        </button>
      </div>
    );
  }
}

export default App;
