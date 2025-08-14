import AccountPanel from "./AccountPanel";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { useAccountInfo } from "../../contexts/AccountContext";
import useStyleUpdate from "../../functions/useStyleUpdate";
import { useStyles } from "../../contexts/StylesContext";

const styleRoutes = {
  styleRoutes: ["/styles/stylescursos.css", "/styles/all.min.css"],
  requester: "Account",
};

function Account() {
  useStyleUpdate(styleRoutes);
  const { hasLoadedStyles } = useStyles();
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
