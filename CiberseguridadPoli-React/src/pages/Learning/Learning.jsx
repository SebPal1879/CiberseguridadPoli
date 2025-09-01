import useAuthFetching from "../../api/useAuthFetching";
import CourseSectionContents from "./CourseSectionContents";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { API_URL } from "../../../urls.js";
import Loading from "../../components/Loading";
import useStyleUpdate from "../../functions/useStyleUpdate";

const KEY = "ciberpoli_token";
const BASE_URL = `${API_URL}/learning/`;

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Learning",
};

function Learning() {
  const hasLoadedStyles = useStyleUpdate(styleRoutes);
  const { response, loading } = useAuthFetching(KEY, BASE_URL);

  const data = response.status === 401 ? [] : response.data;
  if (!hasLoadedStyles) return;
  if (loading) return <Loading />;

  return (
    <div>
      <DynamicPagesContent
        responseStatus={response.status}
        component={<CourseSectionContents sections={data} />}
      />
    </div>
  );
}

export default Learning;
