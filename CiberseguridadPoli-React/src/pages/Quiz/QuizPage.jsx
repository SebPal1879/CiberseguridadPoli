import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import FinishScreen from "./FinishScreen";
import Container from "../../components/Container";
import Start from "./Start";
import Progress from "./Progress";
import Question from "./Question";
import Bottom from "./Bottom";
import { postRequest, getInformation } from "../../api/access.api";
import QuizHeader from "./QuizHeader";
import Error from "../../components/Error";
import useAccessStyles from "../../functions/useAccessStyles";
import { API_URL } from "../../../urls.js";
import useStyleUpdate from "../../functions/useStyleUpdate";
import { useStyles } from "../../contexts/StylesContext";

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
        questions: action.payload[0],
        quizName: action.payload[1].name,
        quizDescription: action.payload[1].description,
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
      const BASE_SUBMIT_URL = `${API_URL}/quiz/completion/${action.id}/`;
      const token = localStorage.getItem("ciberpoli_token");
      const score = (state.points / action.payload) * 5;
      async function submitResults() {
        const response = await postRequest(
          BASE_SUBMIT_URL,
          {
            score,
          },
          { Authorization: `Token ${token}` }
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

const styleRoutes = {
  styleRoutes: ["/styles/quizstyle.css"],
  requester: "QuizPage",
};
function QuizPage() {
  const initialState = {
    quizName: "",
    quizDescription: "",
    questions: [],
    index: 0,
    answer: null,
    points: 0,
    status: "ready",
    score: 0,
  };

  const [
    {
      quizName,
      quizDescription,
      questions,
      index,
      answer,
      points,
      status,
      score,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { id } = useParams();
  const BASE_FETCH_URL = `${API_URL}/quiz/${id}`;
  const token = localStorage.getItem("ciberpoli_token");

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
          const response = await getInformation(BASE_FETCH_URL, {
            Authorization: `Token ${token}`,
          });
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
  useAccessStyles();

  useStyleUpdate(styleRoutes);
  const { hasLoadedStyles } = useStyles();
  if (!hasLoadedStyles) return;
  return (
    <>
      <QuizHeader quizName={quizName} />
      <Container>
        {status === "error" && (
          <>
            <Error />
            <Link to="/">
              <>Volver al inicio</>
            </Link>
          </>
        )}
        {status === "ready" && (
          <Start dispatch={dispatch} description={quizDescription} />
        )}
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
