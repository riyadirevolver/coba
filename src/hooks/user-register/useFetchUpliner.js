import { useEffect, useState } from "react";
import { getUser } from "../../../lib/services/v2/user";

const useFetchUpliner = (token, companyId, defaultJobLevel = null) => {
  const [jobLevel, setJobLevel] = useState(defaultJobLevel);
  const [query, setQuery] = useState();
  const [tempQuery, setTempQuery] = useState();
  const [openUpliner, setOpenUpliner] = useState(false);
  const [uplinerList, setUplinerList] = useState([]);
  const [loadingUpliner, setLoadingUpliner] = useState(false);

  useEffect(
    () => {
      // Wait 1000ms before copying the value of tempValue into value;
      const timeout = setTimeout(() => {
        setUplinerList([]);
        setQuery(tempQuery);
      }, 500);

      // If the hook is called again, cancel the previous timeout
      // This creates a debounce instead of a delay
      return () => clearTimeout(timeout);
    },
    // Run the hook every time the user makes a keystroke
    [tempQuery]
  );

  useEffect(() => {
    let active = true;

    // if (!query) {
    //   setUplinerList([]);
    //   return undefined;
    // }

    (async () => {
      setLoadingUpliner(true);

      const data = await getUser(
        {
          ...(query && {
            "$or[0][fullname][$like]": `%${query}%`,
            "$or[1][nik][$like]": `%${query}%`,
          }),
          user_level: jobLevel,
          company_id: companyId,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setUplinerList([...data.data]);
      }

      setLoadingUpliner(false);
    })();

    return () => {
      active = false;
    };
  }, [token, query, jobLevel, companyId]);

  return {
    setOpenUpliner,
    uplinerList,
    openUpliner,
    loadingUpliner,
    setTempQuery,
    setJobLevel,
  };
};

export default useFetchUpliner;
