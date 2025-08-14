import { useEffect } from "react";
import { useStyles } from "../contexts/StylesContext";

// Función que recibe los estilos solicitados por un componente. Recibe un objeto que se compone de styleRoutes = [] y requester = "". Los cambios en este state causan la inserción y modificación de estilos.
function useStyleUpdate(styleRoutes) {
  // Accede a modificar neededStyles
  const { setNeededStyles } = useStyles();

  useEffect(
    function () {
      // Agrega a los estilos solicitados el objeto recibido
      setNeededStyles((current) => [...current, styleRoutes]);
      return () => {
        // Cuando se desmonta el componente, debe hacer saber que ya no necesita esos estilos. Por eso, los neededStyles se filtran quitando a través del requester que se está desmontando.
        setNeededStyles((current) =>
          current.filter(
            (element) => element.requester !== styleRoutes.requester
          )
        );
      };
    },
    [setNeededStyles, styleRoutes]
  );
}

export default useStyleUpdate;
