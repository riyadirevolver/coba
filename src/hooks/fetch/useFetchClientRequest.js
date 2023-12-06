import { useEffect, useState } from "react";
import { getClientRequest } from "../../../lib/services/client-request";

const useFetchClientRequest = (token, id, role) => {
  const [openClientRequest, setOpenClientRequest] = useState(false);
  const [clientRequestList, setClientRequestList] = useState([]);
  const loadingClientRequest =
    openClientRequest && clientRequestList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingClientRequest) {
      return undefined;
    }

    (async () => {
      if (!id) {
        return setClientRequestList([]);
      }
      const data = await getClientRequest(token, {
        "$sort[position]": 1,
        $limit: "-1",
        ...(id && {
          client_id: id,
        }),
        ...(role === "admin" && {
          is_active: 1,
        }),
      });

      if (active) {
        setClientRequestList([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingClientRequest, token, id]);

  return {
    setOpenClientRequest,
    clientRequestList,
    openClientRequest,
    loadingClientRequest,
    setClientRequestList,
  };
};

export default useFetchClientRequest;
