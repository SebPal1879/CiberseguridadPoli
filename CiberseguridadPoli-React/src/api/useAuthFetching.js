import { useEffect, useState } from "react";
import axios from "axios";

function useAuthFetching(key, url) {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      const item = localStorage.getItem(key);
      async function getAPIData() {
        setLoading(true);
        try {
          const response = await axios.get(url, {
            headers: { Authorization: `Token ${item}` },
          });
          console.log(response);
          setResponse(response);
        } catch (error) {
          console.log(error);
          setResponse(error);
        } finally {
          setLoading(false);
        }
      }
      getAPIData();
    },
    [key, url, setResponse, setLoading]
  );

  return { response, loading };
}

export default useAuthFetching;
