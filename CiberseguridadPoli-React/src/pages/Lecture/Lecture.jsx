import { useState } from "react";
import useAuthFetching from "../../api/useAuthFetching";
import { useNavigate, useParams } from "react-router-dom";
import { postRequest } from "../../api/access.api";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import LecturePanel from "./LecturePanel";
import BACKEND_URL from "../../functions/urls";

const KEY = "ciberpoli_token";

function Lecture() {
  const navigate = useNavigate();

  const { ids, idl } = useParams();
  const [response, setResponse] = useState({});
  const BASE_URL = `${BACKEND_URL}/learning/section/${ids}/lecture/${idl}/`;
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 200 ? response.data[0] : [];
  const sectionName = response.status === 200 ? response.data[1].name : "";
  const completed =
    response.status === 200 ? response.data[2].is_completed : "";
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
    </>
  );
}

export default Lecture;
