import StandardHeader from "../components/StandardHeader";
import AuthedUserHeader from "./AuthedUserHeader";
import AuthError from "./AuthError";
import Error from "./Error";
function DynamicPagesContent({
  responseStatus = null,
  component,
  customErrorMessage = "",
  firstName = "",
  profilePictureURL = "",
}) {
  let header;
  let error;
  switch (responseStatus) {
    case 200:
      header = (
        <AuthedUserHeader
          firstName={firstName}
          profilePictureURL={profilePictureURL}
        />
      );
      break;
    case 401:
      header = <StandardHeader />;
      error = <AuthError />;
      break;
    case 404:
      header = (
        <AuthedUserHeader
          firstName={firstName}
          profilePictureURL={profilePictureURL}
        />
      );
      error = <Error customErrorMessage={customErrorMessage} />;
      break;
    default:
      console.log("Respuesta desconocida");
  }
  return (
    <>
      {header}

      {responseStatus === 200 ? component : error}
    </>
  );
}

export default DynamicPagesContent;
