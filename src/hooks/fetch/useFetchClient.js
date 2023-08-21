import { useEffect, useState } from "react";
import { getClient } from "../../../lib/services/client";

const useFetchClient = (token) => {
  const [query, setQuery] = useState();
  const [tempQuery, setTempQuery] = useState();
  const [openClient, setOpenClient] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [loadingText, setLoadingText] = useState("");
  const loadingClient = openClient && clientList.length === 0;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientList([]);
      setLoadingText("loading...");
      setQuery(tempQuery);
    }, 500);
    return () => clearTimeout(timeout);
  }, [tempQuery]);

  useEffect(() => {
    let active = true;

    if (!loadingClient) {
      setLoadingText("");
      return undefined;
    }
    (async () => {
      const { data } = await getClient(token, {
        //  $limit: -1,
        ...(query && {
          "name[$like]": `%${query}%`,
        }),
        "$sort[name]": 1,
      });

      if (active) {
        setLoadingText("data kosong");
        setClientList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingClient, token, query]);

  return {
    setOpenClient,
    clientList,
    openClient,
    loadingClient,
    loadingText,
    setTempQuery,
  };
};

export default useFetchClient;
