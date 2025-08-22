import { useParams } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import SectionLectures from "./SectionLectures";
import { BACKEND_URL } from "../../functions/urls";
import { useStyles } from "../../contexts/StylesContext";
import useStyleUpdate from "../../functions/useStyleUpdate";

const KEY = "ciberpoli_token";

const styleRoutes = {
  styleRoutes: [
    "/styles/stylescursos.css",
    "/styles/all.min.css",
    "/styles/temp.css",
  ],
  requester: "Section",
};

function Section() {
  const { id } = useParams();
  const BASE_URL = `${BACKEND_URL}/learning/section/${id}/`;
  const { response } = useAuthFetching(KEY, BASE_URL);
  const data = response.status === 401 ? [] : response.data;
  useStyleUpdate(styleRoutes);
  const { hasLoadedStyles } = useStyles();

  if (!hasLoadedStyles) return;
  return (
    <>
      <DynamicPagesContent
        responseStatus={response.status}
        component={<SectionLectures data={data} />}
      />
    </>
  );
}

export default Section;
