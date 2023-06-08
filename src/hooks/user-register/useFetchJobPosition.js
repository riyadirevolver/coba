import { useEffect, useState } from "react";
import { getJobPositions } from "../../../lib/services/v2/job-position";

const useFetchPosition = (token, companyId) => {
  const [openPosition, setOpenPosition] = useState(false);
  const [positionList, setPositionList] = useState([]);
  const loadingPosition = openPosition && positionList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingPosition) {
      return undefined;
    }

    (async () => {
      const data = await getJobPositions(
        {
          $limit: -1,
          company_id: companyId,
          "$sort[name]": 1,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setPositionList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingPosition, token, companyId]);

  return {
    setOpenPosition,
    positionList,
    openPosition,
    loadingPosition,
  };
};

export default useFetchPosition;
