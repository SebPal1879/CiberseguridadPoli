function Table({ data }) {
  return (
    <div className="content-wrapper">
      <main className="main-content">
        <section className="quiz-history-section">
          <div className="container">
            <h2>
              <i className="fas fa-clipboard-list"></i> Historial de Quizzes
            </h2>
            <table className="quiz-history-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Calificación</th>
                  <th>Fecha del intento</th>
                </tr>
              </thead>
              <tbody id="quiz-history-body">
                {data.map((element) => (
                  <tr>
                    <td>{element.quiz}</td>
                    <td>{element.score}</td>
                    <td>{element.attempt_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Table;
