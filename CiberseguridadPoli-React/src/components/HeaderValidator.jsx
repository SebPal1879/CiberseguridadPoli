import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "../components/AuthedUserHeader";
import { useAccountInfo } from "../contexts/AccountContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useStyles } from "../contexts/StylesContext";

// Valida si el usuario está iniciado para mostrar un header. Solo para usar en páginas estáticas; en páginas dinámicas estaría creando una petición más, cuando ya existen otras peticiones.
function HeaderValidator() {
  const pathname = useLocation();
  const { hasLoadedStyles } = useStyles();
  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [pathname]
  );
  const { responseStatus } = useAccountInfo();
  const location = useLocation();

  if (
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/challenges/")
  )
    return;

  if (!hasLoadedStyles) return;
  return (
    <>{responseStatus === 200 ? <AuthedUserHeader /> : <StandardHeader />}</>
  );
}

export default HeaderValidator;
