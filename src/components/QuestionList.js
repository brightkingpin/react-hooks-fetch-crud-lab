import React, { useState, useEffect } from "react";
import QuestionItem from './QuestionItem';


function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error));
  }, []);

  function handleDelete (id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  function handleAnswerChange (id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((response) => response.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if(q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions);
    });
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
