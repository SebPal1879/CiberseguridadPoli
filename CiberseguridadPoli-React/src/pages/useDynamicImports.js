import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export function useDynamicImports(hrefs = [], currentPath, setLoaded) {
  const location = useLocation();
  useEffect(
    function () {
      if (!location.pathname.startsWith(currentPath)) return;
      if (location.pathname.startsWith("/challenges/")) {
        const stylescursos = document.getElementById("stylescursos");
        document.head.removeChild(stylescursos);
      }

      const links = addStyleSheets(hrefs);

      function addStyleSheets(hrefs, id) {
        return hrefs.map((href) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          link.dataset.dynamic = "true";
          link.id = id ? id : "";
          link.onload = () => setLoaded(true);
          document.head.appendChild(link);
          return link;
        });
      }
      return () => {
        if (location.pathname.startsWith("/challenges")) {
          addStyleSheets(["styles/stylescursos.css"], "stylescursos");
        }
        links.forEach((link) => document.head.removeChild(link));
      };
    },
    [location, currentPath, hrefs, setLoaded]
  );
}
