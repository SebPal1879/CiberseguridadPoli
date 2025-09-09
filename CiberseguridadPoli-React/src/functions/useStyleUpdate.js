import { useEffect } from "react";
import { useStyles } from "../contexts/StylesContext";

// Esta es la función que usan los componentes o páginas para mandar sus estilos necesitados. Al actualizar neededStyles, hace que useDynamicStyles se actualice, debido a que está pendiente a los cambios de neededStyles.
function useStyleUpdate(styleRoutes) {
  // Se adquiere del contexto la función que permite colocar los estilos
  const {
    hasLoadedStyles,
    setNeededStyles,
    setHasLoadedStyles,
    componentStyleList,
  } = useStyles();

  useEffect(
    function () {
      // Si no hay nada, es porque hay que agregar estilos a la lista
      if (!componentStyleList.current.length) {
        componentStyleList.current.push(styleRoutes);
        setHasLoadedStyles(false);
        setNeededStyles((current) => [...current, styleRoutes]);
        return;
      }

      // Toma las listas de estilos actuales
      const currentRequestedSheets = new Set(
        componentStyleList.current.map((el) => el?.styleRoutes).flat()
      );

      // Toma las hojas de estilos solicitadas por el componente que entra
      const componentSheets = new Set(styleRoutes.styleRoutes);

      // Hace la diferencia de cuáles hojas de estilos se necesitan
      const missingStyleSheets =
        currentRequestedSheets.difference(componentSheets);

      // Agrega los estilos solicitados al state existente
      if (missingStyleSheets.size > 0) {
        // Quita los estilos que estén en estado unmounting para que no se queden permanentemente en el arreglo. Los estilos en estado unmounting solo sirven para el siguiente componente que entra.
        setHasLoadedStyles(false);

        setNeededStyles((current) => [
          ...current.filter((element) => !element.unmounting),
          styleRoutes,
        ]);
      }

      // Quita los estilos que están en unmounting del ref
      componentStyleList.current = componentStyleList.current.filter(
        (element) => !element.unmounting
      );

      // Agrega a la lista los estilos ya montados para referencia de otros componentes
      componentStyleList.current.push(styleRoutes);

      // Al desmontar el componente, se asegura de hacer saber que este componente se está desmontando. No los quita inmediatamente en caso de que otro componente los use
      return () => {
        for (let element of componentStyleList.current) {
          if (element.requester === styleRoutes.requester) {
            element.unmounting = true;
            break;
          }
        }
      };
    },
    [setNeededStyles, styleRoutes, setHasLoadedStyles, componentStyleList]
  );

  return hasLoadedStyles;
}

export default useStyleUpdate;
