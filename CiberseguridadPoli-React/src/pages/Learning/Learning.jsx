import { useState } from "react";
import useAuthFetching from "../../api/useAuthFetching";
import { Outlet } from "react-router-dom";
import CourseSectionContents from "./CourseSectionContents";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import BACKEND_URL from "../../functions/urls";

const KEY = "ciberpoli_token";
const BASE_URL = `${BACKEND_URL}learning/`;

function Learning() {
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
    </div>
  );
}

export default Learning;
