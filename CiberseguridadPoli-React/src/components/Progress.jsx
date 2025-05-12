function Progress({ actual, maxQuestions, currentPoints, maxPoints }) {
  return (
    <div className="progress">
      <progress max={maxQuestions} value={actual}></progress>
      <p>
        Question {actual + 1} of {maxQuestions}
      </p>
      <p>
        <em>
          <strong>{currentPoints}</strong> points out of {maxPoints}
        </em>
      </p>
    </div>
  );
}

export default Progress;
