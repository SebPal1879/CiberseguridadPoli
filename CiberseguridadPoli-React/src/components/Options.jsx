function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  console.log(hasAnswered);
  return (
    <div className="options">
      {question.options.map((el, i) => (
        <div key={i}>
          <button
            className={`answer ${
              i === question.correctOption && hasAnswered ? "correct" : ""
            } ${i !== question.correctOption && hasAnswered ? "wrong" : ""}`}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            disabled={hasAnswered}
          >
            {el}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Options;
