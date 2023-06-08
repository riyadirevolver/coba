import { useEffect, useState } from "react";
import { getLocationPoints } from "../../../lib/services/v2/location-point";

const useFetchLocationPoint = (token, companyId) => {
  const [openLocationPoint, setOpenLocationPoint] = useState(false);
  const [locationPointList, setLocationPointList] = useState([]);
  const loadingLocationPoint =
    openLocationPoint && locationPointList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingLocationPoint) {
      return undefined;
    }

    (async () => {
      const data = await getLocationPoints(
        {
          $limit: -1,
          "$sort[name]": 1,
          company_id: companyId,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setLocationPointList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingLocationPoint, token, companyId]);

  return {
    setOpenLocationPoint,
    locationPointList,
    openLocationPoint,
    loadingLocationPoint,
  };
};

export default useFetchLocationPoint;
