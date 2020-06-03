import React, { useState } from "react";
import "./App.css";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Answers from "./components/Answers";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  const [start, setStart] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Which statement about Hooks is not true?",
      answer_a:
        "Hooks are 100% backwards-compatible and can be used side by side with classes",
      answer_b: "Hooks are still in beta and not available yet",
      answer_c:
        "Hooks are completely opt-in, there's no need to rewrite existing code",
      answer_d: "All of the above",
      correct_answer: "b",
    },
    {
      id: 2,
      question: "Which one is not a Hook?",
      answer_a: "useState()",
      answer_b: "useConst()",
      answer_c: "useReducer()",
      answer_d: "All of the above",
      correct_answer: "b",
    },
    {
      id: 3,
      question: "What Hook should be used for data fetching?",
      answer_a: "useDataFetching()",
      answer_b: "useApi()",
      answer_c: "useEffect()",
      answer_d: "useRequest()",
      correct_answer: "c",
    },
  ]);

  const StephenQuestions = [
    {
      id: 1,
      question: "What is the name of Stephen's dog?",
      answer_a: "Finn",
      answer_b: "Jake",
      answer_c: "Fluffy",
      answer_d: "He doesn't have a dog",
      correct_answer: "b",
    },
    {
      id: 2,
      question: "When is Stephen's birthday?",
      answer_a: "January 1, 1990",
      answer_b: "Febuary 12, 1992",
      answer_c: "April 21, 1992",
      answer_d: "He wasn't born",
      correct_answer: "c",
    },
    {
      id: 3,
      question: "How many siblings does Stephen have?",
      answer_a: "1",
      answer_b: "2",
      answer_c: "3",
      answer_d: "4",
      correct_answer: "c",
    },
  ];

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

  const startUpStephen = () => {
    setStart(true);
    setQuestions(StephenQuestions);
  };
  const startUpReact = () => {
    setStart(true);
    setQuestions(questions);
  };

  if (!start) {
    return (
      <div className="container results">
        <h2>Select a Quiz</h2>
        <button className="btn btn-primary" onClick={startUpReact}>
          React
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
