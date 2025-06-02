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

        <div className="lecciones-preview">
          <h4>
            <i className="fas fa-list-ol"></i> Lecciones:
          </h4>
          <ul className="lecciones-list">
            <li>
              <i className="far fa-play-circle"></i>
              <div>
                <h5>1.1 Introducción a la protección de datos</h5>
                <p>Conceptos básicos y evolución histórica</p>
              </div>
            </li>
            <li>
              <i className="far fa-file-alt"></i>
              <div>
                <h5>1.2 Marco legal en Colombia</h5>
                <p>Ley 1581 de 2012 y regulaciones complementarias</p>
              </div>
            </li>
            <li>
              <i className="fas fa-chart-bar"></i>
              <div>
                <h5>1.3 Principios de protección de datos</h5>
                <p>Legalidad, finalidad, veracidad y más</p>
              </div>
            </li>
          </ul>
        </div>

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
