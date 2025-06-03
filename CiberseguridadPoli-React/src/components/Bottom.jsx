import Timer from "./Timer";

function Bottom({ dispatch, answer, index, maxQuestions, maxPoints, quizId }) {
  return (
    <div className="bottom-row">
      <Timer dispatch={dispatch} />
      {index === maxQuestions - 1 ? (
        <div className="next">
          <button
            className="main-button"
            onClick={() =>
              dispatch({ type: "finish", payload: maxPoints, id: quizId })
            }
          >
            Terminar
          </button>
        </div>
      ) : (
        <div className="next">
          <button
            className={`main-button ${answer === null ? "disabled" : ""}`}
            onClick={() => dispatch({ type: "next" })}
            disabled={answer === null}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default Bottom;
