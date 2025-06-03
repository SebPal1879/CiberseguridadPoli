import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export function useDynamicImports(hrefs = [], currentPath) {
  const location = useLocation();
  useEffect(
    function () {
      if (!location.pathname.startsWith(currentPath)) return;
      console.log("condicional");
      console.log(hrefs);
      const links = hrefs.map((href) => {
        console.log(href);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.dynamic = "true";
        document.head.appendChild(link);
        return link;
      });

      return () => {
        links.forEach((link) => document.head.removeChild(link));
      };
    },
    [location, currentPath, hrefs]
  );
}
