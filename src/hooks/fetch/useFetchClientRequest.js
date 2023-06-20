import { useEffect, useState } from "react";
import { getClientRequest } from "../../../lib/services/client-request";

const useFetchClientRequest = (token, id) => {
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
      const { data } = await getClientRequest(token, {
        "$sort[position]": 1,
        ...(id && {
          client_id: id,
        }),
      });

      if (active) {
        setClientRequestList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingClientRequest, token]);

  return {
    setOpenClientRequest,
    clientRequestList,
    openClientRequest,
    loadingClientRequest,
  };
};

export default useFetchClientRequest;
