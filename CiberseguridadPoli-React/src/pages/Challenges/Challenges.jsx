import useAuthFetching from "../../api/useAuthFetching";
import AvailableChallengeInfo from "./AvailableChallengeInfo";
import ChallengeOverview from "./ChallengeOverview";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { API_URL } from "../../../urls.js";
import Loading from "../../components/Loading";
import useStyleUpdate from "../../functions/useStyleUpdate";

const KEY = "ciberpoli_token";
const BASE_URL = `${API_URL}/quiz/`;

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Challenges",
};

function Challenges() {
  const hasLoadedStyles = useStyleUpdate(styleRoutes);

  const { response, loading } = useAuthFetching(KEY, BASE_URL);

  if (loading) return <Loading />;
  const data = response.status === 200 ? response.data : [];
  if (!hasLoadedStyles) return;
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
