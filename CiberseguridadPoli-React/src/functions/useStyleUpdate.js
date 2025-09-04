import { useEffect } from "react";
import { useStyles } from "../contexts/StylesContext";

// Esta es la función que usan los componentes o páginas para mandar sus estilos necesitados. Al actualizar neededStyles, hace que useDynamicStyles se actualice, debido a que está pendiente a los cambios de neededStyles.
function useStyleUpdate(styleRoutes) {
  // Se adquiere del contexto la función que permite colocar los estilos
  const { hasLoadedStyles, setNeededStyles, setHasLoadedStyles } = useStyles();

  useEffect(
    function () {
      // Agrega los estilos solicitados al state existente
      setNeededStyles((current) => [...current, styleRoutes]);

      // Al desmontar el componente, se asegura de aclarar que dicho componente ya no necesita los estilos que pidió
      return () => {
        // Si es un componente hijo que tiene conditional rendering, el unmounting puede causar problemas
        setHasLoadedStyles(false); //Se agregó esta línea, a pesar de que useDynamicStyles también la incluye, debido a que al montar un componente tras desmontar el anterior, hasLoadedStyles será true, provocando FOUC hasta que el useDynamicStyles se ejecute tras render.
        setNeededStyles((current) => {
          return current.filter(
            (element) => element.requester !== styleRoutes.requester
          );
        });
      };
    },
    [setNeededStyles, styleRoutes, setHasLoadedStyles]
  );

  return hasLoadedStyles;
}

export default useStyleUpdate;
