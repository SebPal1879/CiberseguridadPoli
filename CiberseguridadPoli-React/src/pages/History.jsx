import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useDynamicImports } from "./useDynamicImports";
import useAuthFetching from "../api/useAuthFetching";
import { useState } from "react";
import Table from "../components/Table";
import DynamicPagesContent from "../components/DynamicPagesContent";

const BASE_URL = "https://ciberseguridad-poli.vercel.app/quiz/history";
const KEY = "ciberpoli_token";
const styleRoutes = [
  "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@500&display=swap",
];

function History() {
  const location = useLocation();
  const [response, setResponse] = useState("");

  useAuthFetching(KEY, BASE_URL, setResponse);
  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
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
