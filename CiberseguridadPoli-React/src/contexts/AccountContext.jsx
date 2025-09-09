import { createContext, useContext, useEffect } from "react";
import useAuthFetching from "../api/useAuthFetching";
import responseInformation from "../functions/responseInformation";
import Modal from "react-modal";

import { API_URL } from "../../urls";
import { TOKEN_KEY } from "../../urls";
import { getInformation } from "../api/access.api";
const AccountContext = createContext();

const BASE_URL = `${API_URL}/signin/authenticated`;

// Contexto para mirar si el usuario está iniciado. De aquí en adelante, guarda la información y controla el header mostrado.
function AccountProvider({ children }) {
  const { response, setResponse, responseData, setResponseData, loading } =
    useAuthFetching(TOKEN_KEY, BASE_URL);

  console.log(responseData);
  const responseStatus = response?.status;
  const {
    firstName,
    lastName,
    userName,
    telephoneNumber,
    profilePictureURL,
    id,
    email,
    program,
    level,
  } =
    responseStatus >= 200 && responseStatus < 300
      ? responseInformation(response.data.user_profile_data || responseData)
      : "";

  useEffect(
    function () {
      async function getProfilePicture() {
        // Función para comprobar si la foto de perfil existe. Si no, pone profile_picture como string vacío, para que profilePictureURL no renderice el elemento donde se pone la imagen con su src
        try {
          console.log(profilePictureURL);
          await getInformation(profilePictureURL, {
            Accept: "image/*",
          });
        } catch (error) {
          console.log("falló request " + error);
          setResponse((current) => ({
            ...current,
            data: {
              ...current.data,
              user_profile_data: {
                ...current.data?.user_profile_data,
                profile_picture: "",
              },
            },
          }));
        }
      }
      getProfilePicture();
    },
    [profilePictureURL, setResponse]
  );
  return (
    <AccountContext.Provider
      value={{
        firstName,
        lastName,
        userName,
        telephoneNumber,
        profilePictureURL,
        id,
        email,
        program,
        level,

        loading,

        responseStatus,
        setResponse,
        setResponseData,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

function useAccountInfo() {
  const context = useContext(AccountContext);
  if (context === undefined)
    throw new Error("AccountContext was used outside of the AccountProvider");
  return context;
}

export { AccountProvider, useAccountInfo };
