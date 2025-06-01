import { useEffect } from "react";
import axios from "axios";
function useLogin(key, url, setter) {
  useEffect(
    function () {
      const item = localStorage.getItem(key);
      async function getAPIData() {
        try {
          const response = await axios.get(url, {
            headers: { Authorization: item },
          });
          console.log(response);
          setter(response);
        } catch (error) {
          console.log(error);
          setter(error);
        }
      }
      getAPIData();
    },
    [key, url, setter]
  );
}

export default useLogin;
