import { useEffect, useState } from "react";
import useAuthFetching from "../api/useAuthFetching";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LectureContent from "../components/LectureContent";
import Help from "../components/Help";
import { Link } from "react-router-dom";
const KEY = "ciberpoli_token";

function Lecture() {
  const location = useLocation();
  useEffect(
    function () {
      if (location.pathname.startsWith("/learning/section/")) {
        import("../pages_css/css/stylescursos.css");

        import("../pages_css/css/all.min.css");
      }
    },
    [location]
  );
  const { ids, idl } = useParams();
  const [response, setResponse] = useState({});
  const BASE_URL = `http://127.0.0.1:8000/learning/section/${ids}/lecture/${idl}/`;
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 200 ? response.data[0] : [];
  const sectionName = response.status === 200 ? response.data[1].name : "";
  console.log(data);
  return (
    <>
      <Header />
      <main className="lesson-content">
        <div className="curso-breadcrumb">
          <Link to={"/learning"}>
            <i className="fas fa-arrow-left"></i> Volver a Unidades
          </Link>
        </div>
        <div className="container">
          <h2>
            <i className="fas fa-shield-alt"></i> {sectionName}
          </h2>

          <div className="accordion">
            {data.map((element) => (
              <LectureContent content={element} key={element.id} />
            ))}
          </div>
        </div>
        <Help />
      </main>
      <Footer />
    </>
  );
}

export default Lecture;
