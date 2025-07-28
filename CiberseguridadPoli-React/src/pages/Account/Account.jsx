import Footer from "../../components/Footer";
import { useDynamicImports } from "../useDynamicImports";
import { useLocation } from "react-router-dom";
import AccountPanel from "./AccountPanel";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { useAccountInfo } from "../../contexts/AccountContext";
import { useState } from "react";

const styleRoutes = ["/styles/all.min.css"];

function Account() {
  const location = useLocation();
  const { responseStatus } = useAccountInfo();
  const [loaded, setLoaded] = useState(false);
  useDynamicImports(styleRoutes, location.pathname, setLoaded);
  if (!loaded) return;
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
