import { useLocation, useParams } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import { useState } from "react";
import SectionLectures from "./SectionLectures";
import { useDynamicImports } from "../useDynamicImports";
import DynamicPagesContent from "../../components/DynamicPagesContent";

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
