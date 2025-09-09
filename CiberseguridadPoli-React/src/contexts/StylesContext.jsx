import { createContext, useContext, useRef } from "react";
import useDynamicStyles from "../functions/useDynamicStyles";

const StyleContext = createContext();

function StyleProvider({ children }) {
  const { neededStyles, hasLoadedStyles, setNeededStyles, setHasLoadedStyles } =
    useDynamicStyles();
  const componentStyleList = useRef([]);

  return (
    <StyleContext.Provider
      value={{
        hasLoadedStyles,
        neededStyles,
        setNeededStyles,
        setHasLoadedStyles,
        componentStyleList,
      }}
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
