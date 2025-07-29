import { useEffect } from "react";

const BASE_URL = "http://localhost:5173";

// Función para revisar si en el DOM ya hay hojas de estilos que se necesitan (y no volver a solicitarlñas), y para quitar las que no se necesitan (y evitar afectaciones en la visualización)
function useDynamicStyles(neededStylePaths, setLoaded) {
  useEffect(
    function () {
      // 1. Buscar todos los estilos presentes. filter(Boolean) evita nulos
      const presentStylesArray = [...document.styleSheets]
        .map((element) => element.href)
        .filter(Boolean);
      try {
        const presentStyles = new Set(
          presentStylesArray.map((element) => new URL(element).pathname)
        );
        // 3. Se hace un conjunto a través de diferencia de conjuntos de los estilos solicitados pero no presentes en el DOM
        const missingStyles = neededStylePaths.difference(presentStyles);

        // 4. Se hace un conjunto a través de diferencia de conjuntos de los estilos presentes pero no solicitados en el DOM
        const notNeededStyles = presentStyles.difference(neededStylePaths);

        // 5. Se sacan los estilos no solicitados
        notNeededStyles.forEach((element) => {
          const itemToRemove = document.querySelector(
            `link[href="${element}"]`
          );
          document.head.removeChild(itemToRemove);
        });

        // 6. Se insertan los estilos solicitados.
        Array.from(missingStyles).map((href) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          link.dataset.dynamic = "true";
          document.head.appendChild(link);
          return link;
        });
      } catch (error) {
        console.log("Error al cargar  estilos: " + error);
      } finally {
        setLoaded(true);
      }
      // 2. Hacer un conjunto de dichos elementos (solo con el pathname del URLm ya que este es el que se está pasando y el que leerá el DOM luego para insertar/borrar)
    },

    [neededStylePaths, setLoaded]
  );
}

export default useDynamicStyles;
