import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useStyles } from "../contexts/StylesContext";

function FooterValidator() {
  const location = useLocation();
  const { hasLoadedStyles } = useStyles();

  if (!hasLoadedStyles) return;
  if (
    location.pathname.startsWith("/challenges/") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/signin")
  )
    return;

  return <Footer />;
}

export default FooterValidator;
