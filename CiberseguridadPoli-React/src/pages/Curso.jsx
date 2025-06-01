import { useState } from "react";
import useAuthFetching from "./useAuthFetching";
import AuthError from "./AuthError";
import Section from "./Section";

const KEY = "ciberpoli_token";
const BASE_URL = "http://127.0.0.1:8000/learning/";

function Curso() {
  const [response, setResponse] = useState("");
  useAuthFetching(KEY, BASE_URL, setResponse);

  const data = response.status === 401 ? [] : response.data;
  return (
    <div>
      {response.status === 401 && <AuthError />}
      {response.status === 200 && (
        <>
          {data.map((element) => (
            <Section section={element} key={element.id} />
          ))}
        </>
      )}
    </div>
  );
}

export default Curso;
