import { useState } from "react";
import useAuthFetching from "../../api/useAuthFetching";
import { Outlet, useLocation } from "react-router-dom";
import CourseSectionContents from "./CourseSectionContents";
import { useDynamicImports } from "../useDynamicImports";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import Footer from "../../components/Footer";

const KEY = "ciberpoli_token";
const BASE_URL = "https://ciberseguridadpoli.onrender.com/learning/";

const styleRoutes = ["/styles/all.min.css"];

function Learning() {
  const location = useLocation();

  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 401 ? [] : response.data;
  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
  if (!loaded) return;
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
