import { useState } from "react";

function HelpItem({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="faq-item">
      <button
        className={`faq-question ${showAnswer ? "active" : ""}`}
        onClick={() => setShowAnswer((showAnswer) => !showAnswer)}
      >
        <i className="fas fa-angle-right"></i>
        <span>{question}</span>
      </button>
      <div className={`faq-answer ${showAnswer ? "active" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default HelpItem;
