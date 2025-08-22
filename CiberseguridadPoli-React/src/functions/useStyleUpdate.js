import { useEffect } from "react";
import { useStyles } from "../contexts/StylesContext";

// Esta es la función que usan los componentes o páginas para mandar sus estilos necesitados. Al actualizar neededStyles, hace que useDynamicStyles se actualice, debido a que está pendiente a los cambios de neededStyles.
function useStyleUpdate(styleRoutes) {
  // Se adquiere del contexto la función que permite colocar los estilos
  const { setNeededStyles, setHasLoadedStyles } = useStyles();

  useEffect(
    function () {
      // Agrega los estilos solicitados al state existente
      setNeededStyles((current) => [...current, styleRoutes]);

      // Al desmontar el componente, se asegura de aclarar que dicho componente ya no necesita los estilos que pidió
      return () => {
        setNeededStyles((current) =>
          current.filter(
            (element) => element.requester !== styleRoutes.requester
          )
        );

        // Si hay un cambio de una página a otra, es posible hasLoadedStyles esté en true. Sin embargo, si hay elementos en missingStyles, significa que se deben cargar y por ended, hasLoadedStyles debe ser false.
        setHasLoadedStyles(false);
      };
    },
    [setNeededStyles, styleRoutes, setHasLoadedStyles]
  );
}

export default useStyleUpdate;
