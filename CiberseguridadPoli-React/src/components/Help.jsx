import { Link } from "react-router-dom";
function Help() {
  return (
    <div className="sidebar-card">
      <h4>
        <i className="fas fa-question-circle"></i> ¿Necesitas ayuda?
      </h4>
      <p>
        Si tienes dudas sobre alguna unidad o lección, no dudes en contactar a
        nuestros instructores.
      </p>
      <Link
        to={"/help-center"}
        className="btn-secondary"
        style={{ marginTop: "15px", display: "inline-block" }}
      >
        <i className="fas fa-envelope"></i> Contactar soporte
      </Link>
    </div>
  );
}

export default Help;
