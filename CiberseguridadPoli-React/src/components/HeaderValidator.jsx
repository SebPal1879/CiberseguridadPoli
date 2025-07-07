import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "../components/AuthedUserHeader";
import useAuthFetching from "../api/useAuthFetching";
import { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000/signin/authenticated/";
const KEY = "ciberpoli_token";
// Valida si el usuario está iniciado para mostrar un header. Solo para usar en páginas estáticas; en páginas dinámicas estaría creando una petición más, cuando ya existen otras peticiones.
function HeaderValidator() {
  const [response, setResponse] = useState({});
  useAuthFetching(KEY, BASE_URL, setResponse);

  return (
    <>{response.status === 200 ? <AuthedUserHeader /> : <StandardHeader />}</>
  );
}

export default HeaderValidator;
