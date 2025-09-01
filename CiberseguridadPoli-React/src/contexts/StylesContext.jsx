import { createContext, useContext } from "react";
import useDynamicStyles from "../functions/useDynamicStyles";

const StyleContext = createContext();

function StyleProvider({ children }) {
  const { hasLoadedStyles, setNeededStyles, setHasLoadedStyles } =
    useDynamicStyles();

  return (
    <StyleContext.Provider
      value={{ hasLoadedStyles, setNeededStyles, setHasLoadedStyles }}
    >
      {children}
    </StyleContext.Provider>
  );
}

function useStyles() {
  const context = useContext(StyleContext);
  if (context === undefined)
    throw new Error("StyleContext fue usado fuera de StyleProvider");
  return context;
}

export { StyleProvider, useStyles };
