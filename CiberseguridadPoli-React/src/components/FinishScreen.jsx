import { Link } from "react-router-dom";

function FinishScreen({ score }) {
  return (
    <div>
      <p>
        <strong>Puntaje: </strong> {score}
      </p>
      <Link to="/challenges">
        <p>Volver a desafíos</p>
      </Link>
    </div>
  );
}

export default FinishScreen;
