import { createContext, useContext, useState } from "react";

const StyleContext = createContext();

function StyleProvider({ children }) {
  const [neededStyles, setNeededStyles] = useState([]);
  const [hasLoadedStyles, setHasLoadedStyles] = useState(false);

  return (
    <StyleContext.Provider
      value={{
        neededStyles,
        setNeededStyles,
        hasLoadedStyles,
        setHasLoadedStyles,
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
