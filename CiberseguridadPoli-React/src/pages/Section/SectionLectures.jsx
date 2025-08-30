import { Link } from "react-router-dom";
import LectureListItem from "./LectureListItem";

function SectionLectures({ data }) {
  return (
    <div className="lecciones-preview">
      <div className="temp">
        <Link to={"/learning"}>
          <i className="fas fa-arrow-left"></i> Volver a Secciones
        </Link>
        <h4>
          <i className="fas fa-list-ol"></i> Lecciones:
        </h4>
        <ul className="lecciones-list">
          {data.map((el) => (
            <LectureListItem lecture={el} key={el.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SectionLectures;
