import Footer from "./Footer";
import { useStyles } from "../contexts/StylesContext";

function FooterValidator() {
  const { hasLoadedStyles } = useStyles();

  if (!hasLoadedStyles) return;

  return <Footer />;
}

export default FooterValidator;
