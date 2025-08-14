import LectureContent from "./LectureContent";
import { Link } from "react-router-dom";
import Help from "../../components/Help";
import useStyleUpdate from "../../functions/useStyleUpdate";
import { useStyles } from "../../contexts/StylesContext";

const styleRoutes = {
  styleRoutes: ["/styles/styleslecciones.css", "/styles/all.min.css"],
  requester: "LecturePanel",
};

function LecturePanel({
  ids,
  sectionName,
  completeSubmission,
  completed,
  data,
}) {
  useStyleUpdate(styleRoutes);
  const { hasLoadedStyles } = useStyles();

  if (!hasLoadedStyles) return;

  return (
    <main className="lesson-content">
      <div className="curso-breadcrumb">
        <Link to={`/learning/section/${ids}/`}>
          <i className="fas fa-arrow-left"></i> Volver a Unidades
        </Link>
      </div>
      <div className="container">
        <h2>
          <i className="fas fa-shield-alt"></i> {sectionName}
        </h2>

        <div className="accordion">
          {data.map((element) => (
            <LectureContent content={element} key={element.id} />
          ))}
        </div>
        {!completed && (
          <div className="contenedor">
            <div
              className="fin-leccion btn-ver-lecciones"
              onClick={completeSubmission}
            >
              <i className="fas "></i> He completado la lección.
            </div>
          </div>
        )}
      </div>
      <Help />
    </main>
  );
}

export default LecturePanel;
