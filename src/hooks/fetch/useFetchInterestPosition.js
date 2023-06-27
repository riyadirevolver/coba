import { useEffect, useState } from "react";

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
      const SKILL_LISTS = [];
      if (active) {
        setInterestList(SKILL_LISTS);
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
