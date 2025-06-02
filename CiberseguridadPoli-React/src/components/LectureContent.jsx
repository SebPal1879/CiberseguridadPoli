function LectureContent({ content }) {
  return (
    <div className="accordion-item open">
      <button className="accordion-header">
        <i className="fas fa-lock-open"></i>
        <span className="arrow">
          <i className="fas fa-chevron-down"></i>
        </span>
      </button>
      <div className="accordion-body">
        <p>{content.content}</p>
      </div>
    </div>
  );
}

export default LectureContent;
