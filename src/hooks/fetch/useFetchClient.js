import { useEffect, useState } from "react";
import { getClient } from "../../../lib/services/client";

const useFetchClient = (token) => {
  const [openClient, setOpenClient] = useState(false);
  const [clientList, setClientList] = useState([]);
  const loadingClient = openClient && clientList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingClient) {
      return undefined;
    }

    (async () => {
      const { data } = await getClient(token, {
        //  $limit: -1,
        "$sort[name]": 1,
      });

      if (active) {
        setClientList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingClient, token]);

  return {
    setOpenClient,
    clientList,
    openClient,
    loadingClient,
  };
};

export default useFetchClient;
