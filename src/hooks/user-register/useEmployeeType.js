import { useEffect, useState } from "react";
import { getEmployeeType } from "../../../lib/services/v2/employee-type";

const useEmployeeType = (token, companyId) => {
  const [openEmployeeType, setOpenEmployeeType] = useState(false);
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const loadingEmployeeType = openEmployeeType && employeeTypeList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingEmployeeType) {
      return undefined;
    }

    (async () => {
      const data = await getEmployeeType(
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
        setEmployeeTypeList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingEmployeeType, token, companyId]);

  return {
    setOpenEmployeeType,
    employeeTypeList,
    openEmployeeType,
    loadingEmployeeType,
  };
};

export default useEmployeeType;
