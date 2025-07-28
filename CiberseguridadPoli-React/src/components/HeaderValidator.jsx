import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "../components/AuthedUserHeader";
import { useAccountInfo } from "../contexts/AccountContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDynamicImports } from "../pages/useDynamicImports";

const styleRoutes = ["/styles/stylescursos.css"];

// Valida si el usuario está iniciado para mostrar un header. Solo para usar en páginas estáticas; en páginas dinámicas estaría creando una petición más, cuando ya existen otras peticiones.
function HeaderValidator() {
  const { responseStatus } = useAccountInfo();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
  if (!loaded) return;
  if (
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/signup")
  )
    return;

  return (
    <>{responseStatus === 200 ? <AuthedUserHeader /> : <StandardHeader />}</>
  );
}

export default HeaderValidator;
