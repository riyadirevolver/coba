import { useEffect, useState } from "react";
import ServiceAdapter from "../../../lib/services";

const useFetchFilterInterestPosition = () => {
  const [openFilterInterestPosition, setOpenFilterInterestPosition] =
    useState(false);
  const [filterInterestPositionList, setFilterInterestPositionList] = useState(
    []
  );
  const loadingFilterInterestPosition =
    openFilterInterestPosition && filterInterestPositionList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingFilterInterestPosition) {
      return undefined;
    }

    (async () => {
      const { data } = await ServiceAdapter().get("/filter-interest-positions");

      if (active) {
        const interest_positions = data[0].interest_positions
          .split(",")
          .slice(1);
        const result = [];
        for (let i = 0; i < interest_positions.length; i++) {
          const data = interest_positions[i].trim();
          if (data) {
            result.push({
              field: "interest_positions",
              title: data,
            });
          }
        }
        setFilterInterestPositionList(result);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingFilterInterestPosition]);

  return {
    setOpenFilterInterestPosition,
    filterInterestPositionList,
    openFilterInterestPosition,
    loadingFilterInterestPosition,
  };
};

export default useFetchFilterInterestPosition;
