import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "../components/AuthedUserHeader";

function HeaderValidator({ response }) {
  return (
    <>
      {response.status === 401 && <StandardHeader />}

      {response.status === 200 && <AuthedUserHeader />}
    </>
  );
}

export default HeaderValidator;
