function CourseSectionAside() {
  return (
    <div>
      {" "}
      <aside className="unidades-sidebar">
        <div className="sidebar-card">
          <h4>
            <i className="fas fa-info-circle"></i> Sobre este curso
          </h4>
          <p>
            Este curso consta de 5 unidades con un total de 13 lecciones que
            cubren todos los aspectos fundamentales de protección de datos
            personales.
          </p>

          <div className="curso-progress">
            <h5>Tu progreso:</h5>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: "25%" }}></div>
              <span>25% completado</span>
            </div>
          </div>
        </div>

        <div className="sidebar-card">
          <h4>
            <i className="fas fa-trophy"></i> Logros disponibles
          </h4>
          <ul className="logros-list">
            <li>
              <i className="fas fa-medal" style={{ color: "#cd7f32" }}></i>
              <span>Completar Unidad 1</span>
            </li>
            <li>
              <i className="fas fa-medal" style={{ color: "#c0c0c0" }}></i>
              <span>Completar 5 lecciones</span>
            </li>
            <li>
              <i className="fas fa-medal" style={{ color: "#ffd700" }}></i>
              <span>Completar todas las unidades</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-card">
          <h4>
            <i className="fas fa-question-circle"></i> ¿Necesitas ayuda?
          </h4>
          <p>
            Si tienes dudas sobre alguna unidad o lección, no dudes en contactar
            a nuestros instructores.
          </p>
          <a
            href="ayuda.html"
            className="btn-secondary"
            style={{ marginTop: "15px", display: "inline-block" }}
          >
            <i className="fas fa-envelope"></i> Contactar soporte
          </a>
        </div>
      </aside>
    </div>
  );
}

export default CourseSectionAside;
