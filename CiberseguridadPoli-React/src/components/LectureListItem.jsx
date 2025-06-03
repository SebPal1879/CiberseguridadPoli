import { Link } from "react-router-dom";

function LectureListItem({ lecture, className = "" }) {
  return (
    <li>
      <i className={`far fa-play-circle ${className}`}></i>
      <div>
        <h5>{lecture.name}</h5>
        <p>{lecture.description}</p>
        {lecture.completed && (
          <p style={{ color: "#009752" }}>Ya has completado esta lección</p>
        )}
      </div>
      <Link
        to={`lecture/${lecture.id}`}
        className="auto-left btn btn-ver-lecciones"
      >
        <i></i> Ver contenido de la lección
      </Link>
    </li>
  );
}

export default LectureListItem;
