function InsideSection({ data }) {
  return (
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
  );
}

export default InsideSection;
