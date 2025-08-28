import useAuthFetching from "../../api/useAuthFetching";
import { useNavigate, useParams } from "react-router-dom";
import { postRequest } from "../../api/access.api";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import LecturePanel from "./LecturePanel";
import { BACKEND_URL } from "../../functions/urls";
import useStyleUpdate from "../../functions/useStyleUpdate";

const KEY = "ciberpoli_token";

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Lecture",
};

function Lecture() {
  const hasLoadedStyles = useStyleUpdate(styleRoutes);

  const navigate = useNavigate();

  const { ids, idl } = useParams();
  const BASE_URL = `${BACKEND_URL}/learning/section/${ids}/lecture/${idl}/`;
  const { response } = useAuthFetching(KEY, BASE_URL);

  const data = response.status === 200 ? response.data[0] : [];
  const sectionName = response.status === 200 ? response.data[1].name : "";
  const completed =
    response.status === 200 ? response.data[2].is_completed : "";

  async function completeSubmission() {
    const token = localStorage.getItem("ciberpoli_token");
    const response = await postRequest(
      BASE_URL,
      {},
      { Authorization: `Token ${token}` }
    );
    if (response.status === 200) {
      alert("Se ha completado la lección exitosamente");
      navigate(`/learning/section/${ids}/`);
    } else {
      alert("Ha ocurrido un error");
    }
    console.log(response);
  }

  if (!hasLoadedStyles) return;

  return (
    <>
      <DynamicPagesContent
        responseStatus={response.status}
        component={
          <LecturePanel
            ids={ids}
            sectionName={sectionName}
            completeSubmission={completeSubmission}
            completed={completed}
            data={data}
          />
        }
      />
    </>
  );
}

export default Lecture;
