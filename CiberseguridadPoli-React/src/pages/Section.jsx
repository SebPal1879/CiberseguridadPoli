import { useLocation, useParams } from "react-router-dom";
import useAuthFetching from "../api/useAuthFetching";
import { useEffect, useState } from "react";
import SectionLectures from "../components/SectionLectures";
import Header from "../components/Header";

const KEY = "ciberpoli_token";

function Section() {
  const location = useLocation();
  useEffect(
    function () {
      if (location.pathname.startsWith("/learning/section")) {
        import("../pages_css/css/stylescursos.css");
        import("../pages_css/css/temp.css");
        import(
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@500&display=swap"
        );
        import("../pages_css/css/all.min.css");
      }
    },
    [location]
  );
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
