import { useEffect, useState } from "react";
import ServiceAdapter from "../../../lib/services";

const useFetchInterestPosition = () => {
  const [openInterest, setOpenInterest] = useState(false);
  const [interestList, setInterestList] = useState([]);
  const loadingInterest = openInterest && interestList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingInterest) {
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
        setInterestList(result);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingInterest]);

  return {
    setOpenInterest,
    interestList,
    openInterest,
    loadingInterest,
  };
};

export default useFetchInterestPosition;
