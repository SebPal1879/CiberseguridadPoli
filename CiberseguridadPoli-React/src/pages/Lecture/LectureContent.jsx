import { useLocation } from "react-router-dom";
import { useDynamicImports } from "../useDynamicImports";

const styleRoutes = ["/styles/styleslecciones.css"];
function LectureContent({ content }) {
  const location = useLocation();
  useDynamicImports(styleRoutes, location.pathname);
  return (
    <div className="accordion-item open">
      <button className="accordion-header">
        <i className="fas fa-lock-open"></i>
        {content.content_in_lecture_number}.&nbsp;{content.content}
        <span className="arrow">
          <i className="fas fa-chevron-down"></i>
        </span>
      </button>
      <div className="accordion-body">
        <p>{content.content}</p>
        {content.image_path && <img src="" />}
      </div>
    </div>
  );
}

export default LectureContent;
