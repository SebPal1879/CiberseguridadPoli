import { useEffect, useState } from "react";
import useAuthFetching from "../api/useAuthFetching";
import AuthError from "./AuthError";
import Section from "./Section";
import { Outlet, useLocation } from "react-router-dom";
import CourseSectionContents from "../components/CourseSectionContents";
import Header from "../components/Header";

const KEY = "ciberpoli_token";
const BASE_URL = "http://127.0.0.1:8000/learning/";

function Course() {
  const location = useLocation();
  useEffect(
    function () {
      if (location.pathname.startsWith("/learning")) {
        import("../pages_css/css/stylescursos.css");
        import(
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@500&display=swap"
        );
        import("../pages_css/css/all.min.css");
      }
    },
    [location]
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

export default Course;
