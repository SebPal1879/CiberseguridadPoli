import { Link, useLocation } from "react-router-dom";
import LectureListItem from "./LectureListItem";
import { useDynamicImports } from "../pages/useDynamicImports";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/temp.css",
  "/src/pages_css/css/all.min.css",
];
function SectionLectures({ data }) {
  const location = useLocation();
  useDynamicImports(styleRoutes, location.pathname);

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
