import { useEffect, useState } from "react";
import { getUser } from "../../../lib/services/v2/user";

const useFetchUplinerClient3 = (token, companyId) => {
  const [query, setQuery] = useState();
  const [tempQueryClient3, setTempQueryClient3] = useState();
  const [openUplinerClient3, setOpenUplinerClient3] = useState(false);
  const [uplinerClientList3, setUplinerClientList3] = useState([]);
  const [loadingUplinerClient3, setLoadingUplinerClient3] = useState(false);

  useEffect(
    () => {
      // Wait 1000ms before copying the value of tempValue into value;
      const timeout = setTimeout(() => {
        setUplinerClientList3([]);
        setQuery(tempQueryClient3);
      }, 500);

      // If the hook is called again, cancel the previous timeout
      // This creates a debounce instead of a delay
      return () => clearTimeout(timeout);
    },
    // Run the hook every time the user makes a keystroke
    [tempQueryClient3]
  );

  useEffect(() => {
    let active = true;

    (async () => {
      setLoadingUplinerClient3(true);
      const data = await getUser(
        {
          // user_level: jobLevelClient,

          company_id: companyId,
          role_id: "client3",
        },
        {
          Authorization: token,
        }
      );

      if (openUplinerClient3) {
        setUplinerClientList3([...data.data]);
      }

      setLoadingUplinerClient3(false);
    })();

    return () => {
      active = false;
    };
  }, [token, query, companyId, openUplinerClient3]);

  return {
    setOpenUplinerClient3,
    uplinerClientList3,
    openUplinerClient3,
    loadingUplinerClient3,
    setTempQueryClient3,
  };
};

export default useFetchUplinerClient3;
