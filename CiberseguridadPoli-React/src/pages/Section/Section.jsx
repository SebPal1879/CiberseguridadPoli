import { useParams } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import SectionLectures from "./SectionLectures";
import { API_URL } from "../../../urls.js";
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
  const hasLoadedStyles = useStyleUpdate(styleRoutes);
  const { id } = useParams();
  const BASE_URL = `${API_URL}/learning/section/${id}/`;
  const { response } = useAuthFetching(KEY, BASE_URL);
  console.log(response);
  if (!hasLoadedStyles) return;

  const data = response.status === 401 ? [] : response.data;
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
