import { useState } from "react";
import useAuthFetching from "../../api/useAuthFetching";
import { Outlet, useLocation } from "react-router-dom";
import CourseSectionContents from "./CourseSectionContents";
import { useDynamicImports } from "../useDynamicImports";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import Footer from "../../components/Footer";

const KEY = "ciberpoli_token";
const BASE_URL = "http://127.0.0.1:8000/learning/";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/all.min.css",
];

function Learning() {
  const location = useLocation();
  useDynamicImports(styleRoutes, location.pathname);

  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 401 ? [] : response.data;

  return (
    <div>
      <DynamicPagesContent
        responseStatus={response.status}
        component={<CourseSectionContents sections={data} />}
      />

      <Outlet />
      <Footer />
    </div>
  );
}

export default Learning;
