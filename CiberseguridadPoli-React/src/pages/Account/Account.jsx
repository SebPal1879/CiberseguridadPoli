import AuthedUserHeader from "../../components/AuthedUserHeader";
import Footer from "../../components/Footer";
import { useDynamicImports } from "../useDynamicImports";
import { useLocation } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import { useState } from "react";
import StandardHeader from "../../components/StandardHeader";
import Error from "../../components/Error";
import AccountPanel from "./AccountPanel";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/all.min.css",
];

const BASE_URL = "http://127.0.0.1:8000/account";
const KEY = "ciberpoli_token";

function Account() {
  const location = useLocation();
  const [response, setResponse] = useState("");
  useDynamicImports(styleRoutes, location.pathname);
  useAuthFetching(KEY, BASE_URL, setResponse);

  return (
    <>
      {response.status === 200 ? (
        <>
          <AuthedUserHeader />
          <AccountPanel />
        </>
      ) : (
        <>
          <StandardHeader />
          <Error />
        </>
      )}

      <Footer />
    </>
  );
}

export default Account;
