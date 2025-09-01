function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.answers.map((answer, i) => (
        <div key={i}>
          <button
            className={`answer ${
              answer.is_correct && hasAnswered ? "correct" : ""
            } ${!answer.is_correct && hasAnswered ? "wrong" : ""}`}
            onClick={() =>
              dispatch({ type: "newAnswer", payload: answer.is_correct })
            }
            disabled={hasAnswered}
          >
            {answer.answer}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Options;
