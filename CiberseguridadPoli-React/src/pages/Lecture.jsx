import { useEffect, useState } from "react";
import useAuthFetching from "../api/useAuthFetching";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LectureContent from "../components/LectureContent";

const KEY = "ciberpoli_token";

function Lecture() {
  const location = useLocation();
  useEffect(
    function () {
      if (location.pathname.startsWith("/learning/section/")) {
        import("../pages_css/css/styleslecciones.css");
        import("../pages_css/css/all.min.css");
      }
    },
    [location]
  );
  const { ids, idl } = useParams();
  const [response, setResponse] = useState({});
  const BASE_URL = `http://127.0.0.1:8000/learning/section/${ids}/lecture/${idl}/`;
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 200 ? response.data : [];
  console.log(data);
  return (
    <>
      <Header />

      <main className="lesson-content">
        <div className="curso-breadcrumb">
          <a href="unidades.html">
            <i className="fas fa-arrow-left"></i> Volver a Unidades
          </a>
        </div>
        <div className="container">
          <h2>
            <i className="fas fa-shield-alt"></i> Lección 1: Fundamentos a la
            protección de datos
          </h2>

          <div className="accordion">
            {data.map((element) => (
              <LectureContent content={element} key={element.id} />
            ))}
          </div>
        </div>

        <div className="sidebar-card">
          <h4>
            <i className="fas fa-question-circle"></i> ¿Necesitas ayuda?
          </h4>
          <p>
            Si tienes dudas sobre alguna unidad o lección, no dudes en contactar
            a nuestros instructores.
          </p>
          <a
            href="ayuda.html"
            className="btn-secondary"
            style={{ marginTop: "15px", display: "inline-block" }}
          >
            <i className="fas fa-envelope"></i> Contactar soporte
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Lecture;
