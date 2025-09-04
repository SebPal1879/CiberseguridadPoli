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

// Valida si el usuario está iniciado para mostrar un header.
function HeaderValidator() {
  const { hasLoadedStyles } = useStyles();
  const location = useLocation();

  // Debido a que el header se pretende mantener constante, este no necesita desaparecer cada que hasLoadedStyles se vuelve a poner en falso.
  // Para esto, se crea este state en el que si es el first render, deja que hasLoadedStyles controle el mostrar (o no) el componente.
  // Una vez se firstRender es false, siempre va a mostrar el componente porque no permite el return vacío.
  const [firstRender, setFirstRender] = useState(true);
  useEffect(
    function () {
      window.scrollTo(0, 0);
      if (hasLoadedStyles) setFirstRender(false); // Por defecto, firstRender será true; de esta manera, no cargará los estilos. Luego, cuando hasLoadedStyles cargue, debe volverse false. Así, hasLoadedStyles no estará condicionando el header constantemente.
    },
    [hasLoadedStyles, location]
  );

  const { responseStatus } = useAccountInfo();

  if (firstRender) return;
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
