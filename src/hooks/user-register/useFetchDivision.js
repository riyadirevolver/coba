import { useEffect, useState } from "react";
import { getDivision } from "../../../lib/services/v2/division";

const useFetchDivision = (token, company_id) => {
  const [openDivision, setOpenDivision] = useState(false);
  const [divisionList, setDivisionList] = useState([]);
  const loadingDivision = openDivision && divisionList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingDivision) {
      return undefined;
    }

    (async () => {
      const { data } = await getDivision(
        {
          "$sort[name]": 1,
          company_id: company_id,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setDivisionList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingDivision, token]);

  return {
    setOpenDivision,
    divisionList,
    openDivision,
    loadingDivision,
  };
};

export default useFetchDivision;
