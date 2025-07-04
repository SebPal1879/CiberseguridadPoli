import { useState } from "react";
import useAuthFetching from "../api/useAuthFetching";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LectureContent from "../components/LectureContent";
import Help from "../components/Help";
import { Link } from "react-router-dom";
import { postRequest } from "../api/access.api";
import { useDynamicImports } from "./useDynamicImports";

const KEY = "ciberpoli_token";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/all.min.css",
];

function Lecture() {
  const location = useLocation();
  const navigate = useNavigate();
  useDynamicImports(styleRoutes, location.pathname);

  const { ids, idl } = useParams();
  const [response, setResponse] = useState({});
  const BASE_URL = `http://127.0.0.1:8000/learning/section/${ids}/lecture/${idl}/`;
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 200 ? response.data[0] : [];
  const sectionName = response.status === 200 ? response.data[1].name : "";
  const completed =
    response.status === 200 ? response.data[2].is_completed : "";
  console.log(completed);
  console.log(data);

  async function completeSubmission() {
    const token = localStorage.getItem("ciberpoli_token");
    console.log(token);
    console.log(BASE_URL);
    const response = await postRequest(BASE_URL, {}, token);
    if (response.status === 200) {
      alert("Se ha completado la lección exitosamente");
      navigate(`/learning/section/${ids}/`);
    } else {
      alert("Ha ocurrido un error");
    }
    console.log(response);
  }
  return (
    <>
      <Header />
      {response.status === 200 && (
        <main className="lesson-content">
          <div className="curso-breadcrumb">
            <Link to={`/learning/section/${ids}/`}>
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
            {!completed && (
              <div className="contenedor">
                <div
                  className="fin-leccion btn-ver-lecciones"
                  onClick={completeSubmission}
                >
                  <i className="fas "></i> He completado la lección.
                </div>
              </div>
            )}
          </div>
          <Help />
        </main>
      )}

      <Footer />
    </>
  );
}

export default Lecture;
