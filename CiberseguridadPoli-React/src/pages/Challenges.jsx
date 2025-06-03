import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuthFetching from "../api/useAuthFetching";
import AvailableChallengeInfo from "../components/AvailableChallengeInfo";
import ChallengeOverview from "../components/ChallengeOverview";

const KEY = "ciberpoli_token";
const BASE_URL = "http://127.0.0.1:8000/quiz/";

function Challenges() {
  const location = useLocation();
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/challenges")) {
      import("../pages_css/css/stylescursos.css");

      import("../pages_css/css/all.min.css");
    }
  }, [location]);

  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 200 ? response.data : [];

  return (
    <div>
      <Header />
      <div className="content-wrapper">
        {response.status === 400 && <>Algo salió mal</>}
        {response.status === 200 && (
          <AvailableChallengeInfo>
            {data.map((element) => (
              <ChallengeOverview data={element} />
            ))}
          </AvailableChallengeInfo>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Challenges;
