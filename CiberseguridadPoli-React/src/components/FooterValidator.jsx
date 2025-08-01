import { useLocation } from "react-router-dom";
import Footer from "./Footer";

function FooterValidator() {
  const location = useLocation();
  console.log(location.pathname);
  if (
    location.pathname.startsWith("/challenges/") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/signin")
  )
    return;

  return <Footer />;
}

export default FooterValidator;
