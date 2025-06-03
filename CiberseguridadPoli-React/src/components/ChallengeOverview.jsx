import { Link } from "react-router-dom";

function ChallengeOverview({ data }) {
  return (
    <div className="unidad-card">
      <div className="unidad-header">
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
          <Link to={`${data.id}`} className="btn btn-ver-lecciones">
            <i className="fas fa-eye"></i> Abrir desafío
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChallengeOverview;
