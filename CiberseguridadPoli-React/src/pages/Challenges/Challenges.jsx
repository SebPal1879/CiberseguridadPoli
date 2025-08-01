import { useState } from "react";
import useAuthFetching from "../../api/useAuthFetching";
import AvailableChallengeInfo from "./AvailableChallengeInfo";
import ChallengeOverview from "./ChallengeOverview";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import BACKEND_URL from "../../functions/urls";

const KEY = "ciberpoli_token";
const BASE_URL = `${BACKEND_URL}quiz/`;

function Challenges() {
  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 200 ? response.data : [];
  console.log(response);
  return (
    <div>
      <DynamicPagesContent
        responseStatus={response.status}
        component={
          <div className="content-wrapper">
            <AvailableChallengeInfo>
              {data.map((element) => (
                <ChallengeOverview key={element.id} data={element} />
              ))}
            </AvailableChallengeInfo>
          </div>
        }
        customErrorMessage={"Completa lecciones para desbloquear esta sección"}
      />
    </div>
  );
}

export default Challenges;
