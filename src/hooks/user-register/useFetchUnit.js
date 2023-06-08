import { useEffect, useState } from "react";
import { getDepartments } from "../../../lib/services/v2/department";

const useFetchUnit = (token, companyID) => {
  const [openUnit, setOpenUnit] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const loadingUnit = openUnit && unitList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingUnit) {
      return undefined;
    }

    (async () => {
      const data = await getDepartments(
        {
          $limit: -1,
          ...(companyID && {
            company_id: companyID,
          }),
          "$sort[name]": 1,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setUnitList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingUnit, token, companyID]);

  return {
    setOpenUnit,
    unitList,
    openUnit,
    loadingUnit,
  };
};

export default useFetchUnit;
