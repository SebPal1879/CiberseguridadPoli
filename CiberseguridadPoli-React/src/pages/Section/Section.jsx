import { useLocation, useParams } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import { useState } from "react";
import SectionLectures from "./SectionLectures";
import { useDynamicImports } from "../useDynamicImports";
import DynamicPagesContent from "../../components/DynamicPagesContent";

const KEY = "ciberpoli_token";

const styleRoutes = [
  "/styles/stylescursos.css",
  "/styles/temp.css",
  "/styles/all.min.css",
];

function Section() {
  const location = useLocation();
  const { id } = useParams();
  const BASE_URL = `https://ciberseguridadpoli.onrender.com/learning/section/${id}/`;
  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 401 ? [] : response.data;
  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
  if (!loaded) return;
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
