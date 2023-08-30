import { useEffect, useState } from "react";
import { getClient } from "../../../lib/services/client";

const useFetchClient = (token) => {
  // const [tempQuery, setTempQuery] = useState();
  const [query, setQuery] = useState();
  const [openClient, setOpenClient] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [loadingText, setLoadingText] = useState("");
  const loadingClient = openClient && clientList.length === 0;

  useEffect(() => {
    (async () => {
      try {
        setLoadingText("loading...");
        const { data } = await getClient(token, {
          //  $limit: -1,
          ...(query && {
            "name[$like]": `%${query}%`,
          }),
          "$sort[name]": 1,
        });
        // console.clear();
        // console.log(data);
        if (data.length > 0) {
          setLoadingText("");
          setClientList(data);
        } else {
          setClientList([]);
          setLoadingText("data kosong");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token, query]);

  return {
    setOpenClient,
    clientList,
    openClient,
    loadingClient,
    loadingText,
    setQuery,
  };
};

export default useFetchClient;
