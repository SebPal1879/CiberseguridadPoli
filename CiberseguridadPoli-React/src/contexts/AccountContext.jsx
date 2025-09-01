import { createContext, useContext } from "react";
import useAuthFetching from "../api/useAuthFetching";
import responseInformation from "../functions/responseInformation";

import { API_URL } from "../../urls";
import { TOKEN_KEY } from "../../urls";
const AccountContext = createContext();

const BASE_URL = `${API_URL}/signin/authenticated`;

// Contexto para mirar si el usuario está iniciado. De aquí en adelante, guarda la información y controla el header mostrado.
function AccountProvider({ children }) {
  const { response, setResponse, loading } = useAuthFetching(
    TOKEN_KEY,
    BASE_URL
  );

  const responseStatus = response?.status;
  const {
    firstName,
    userName,
    lastName,
    telephoneNumber,
    profilePictureURL,
    id,
    email,
    program,
    level,
  } =
    responseStatus >= 200 && responseStatus < 300
      ? responseInformation(response.data.user_profile_data)
      : "";
  return (
    <AccountContext.Provider
      value={{
        firstName,
        userName,
        lastName,
        telephoneNumber,
        profilePictureURL,
        id,
        email,
        program,
        level,

        loading,

        responseStatus,
        setResponse,
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
