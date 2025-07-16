import { useState } from "react";
import useAuthFetching from "../../api/useAuthFetching";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { postRequest } from "../../api/access.api";
import { useDynamicImports } from "../useDynamicImports";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import LecturePanel from "./LecturePanel";
import responseInformation from "../responseInformation";

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
  const { profilePictureURL, firstName } =
    response.status === 200 ? responseInformation(response.data) : "";

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
      <DynamicPagesContent
        responseStatus={response.status}
        profilePictureURL={profilePictureURL}
        firstName={firstName}
        component={
          <LecturePanel
            ids={ids}
            sectionName={sectionName}
            completeSubmission={completeSubmission}
            completed={completed}
            data={data}
          />
        }
      />

      <Footer />
    </>
  );
}

export default Lecture;
