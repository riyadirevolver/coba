import { useEffect, useState } from "react";
import { getJobLevel } from "../../../lib/services/v2/job-level";

const useFetchJobLevel = (token, companyId) => {
  const [openJobLevel, setOpenJobLevel] = useState(false);
  const [jobLevelList, setJobLevelList] = useState([]);
  const loadingJobLevel = openJobLevel && jobLevelList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingJobLevel) {
      return undefined;
    }

    (async () => {
      const data = await getJobLevel(
        {
          $limit: -1,
          "$sort[level]": 1,
          company_id: companyId,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setJobLevelList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingJobLevel, token, companyId]);

  return {
    setOpenJobLevel,
    jobLevelList,
    openJobLevel,
    loadingJobLevel,
  };
};

export default useFetchJobLevel;
