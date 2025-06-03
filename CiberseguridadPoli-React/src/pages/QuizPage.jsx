import { useEffect, useReducer } from "react";
import { useLocation, useParams } from "react-router-dom";
import FinishScreen from "../components/FinishScreen";
import Header from "../components/QuizHeader";
import Container from "../components/Container";
import Start from "../components/Start";
import Progress from "../components/Progress";
import Question from "../components/Question";
import Bottom from "../components/Bottom";
import { useDynamicImports } from "./useDynamicImports";
import { postRequest, getInformation } from "../api/access.api";

function reducer(state, action) {
  switch (action.type) {
    case "waiting":
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
    case "finish": {
      console.log(action.id);
      const BASE_SUBMIT_URL = `http://127.0.0.1:8000/quiz/completion/${action.id}/`;
      const token = localStorage.getItem("ciberpoli_token");
      const score = (state.points / action.payload) * 5;
      async function submitResults() {
        const response = await postRequest(
          BASE_SUBMIT_URL,
          {
            score,
          },
          token
        );
        if (response.status === 201) {
          return {
            ...state,
            status: "submitted",
          };
        }
      }
      submitResults();
      return {
        ...state,
        status: "results",
        score,
      };
    }
    case "error": {
      return {
        ...state,
        status: "error",
      };
    }
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
    score: 0,
  };

  const [{ questions, index, answer, points, status, score }, dispatch] =
    useReducer(reducer, initialState);

  const { id } = useParams();
  const location = useLocation();
  const BASE_FETCH_URL = `http://127.0.0.1:8000/quiz/${id}`;
  const token = localStorage.getItem("ciberpoli_token");
  useDynamicImports(["/src/pages_css/css/quizstyle.css"], location.pathname);

  useEffect(
    function () {
      async function loadQuiz() {
        dispatch({ type: "waiting" });
        // await getAll(id)
        //   .then((res) => dispatch({ type: "received", payload: res.data }))
        //   .catch((error) => {
        //     throw new Error(error);
        //   });
        try {
          const response = await getInformation(BASE_FETCH_URL, token);
          dispatch({ type: "received", payload: response.data });
        } catch {
          dispatch({ type: "error" });
        }
      }
      loadQuiz();
    },
    [BASE_FETCH_URL, token]
  );

  const maxQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  return (
    <>
      <Header />
      <Container>
        {status === "error" && <>Hubo un error</>}
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
              maxPoints={maxPoints}
              quizId={id}
            />
          </>
        )}
        {status === "results" && <FinishScreen score={score} />}
      </Container>
    </>
  );
}

export default QuizPage;
