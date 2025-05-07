import Timer from "./Timer";

function Bottom({ dispatch, answer, index, maxQuestions }) {
  if (index < maxQuestions - 1) {
    return (
      <div className="bottom-row">
        <Timer dispatch={dispatch} />

        <div className="next">
          <button
            className={`main-button ${answer === null ? "disabled" : ""}`}
            onClick={() => dispatch({ type: "next" })}
            disabled={answer === null}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  if (index === maxQuestions - 1) {
    return (
      <div className="next">
        <button
          className="main-button"
          onClick={() => dispatch({ type: "next" })}
        >
          Finish
        </button>
      </div>
    );
  }
}

export default Bottom;
