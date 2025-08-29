import { createContext, useContext } from "react";
import useAuthFetching from "../api/useAuthFetching";
import responseInformation from "../functions/responseInformation";
import { AUTH_INFO_URL } from "../functions/urls";
import { KEY } from "../functions/urls";
const AccountContext = createContext();

function AccountProvider({ children }) {
  const { response, setResponse, loading } = useAuthFetching(
    KEY,
    AUTH_INFO_URL
  );

  console.log(response.data?.user_profile_data);
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
  console.log(firstName);
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
