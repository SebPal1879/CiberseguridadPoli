import { Link } from "react-router-dom";

function SectionCard({ data }) {
  return (
    <div className="unidad-card">
      <div className="unidad-header">
        <div className="unidad-number-container">
          <div className="unidad-number">1</div>
        </div>
        <div className="unidad-title-container">
          <h3>{data.name}</h3>
          <div className="unidad-status">
            <i className="fas fa-lock-open"></i> Disponible
          </div>
        </div>
      </div>
      <div className="unidad-content">
        <p className="unidad-desc">{data.description}</p>

        <div className="unidad-footer">
          <div className="unidad-meta">
            <span>
              <i className="far fa-clock"></i> 6 horas estimadas
            </span>
            <span>
              <i className="fas fa-book"></i> 3 lecciones
            </span>
            <span>
              <i className="fas fa-tasks"></i> 1 evaluación
            </span>
          </div>
          <Link to={`section/${data.id}`} className="btn btn-ver-lecciones">
            <i className="fas fa-eye"></i> Ver lecciones
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SectionCard;
