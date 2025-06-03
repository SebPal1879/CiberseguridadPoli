import { useLocation, useParams } from "react-router-dom";
import useAuthFetching from "../api/useAuthFetching";
import { useState } from "react";
import SectionLectures from "../components/SectionLectures";
import Header from "../components/Header";
import { useDynamicImports } from "./useDynamicImports";

const KEY = "ciberpoli_token";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/temp.css",
  "/src/pages_css/css/all.min.css",
];

function Section() {
  const location = useLocation();
  useDynamicImports(styleRoutes, location.pathname);
  const { id } = useParams();
  const BASE_URL = `http://127.0.0.1:8000/learning/section/${id}/`;
  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 401 ? [] : response.data;
  console.log(data);
  return (
    <>
      <Header />

      {response.status === 200 && <SectionLectures data={data} />}
    </>
  );
}

export default Section;
