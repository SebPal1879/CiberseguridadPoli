import useAuthFetching from "../../api/useAuthFetching";
import AvailableChallengeInfo from "./AvailableChallengeInfo";
import ChallengeOverview from "./ChallengeOverview";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { BACKEND_URL } from "../../functions/urls";
import Loading from "../../components/Loading";
import useStyleUpdate from "../../functions/useStyleUpdate";
import { useStyles } from "../../contexts/StylesContext";

const KEY = "ciberpoli_token";
const BASE_URL = `${BACKEND_URL}/quiz/`;

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Challenges",
};

function Challenges() {
  useStyleUpdate(styleRoutes);
  const { hasLoadedStyles } = useStyles();

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
