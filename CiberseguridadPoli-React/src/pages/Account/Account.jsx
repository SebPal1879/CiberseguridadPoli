import AccountPanel from "./AccountPanel";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { useAccountInfo } from "../../contexts/AccountContext";
import useStyleUpdate from "../../functions/useStyleUpdate";

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Account",
};

function Account() {
  const hasLoadedStyles = useStyleUpdate(styleRoutes);
  const { responseStatus } = useAccountInfo();

  if (!hasLoadedStyles) return;

  return (
    <>
      <DynamicPagesContent
        responseStatus={responseStatus}
        component={<AccountPanel />}
      />
    </>
  );
}

export default Account;
