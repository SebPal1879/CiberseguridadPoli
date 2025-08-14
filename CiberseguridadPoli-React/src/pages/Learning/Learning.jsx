import useAuthFetching from "../../api/useAuthFetching";
import CourseSectionContents from "./CourseSectionContents";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import BACKEND_URL from "../../functions/urls";
import Loading from "../../components/Loading";
import useStyleUpdate from "../../functions/useStyleUpdate";

const KEY = "ciberpoli_token";
const BASE_URL = `${BACKEND_URL}/learning/`;

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Learning",
};

function Learning() {
  useStyleUpdate(styleRoutes);
  const { response, loading } = useAuthFetching(KEY, BASE_URL);

  if (loading) return <Loading />;

  const data = response.status === 401 ? [] : response.data;
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
