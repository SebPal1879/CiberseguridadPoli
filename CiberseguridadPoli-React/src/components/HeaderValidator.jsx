import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "../components/AuthedUserHeader";
import { useAccountInfo } from "../contexts/AccountContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStyles } from "../contexts/StylesContext";

// const styleRoutes = {
//   styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
//   requester: "Header",
// };
// Valida si el usuario está iniciado para mostrar un header. Solo para usar en páginas estáticas; en páginas dinámicas estaría creando una petición más, cuando ya existen otras peticiones.
function HeaderValidator() {
  const { hasLoadedStyles } = useStyles();

  // Debido a que el header se va a mantener constante, este no necesita desaparecer cada que hasLoadedStyles se vuelve a poner en falso.
  // Para esto, se crea este state en el que si es el first render, deja que hasLoadedStyles controle el mostrar (o no) el componente.
  // Una vez se vuelve falso, siempre va a mostrar el componente porque no permite el return vacío.
  const [firstRender, setFirstRender] = useState(true);
  useEffect(function () {
    setFirstRender(false);
  }, []);

  const pathname = useLocation();
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
  if (firstRender && !hasLoadedStyles) return;
  return (
    <>
      {responseStatus >= 200 && responseStatus < 300 ? (
        <AuthedUserHeader />
      ) : (
        <StandardHeader />
      )}
    </>
  );
}

export default HeaderValidator;
