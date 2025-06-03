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
      {lecture.available ? (
        <Link to={`lecture/${lecture.id}`} className="auto-left">
          <button className="temp-btn">Ver lección</button>
        </Link>
      ) : (
        <Link to={`lecture/${lecture.id}`} className="auto-left">
          <i className="fas "></i> He completado la lección.
        </Link>
      )}
    </li>
  );
}

export default LectureListItem;
