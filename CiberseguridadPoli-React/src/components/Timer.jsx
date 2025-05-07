import { useEffect } from "react";
import { useState } from "react";

const MAX_SECONDS = 2;

function Timer({ dispatch }) {
  const [time, setTime] = useState(MAX_SECONDS);
  const mins = Math.floor(time / 60);
  const seconds = time % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        setTime((current) => current - 1);
      }, 1000);
      return () => clearInterval(id);
    },
    [setTime]
  );
  useEffect(
    function () {
      if (time === 0) {
        dispatch({ type: "finish" });
      }
    },
    [time, dispatch]
  );
  return (
    <div className="timer">
      <p>
        <strong>
          {mins < 0 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds} left
        </strong>
      </p>
    </div>
  );
}

export default Timer;
