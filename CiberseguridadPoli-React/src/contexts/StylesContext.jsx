import { createContext, useContext, useMemo } from "react";
import useDynamicStyles from "../functions/useDynamicStyles";

const StyleContext = createContext();

function StyleProvider({ children }) {
  const { hasLoadedStyles, setNeededStyles } = useDynamicStyles();

  const value = useMemo(
    () => ({
      hasLoadedStyles,
      setNeededStyles,
    }),
    [hasLoadedStyles, setNeededStyles]
  );

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
}

function useStyles() {
  const context = useContext(StyleContext);
  if (context === undefined)
    throw new Error("StyleContext fue usado fuera de StyleProvider");
  return context;
}

export { StyleProvider, useStyles };
