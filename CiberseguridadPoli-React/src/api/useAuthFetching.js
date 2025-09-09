import { useEffect, useState } from "react";
import { getInformation } from "./access.api";

// Función para traer información de una API. Recibe una clave para localStorage y una URL.
function useAuthFetching(key, url) {
  const [response, setResponse] = useState({});
  const [responseData, setResponseData] = useState(); // Para separar los datos de la respuesta en una variable propia. Se pretende usar solo temporalmente.
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      const item = localStorage.getItem(key);
      if (!item) return;
      async function getAPIData() {
        setLoading(true);
        try {
          const response = await getInformation(url, {
            Authorization: `Token ${item}`,
          });
          console.log(response);
          setResponse(response);
          setResponseData(response.data.user_profile_data);
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

  return { response, setResponse, responseData, setResponseData, loading };
}

export default useAuthFetching;
