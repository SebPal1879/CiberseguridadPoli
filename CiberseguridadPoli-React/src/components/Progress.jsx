function Progress({ actual, maxQuestions, currentPoints, maxPoints }) {
  return (
    <div className="progress">
      <progress max={maxQuestions} value={actual}></progress>
      <p>
        Pregunta {actual + 1} de {maxQuestions}
      </p>
      <p>
        <em>
          <strong>{currentPoints}</strong> puntos de {maxPoints}
        </em>
      </p>
    </div>
  );
}

export default Progress;
