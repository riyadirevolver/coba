import { useEffect, useState } from "react";
import { getSchedule } from "../../../lib/services/v2/schedule";

const useFetchSchedule = (token, companyId) => {
  const [openSchedule, setOpenSchedule] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);
  const loadingSchedule = openSchedule && scheduleList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingSchedule) {
      return undefined;
    }

    (async () => {
      const data = await getSchedule(
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
        setScheduleList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSchedule, token, companyId]);

  return {
    setOpenSchedule,
    scheduleList,
    openSchedule,
    loadingSchedule,
  };
};

export default useFetchSchedule;
