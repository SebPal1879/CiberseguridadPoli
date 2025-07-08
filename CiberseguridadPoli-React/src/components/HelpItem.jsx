import { useState } from "react";

function HelpItem({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div class="faq-item">
      <button
        class={`faq-question ${showAnswer ? "active" : ""}`}
        onClick={() => setShowAnswer((showAnswer) => !showAnswer)}
      >
        <i class="fas fa-angle-right"></i>
        <span>{question}</span>
      </button>
      <div class={`faq-answer ${showAnswer ? "active" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default HelpItem;
