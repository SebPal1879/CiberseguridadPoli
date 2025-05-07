function Start({ dispatch }) {
  return (
    <div className="start">
      <p>En este quiz, pondrás tus habilidades a prueba sobre ejemplo</p>
      <button
        className="main-button"
        onClick={() => dispatch({ type: "start" })}
      >
        Empezar ahora
      </button>
    </div>
  );
}

export default Start;
