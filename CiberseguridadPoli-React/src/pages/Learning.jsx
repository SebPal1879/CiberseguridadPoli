import { useState } from "react";
import useAuthFetching from "../api/useAuthFetching";
import AuthError from "./AuthError";
import Section from "./Section";
import { Outlet, useLocation } from "react-router-dom";
import CourseSectionContents from "../components/CourseSectionContents";
import Header from "../components/Header";
import { useDynamicImports } from "./useDynamicImports";

const KEY = "ciberpoli_token";
const BASE_URL = "http://127.0.0.1:8000/learning/";

function Learning() {
  const location = useLocation();
  useDynamicImports(
    ["/src/pages_css/css/stylescursos.css", "/src/pages_css/css/all.min.css"],
    location.pathname
  );

  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 401 ? [] : response.data;
  return (
    <div>
      <Header />

      {response.code === "ERR_NETWORK" && <>Algo salió mal</>}
      {response.status === 401 && <AuthError />}
      {response.status === 200 && <CourseSectionContents sections={data} />}
      <Outlet />
    </div>
  );
}

export default Learning;
