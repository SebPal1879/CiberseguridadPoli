import useAuthFetching from "../api/useAuthFetching";
import Table from "../components/Table";
import DynamicPagesContent from "../components/DynamicPagesContent";
import { API_URL } from "../../urls.js";
import useStyleUpdate from "../functions/useStyleUpdate";

const BASE_URL = `${API_URL}/quiz/history`;
const KEY = "ciberpoli_token";
const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "History",
};

function History() {
  const { response } = useAuthFetching(KEY, BASE_URL);
  const hasLoadedStyles = useStyleUpdate(styleRoutes);
  if (!hasLoadedStyles) return;

  const data = response.status === 200 ? response.data : [];

  return (
    <>
      <DynamicPagesContent
        responseStatus={response.status}
        component={<Table data={data} />}
        customErrorMessage={"Completa quizzes para ver resultados."}
      />
    </>
  );
}

export default History;
