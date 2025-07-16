import AuthedUserHeader from "../../components/AuthedUserHeader";
import Footer from "../../components/Footer";
import { useDynamicImports } from "../useDynamicImports";
import { useLocation } from "react-router-dom";
import useAuthFetching from "../../api/useAuthFetching";
import { useState } from "react";
import Error from "../../components/Error";
import AccountPanel from "./AccountPanel";
import DynamicPagesContent from "../../components/DynamicPagesContent";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/all.min.css",
];

const BASE_URL = "http://127.0.0.1:8000/signin/authenticated";
const KEY = "ciberpoli_token";

function Account() {
  const location = useLocation();
  const [response, setResponse] = useState("");
  useDynamicImports(styleRoutes, location.pathname);
  useAuthFetching(KEY, BASE_URL, setResponse);
  const { id, email, program, level } =
    response.status === 200 ? response.data : "";
  const firstName = response.status === 200 ? response.data.first_name : "";
  const lastName = response.status === 200 ? response.data.last_name : "";
  const telephoneNumber =
    response.status === 200 ? response.data.telephone_number : "";
  const profilePictureURL =
    response.status === 200
      ? `http://127.0.0.1:8000/${response.data.profile_picture}`
      : "";
  console.log(profilePictureURL);
  return (
    <>
      <DynamicPagesContent
        response={response.status}
        component={
          <AccountPanel
            id={id}
            firstName={firstName}
            lastName={lastName}
            email={email}
            telephoneNumber={telephoneNumber}
            program={program}
            level={level}
            profilePictureURL={profilePictureURL}
          />
        }
      />

      <Footer />
    </>
  );
}

export default Account;
