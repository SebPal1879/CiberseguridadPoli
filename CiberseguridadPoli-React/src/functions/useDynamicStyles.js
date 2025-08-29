import { useEffect, useState } from "react";

// Función para revisar si en el DOM ya hay hojas de estilos que se necesitan (y no volver a solicitarlñas), y para quitar las que no se necesitan (y evitar afectaciones en la visualización)
function useDynamicStyles() {
  // Carga el state de neededStyles que será usado por los componentes que usen este hook. Los componentes deberán pasar sus respectivas rutas de estilos a esta variable.
  const [neededStyles, setNeededStyles] = useState([]);
  const [hasLoadedStyles, setHasLoadedStyles] = useState(false);
  useEffect(
    function () {
      // Convierte las rutas en un solo arreglo
      const stylesArray = neededStyles
        .map((element) => element?.styleRoutes)
        .flat();

      if (!stylesArray.length) return;

      const neededStylePaths = new Set(stylesArray);
      let loadedStyles = 0;
      // 1. Buscar todos los estilos presentes. filter(Boolean) evita nulos
      const presentStylesArray = [...document.styleSheets]
        .map((element) => element.href)
        .filter(Boolean);

      // 2. Hacer un conjunto de dichos elementos (solo con el pathname del URL ya que este es el que se está pasando y el que leerá el DOM luego para insertar/borrar)
      const presentStyles = new Set(
        presentStylesArray.map((element) => new URL(element).pathname)
      );
      // 3. Se hace un conjunto a través de diferencia de conjuntos de los estilos solicitados pero no presentes en el DOM
      const missingStyles = neededStylePaths.difference(presentStyles);

      if (missingStyles.size > 0) {
        // Si hay un cambio de una página a otra, es posible hasLoadedStyles esté en true. Sin embargo, si hay elementos en missingStyles, significa que se deben cargar y por ende, hasLoadedStyles debe ser false.
        setHasLoadedStyles(false);
      }

      // 4. Se hace un conjunto a través de diferencia de conjuntos de los estilos presentes pero no solicitados en el DOM
      const notNeededStyles = presentStyles.difference(neededStylePaths);

      // 5. Se sacan los estilos no solicitados
      notNeededStyles.forEach((element) => {
        const itemToRemove = document.querySelector(`link[href="${element}"]`);
        document.head.removeChild(itemToRemove);
      });

      // // 5.1. Si no hay estilos pendientes por aplicar, significa que la página se puede cargar y por ende lo que sigue no es necesario.
      if (missingStyles.size === 0) {
        setHasLoadedStyles(true);
        return;
      }

      const missingStylesArray = Array.from(missingStyles);
      console.log(missingStylesArray);

      // 6. Se insertan los estilos solicitados.
      missingStylesArray.map((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.dynamic = "true";
        link.onload = () => {
          loadedStyles++;
          if (loadedStyles === missingStylesArray.length) {
            console.log("Cargó");
            setHasLoadedStyles(true);
          }
        };
        document.head.appendChild(link);
        return link;
      });
    },
    [neededStyles]
  );

  return { hasLoadedStyles, setNeededStyles };
}

export default useDynamicStyles;
