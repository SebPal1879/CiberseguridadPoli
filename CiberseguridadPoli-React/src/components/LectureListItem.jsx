import { Link } from "react-router-dom";

function LectureListItem({ lecture, className = "" }) {
  return (
    <li>
      <i className={`far fa-play-circle ${className}`}></i>
      <div>
        <h5>{lecture.name}</h5>
        <p>{lecture.description}</p>
      </div>
      <Link to={`lecture/${lecture.id}`} className="auto-left">
        <button className="temp-btn">Ver lección</button>
      </Link>
    </li>
  );
}

export default LectureListItem;
