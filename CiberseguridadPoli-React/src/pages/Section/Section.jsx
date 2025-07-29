import { useParams } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import { useState } from "react";
import SectionLectures from "./SectionLectures";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import useDynamicStyles from "../useDynamicStyles";

const KEY = "ciberpoli_token";

const styleRoutes = [
  "/styles/stylescursos.css",
  "/styles/all.min.css",
  "/styles/temp.css",
];

function Section() {
  const { id } = useParams();
  const BASE_URL = `https://ciberseguridadpoli.onrender.com/learning/section/${id}/`;
  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 401 ? [] : response.data;
  const [loaded, setLoaded] = useState(false);
  useDynamicStyles(new Set(styleRoutes), setLoaded);
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
