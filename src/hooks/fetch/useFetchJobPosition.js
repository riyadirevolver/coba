import { useEffect, useState } from "react";
import { JOB_POSITION } from "../../../utils/constant/listConstant";

const useJobPosition = (token) => {
  const [openJobPosition, setOpenJobPosition] = useState(false);
  const [jobPositionList, setJobPositionList] = useState([]);
  const loadingJobPosition = openJobPosition && jobPositionList.length === 0;

  const compareByTitle = (jobA, jobB) => {
    const titleA = jobA.title.toLowerCase();
    const titleB = jobB.title.toLowerCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    let active = true;

    if (!loadingJobPosition) {
      return undefined;
    }

    (async () => {
      if (active) {
        setJobPositionList(JOB_POSITION.sort(compareByTitle));
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
