import { useEffect, useState } from "react";
import { getUser } from "../../../lib/services/v2/user";

const useFetchUplinerClient = (token, companyId) => {
  const [query, setQuery] = useState();
  const [tempQueryClient, setTempQueryClient] = useState();
  const [openUplinerClient, setOpenUplinerClient] = useState(false);
  const [uplinerClientList, setUplinerClientList] = useState([]);
  const [loadingUplinerClient, setLoadingUplinerClient] = useState(false);

  useEffect(
    () => {
      // Wait 1000ms before copying the value of tempValue into value;
      const timeout = setTimeout(() => {
        setUplinerClientList([]);
        setQuery(tempQueryClient);
      }, 500);

      // If the hook is called again, cancel the previous timeout
      // This creates a debounce instead of a delay
      return () => clearTimeout(timeout);
    },
    // Run the hook every time the user makes a keystroke
    [tempQueryClient]
  );

  useEffect(() => {
    let active = true;

    (async () => {
      setLoadingUplinerClient(true);
      const data = await getUser(
        {
          // user_level: jobLevelClient,

          company_id: companyId,
          role_id: "client",
        },
        {
          Authorization: token,
        }
      );

      if (openUplinerClient) {
        setUplinerClientList([...data.data]);
      }

      setLoadingUplinerClient(false);
    })();

    return () => {
      active = false;
    };
  }, [token, query, companyId, openUplinerClient]);

  return {
    setOpenUplinerClient,
    uplinerClientList,
    openUplinerClient,
    loadingUplinerClient,
    setTempQueryClient,
  };
};

export default useFetchUplinerClient;
