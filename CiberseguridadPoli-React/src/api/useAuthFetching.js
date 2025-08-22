import { useEffect, useState } from "react";
import { getInformation } from "./access.api";

// Función para traer información de una API. Recibe una clave para localStorage y una URL.
function useAuthFetching(key, url) {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      const item = localStorage.getItem(key);
      if (!item) return;
      async function getAPIData() {
        setLoading(true);
        try {
          const response = getInformation(url, {
            Authorization: `Token ${item}`,
          });
          setResponse(response);
        } catch (error) {
          setResponse(error);
        } finally {
          setLoading(false);
        }
      }
      getAPIData();
    },
    [key, url]
  );

  return { response, loading, setResponse };
}

export default useAuthFetching;
