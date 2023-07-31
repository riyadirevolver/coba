import { useEffect, useState } from "react";
import { getPosition } from "../../../lib/services/position";

const useJobPosition = (token) => {
  const [openJobPosition, setOpenJobPosition] = useState(false);
  const [jobPositionList, setJobPositionList] = useState([]);
  const loadingJobPosition = openJobPosition && jobPositionList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingJobPosition) {
      return undefined;
    }

    (async () => {
      const data = await getPosition(token, {
        $limit: -1,
        "$sort[name]": 1,
      });
      if (active) {
        setJobPositionList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingJobPosition, token]);

  return {
    setOpenJobPosition,
    jobPositionList,
    openJobPosition,
    loadingJobPosition,
  };
};

export default useJobPosition;
