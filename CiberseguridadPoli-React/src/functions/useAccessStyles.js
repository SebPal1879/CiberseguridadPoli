import { useEffect } from "react";

function useAccessStyles() {
  useEffect(function () {
    const body = document.querySelector("body");
    body.classList.add("register-page");
    body.classList.add("login-page");
    body.classList.add("hold-transition");

    return () => {
      body.classList.remove("register-page");
      body.classList.remove("login-page");
      body.classList.remove("hold-transition");
    };
  }, []);
}

export default useAccessStyles;
