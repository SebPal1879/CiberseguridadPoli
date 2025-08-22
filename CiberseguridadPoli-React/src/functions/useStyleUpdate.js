import { useLayoutEffect } from "react";
import { useStyles } from "../contexts/StylesContext";

// Esta es la función que usan los componentes o páginas para mandar sus estilos necesitados. Al actualizar neededStyles, hace que useDynamicStyles se actualice, debido a que está pendiente a los cambios de neededStyles.
function useStyleUpdate(styleRoutes) {
  // Se adquiere del contexto la función que permite colocar los estilos
  const { setNeededStyles, setHasLoadedStyles } = useStyles();

  useLayoutEffect(
    function () {
      // Agrega los estilos solicitados al state existente
      setNeededStyles((current) => [...current, styleRoutes]);

      // Al desmontar el componente, se asegura de aclarar que dicho componente ya no necesita los estilos que pidió
      return () => {
        setNeededStyles((current) => {
          // const currentStyles = new Set(
          //   current.map((element) => element.styleRoutes).flat()
          // );

          // const newStyles = new Set(
          //   current
          //     .filter((element) => element.requester !== styleRoutes.requester)
          //     .map((element) => element.styleRoutes)
          //     .flat()
          // );

          // console.log(newStyles.difference(currentStyles).size === 0);
          // // Si hay diferencia de estilos entre antes de salir y después de salir, debe colocar hasLoadedStyles en false.
          // if (newStyles.difference(currentStyles).size > 0) {
          //   console.log(newStyles.difference(currentStyles));
          //   console.log("Hay diferencia");
          //   setHasLoadedStyles(false);
          // }

          return current.filter(
            (element) => element.requester !== styleRoutes.requester
          );
        });
      };
    },
    [setNeededStyles, styleRoutes, setHasLoadedStyles]
  );
}

export default useStyleUpdate;
