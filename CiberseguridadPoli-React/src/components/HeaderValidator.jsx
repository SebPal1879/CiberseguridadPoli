import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "../components/AuthedUserHeader";
import { useAccountInfo } from "../contexts/AccountContext";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

// Valida si el usuario está iniciado para mostrar un header. Solo para usar en páginas estáticas; en páginas dinámicas estaría creando una petición más, cuando ya existen otras peticiones.
function HeaderValidator() {
  const { responseStatus } = useAccountInfo();
  const location = useLocation();
  if (!responseStatus) return <Loader />;

  if (
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/challenges/")
  )
    return;
  return (
    <>{responseStatus === 200 ? <AuthedUserHeader /> : <StandardHeader />}</>
  );
}

export default HeaderValidator;
