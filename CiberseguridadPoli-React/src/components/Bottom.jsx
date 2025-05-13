import Timer from "./Timer";

function Bottom({ dispatch, answer, index, maxQuestions }) {
  return (
    <div className="bottom-row">
      <Timer dispatch={dispatch} />
      {index === maxQuestions - 1 ? (
        <div className="next">
          <button
            className="main-button"
            onClick={() => dispatch({ type: "results" })}
          >
            Finish
          </button>
        </div>
      ) : (
        <div className="next">
          <button
            className={`main-button ${answer === null ? "disabled" : ""}`}
            onClick={() => dispatch({ type: "next" })}
            disabled={answer === null}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Bottom;
