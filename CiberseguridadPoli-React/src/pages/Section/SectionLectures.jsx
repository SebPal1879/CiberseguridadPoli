import { Link } from "react-router-dom";
import LectureListItem from "./LectureListItem";
import { useState } from "react";
import useDynamicStyles from "../useDynamicStyles";

const styleRoutes = [
  "/styles/temp.css",
  "/styles/stylescursos.css",
  "/styles/all.min.css",
];
function SectionLectures({ data }) {
  const [loaded, setLoaded] = useState(false);
  useDynamicStyles(new Set(styleRoutes), setLoaded);
  if (!loaded) return;
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
          {data.map((el) =>
            el.available ? <LectureListItem lecture={el} key={el.id} /> : <></>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SectionLectures;
