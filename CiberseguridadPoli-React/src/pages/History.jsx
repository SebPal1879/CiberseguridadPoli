import Footer from "../components/Footer";
import useAuthFetching from "../api/useAuthFetching";
import { useState } from "react";
import Table from "../components/Table";
import DynamicPagesContent from "../components/DynamicPagesContent";
import useDynamicStyles from "../functions/useDynamicStyles";
import BACKEND_URL from "../functions/urls";

const BASE_URL = `${BACKEND_URL}/quiz/history`;
const KEY = "ciberpoli_token";
const styleRoutes = ["/styles/stylescursos.css", "/styles/all.min.css"];

function History() {
  const [response, setResponse] = useState("");

  useAuthFetching(KEY, BASE_URL, setResponse);
  const [loaded, setLoaded] = useState(false);
  useDynamicStyles(styleRoutes, setLoaded);
  if (!loaded) return;
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
