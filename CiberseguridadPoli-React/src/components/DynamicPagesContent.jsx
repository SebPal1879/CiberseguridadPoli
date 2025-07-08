import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "./AuthedUserHeader";
import AuthError from "./AuthError";
import Error from "./Error";
function DynamicPagesContent({
  response = null,
  component,
  customErrorMessage = "",
}) {
  let header;
  let error;
  console.log(response);
  switch (response) {
    case 200:
      header = <AuthedUserHeader />;
      break;
    case 401:
      header = <StandardHeader />;
      error = <AuthError />;
      break;
    case 404:
      header = <AuthedUserHeader />;
      error = <Error customErrorMessage={customErrorMessage} />;
      break;
    default:
      console.log("Respuesta desconocida");
  }
  return (
    <>
      {header}

      {response === 200 ? component : error}
    </>
  );
}

export default DynamicPagesContent;
