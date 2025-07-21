import Footer from "../../components/Footer";
import { useDynamicImports } from "../useDynamicImports";
import { useLocation } from "react-router-dom";
import AccountPanel from "./AccountPanel";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { useAccountInfo } from "../../contexts/AccountContext";

const styleRoutes = [
  "/src/pages_css/css/stylescursos.css",
  "/src/pages_css/css/all.min.css",
];

function Account() {
  const location = useLocation();
  useDynamicImports(styleRoutes, location.pathname);
  const { responseStatus } = useAccountInfo();

  return (
    <>
      <DynamicPagesContent
        responseStatus={responseStatus}
        component={<AccountPanel />}
      />

      <Footer />
    </>
  );
}

export default Account;
