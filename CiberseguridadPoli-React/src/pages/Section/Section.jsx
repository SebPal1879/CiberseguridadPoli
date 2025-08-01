import { useParams } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import { useState } from "react";
import SectionLectures from "./SectionLectures";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import useDynamicStyles from "../../functions/useDynamicStyles";
import BACKEND_URL from "../../functions/urls";

const KEY = "ciberpoli_token";

const styleRoutes = [
  "/styles/stylescursos.css",
  "/styles/all.min.css",
  "/styles/temp.css",
];

function Section() {
  const { id } = useParams();
  const BASE_URL = `${BACKEND_URL}learning/section/${id}/`;
  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);
  const data = response.status === 401 ? [] : response.data;
  const [loaded, setLoaded] = useState(false);
  useDynamicStyles(styleRoutes, setLoaded);
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
