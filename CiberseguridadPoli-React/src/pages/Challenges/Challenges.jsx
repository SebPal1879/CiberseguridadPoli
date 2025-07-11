import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import useAuthFetching from "../../api/useAuthFetching";
import AvailableChallengeInfo from "./AvailableChallengeInfo";
import ChallengeOverview from "./ChallengeOverview";
import { useDynamicImports } from "../useDynamicImports";
import DynamicPagesContent from "../../components/DynamicPagesContent";

const KEY = "ciberpoli_token";
const BASE_URL = "http://127.0.0.1:8000/quiz/";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/all.min.css",
];

function Challenges() {
  const location = useLocation();
  const [response, setResponse] = useState("");
  useDynamicImports(styleRoutes, location.pathname);

  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 200 ? response.data : [];

  return (
    <div>
      <DynamicPagesContent
        response={response.status}
        component={
          <div className="content-wrapper">
            <AvailableChallengeInfo>
              {data.map((element) => (
                <ChallengeOverview data={element} />
              ))}
            </AvailableChallengeInfo>
          </div>
        }
        customErrorMessage={"Completa lecciones para desbloquear esta sección"}
      />

      <Footer />
    </div>
  );
}

export default Challenges;
