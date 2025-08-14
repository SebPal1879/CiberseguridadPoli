import { useEffect } from "react";
import { useStyles } from "../contexts/StylesContext";

function useStyleUpdate(styleRoutes) {
  const { setNeededStyles } = useStyles();

  useEffect(
    function () {
      setNeededStyles((current) => [...current, styleRoutes]);
      return () => {
        setNeededStyles((current) =>
          current.filter(
            (element) => element.requester !== styleRoutes.requester
          )
        );
      };
    },
    [setNeededStyles, styleRoutes]
  );
}

export default useStyleUpdate;
