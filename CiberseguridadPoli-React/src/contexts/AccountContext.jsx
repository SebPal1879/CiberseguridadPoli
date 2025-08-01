import { createContext, useContext, useState } from "react";
import useAuthFetching from "../api/useAuthFetching";
import responseInformation from "../functions/responseInformation";
import BACKEND_URL from "../functions/urls";
const BASE_URL = `${BACKEND_URL}/signin/authenticated`;
const KEY = "ciberpoli_token";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [response, setResponse] = useState();
  useAuthFetching(KEY, BASE_URL, setResponse);
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
  } = responseStatus === 200 ? responseInformation(response.data) : "";

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
        responseStatus,
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
