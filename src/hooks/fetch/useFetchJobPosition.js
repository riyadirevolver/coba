import { useEffect, useState } from "react";
import { JOB_POSITION } from "../../../utils/constant/listConstant";

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
      if (active) {
        setJobPositionList(JOB_POSITION);
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
