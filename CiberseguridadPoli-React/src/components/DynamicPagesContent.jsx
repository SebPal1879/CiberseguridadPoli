import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "./AuthedUserHeader";
import AuthError from "./AuthError";
import Error from "./Error";
function DynamicPagesContent({ response, component }) {
  return (
    <>
      {response === 200 ? (
        <>
          <AuthedUserHeader />
          {component}
        </>
      ) : (
        <>
          <StandardHeader />
          <>
            a<br />
          </>

          <AuthError />
        </>
      )}
    </>
  );
}

export default DynamicPagesContent;
