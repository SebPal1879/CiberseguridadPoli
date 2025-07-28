import { useState } from "react";

const arrayForStyles = [
  "",
  "account",
  "course",
  "challenges",
  "learning",
  "help-center",
  "history",
];

function useImportStyle() {
  const [importStyle, setImportStyle] = useState(true);
  if (arrayForStyles.includes(location.pathname.startsWith())) {
    importStyle ? "" : setImportStyle((actual) => !actual);
  }
  return importStyle;
}

export default { useImportStyle };
