import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useDynamicImports } from "./useDynamicImports";
import useAuthFetching from "../api/useAuthFetching";
import { useState } from "react";
import Table from "../components/Table";
import DynamicPagesContent from "../components/DynamicPagesContent";
import responseInformation from "./responseInformation";

const BASE_URL = "http://127.0.0.1:8000/quiz/history";
const KEY = "ciberpoli_token";
const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@500&display=swap",
];

function History() {
  const location = useLocation();
  const [response, setResponse] = useState("");
  useDynamicImports(styleRoutes, location.pathname);

  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 200 ? response.data : [];
  const { profilePictureURL, firstName } =
    response.status === 200 ? responseInformation(response.data) : "";
  console.log(profilePictureURL);
  console.log(response.data);
  return (
    <>
      <DynamicPagesContent
        responseStatus={response.status}
        profilePictureURL={profilePictureURL}
        firstName={firstName}
        component={<Table data={data} />}
        customErrorMessage={"Completa quizzes para ver resultados."}
      />

      <Footer />
    </>
  );
}

export default History;
