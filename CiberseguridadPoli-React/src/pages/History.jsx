import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useDynamicImports } from "./useDynamicImports";
import useAuthFetching from "../api/useAuthFetching";
import { useState } from "react";
import Table from "../components/Table";

const BASE_URL = "http://127.0.0.1:8000/quiz/history";
const KEY = "ciberpoli_token";
function History() {
  const location = useLocation();
  const [response, setResponse] = useState("");
  useDynamicImports(
    [
      "/src/pages_css/css/stylescursos.css",
      "/src/pages_css/css/all.min.css",
      "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@500&display=swap",
    ],
    location.pathname
  );

  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 200 ? response.data : [];
  console.log(data.map((el) => el.quiz));
  return (
    <>
      <Header />
      {response.status === 200 ? <Table data={data} /> : <p>Algo salió mal</p>}

      <Footer />
    </>
  );
}

export default History;
