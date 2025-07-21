import AuthError from "./AuthError";
import Error from "./Error";
function DynamicPagesContent({
  responseStatus = null,
  component,
  customErrorMessage = "",
}) {
  let error;
  switch (responseStatus) {
    case 401:
      error = <AuthError />;
      break;
    case 404:
      error = <Error customErrorMessage={customErrorMessage} />;
      break;
    default:
      console.log("Respuesta desconocida");
  }
  return <>{responseStatus === 200 ? component : error}</>;
}

export default DynamicPagesContent;
