import("../pages_css/css/styleslecciones.css");

function LectureContent({ content }) {
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
