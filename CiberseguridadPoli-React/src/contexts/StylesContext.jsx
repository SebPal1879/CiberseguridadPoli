import { createContext, useContext } from "react";

const StyleContext = createContext();

function StyleProvider({ styles, children }) {
  return (
    <StyleContext.Provider value={{ styles }}>{children}</StyleContext.Provider>
  );
}

function useStyles() {
  const context = useContext();
  if (context === undefined)
    throw new Error("StyleContext fue usado fuera de StyleProvider");
  return context;
}

export { StyleProvider, useStyles };
