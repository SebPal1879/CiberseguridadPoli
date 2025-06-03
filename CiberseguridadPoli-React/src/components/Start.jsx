function Start({ dispatch, description }) {
  return (
    <div className="start">
      <p>{description}</p>
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
