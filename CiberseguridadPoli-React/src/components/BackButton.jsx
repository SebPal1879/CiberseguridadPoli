import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="back-btn">
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Atrás
      </button>
    </div>
  );
}

export default BackButton;
