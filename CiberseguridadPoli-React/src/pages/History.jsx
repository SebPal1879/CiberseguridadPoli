import Footer from "../components/Footer";
import useAuthFetching from "../api/useAuthFetching";
import { useState } from "react";
import Table from "../components/Table";
import DynamicPagesContent from "../components/DynamicPagesContent";
import useDynamicStyles from "./useDynamicStyles";

const BASE_URL = "https://ciberseguridadpoli.onrender.com/quiz/history";
const KEY = "ciberpoli_token";
const styleRoutes = ["/styles/stylescursos.css", "/styles/all.min.css"];

function History() {
  const [response, setResponse] = useState("");

  useAuthFetching(KEY, BASE_URL, setResponse);
  const [loaded, setLoaded] = useState(false);
  useDynamicStyles(new Set(styleRoutes), setLoaded);
  if (!loaded) return;
  const data = response.status === 200 ? response.data : [];

  return (
    <>
      <DynamicPagesContent
        responseStatus={response.status}
        component={<Table data={data} />}
        customErrorMessage={"Completa quizzes para ver resultados."}
      />

      <Footer />
    </>
  );
}

export default History;
