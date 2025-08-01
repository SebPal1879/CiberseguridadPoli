import AccountPanel from "./AccountPanel";
import DynamicPagesContent from "../../components/DynamicPagesContent";
import { useAccountInfo } from "../../contexts/AccountContext";

function Account() {
  const { responseStatus } = useAccountInfo();
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
