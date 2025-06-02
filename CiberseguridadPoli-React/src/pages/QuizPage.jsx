import { useEffect, useReducer } from "react";
import Header from "../components/QuizHeader";
import Container from "../components/Container";
import Start from "../components/Start";
import Progress from "../components/Progress";
import Question from "../components/Question";
import Bottom from "../components/Bottom";
import { getAll } from "../api/access.api";

function reducer(state, action) {
  switch (action.type) {
    case "awaiting":
      return {
        ...state,
        status: "loading",
      };
    case "received":
      console.log(action.payload);
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer": {
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points: action.payload ? state.points + question.points : state.points,
      };
    }
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "results",
      };
    default: {
      throw new Error("Acción desconocida");
    }
  }
}

function QuizPage() {
  const initialState = {
    questions: [],
    index: 0,
    answer: null,
    points: 0,
    status: "ready",
  };

  const [{ questions, index, answer, points, status }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function loadQuiz() {
      dispatch({ type: "awaiting" });
      await getAll(1)
        .then((res) => dispatch({ type: "received", payload: res.data }))
        .catch((error) => {
          throw new Error(error);
        });
    }
    loadQuiz();
  }, []);

  const maxQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  return (
    <>
      <Header />
      <Container>
        {status === "ready" && <Start dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              maxQuestions={maxQuestions}
              actual={index}
              currentPoints={points}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Bottom
              dispatch={dispatch}
              answer={answer}
              index={index}
              maxQuestions={maxQuestions}
            />
          </>
        )}
        {status === "results" && <p>Ha terminado</p>}
      </Container>
    </>
  );
}

export default QuizPage;
