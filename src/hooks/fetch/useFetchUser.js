import { useEffect, useState } from "react";
import { getUser } from "../../../lib/services/user";

const useFetchUser = (token) => {
  const [query, setQuery] = useState();
  const [tempQuery, setTempQuery] = useState();
  const [openUser, setOpenUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const [loadingText, setLoadingText] = useState("");
  const loadingUser = openUser && userList.length === 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserList([]);
      setLoadingText("loading...");
      setQuery(tempQuery);
    }, 500);
    return () => clearTimeout(timeout);
  }, [tempQuery]);

  useEffect(() => {
    let active = true;

    if (!loadingUser) {
      setLoadingText("");
      return undefined;
    }

    (async () => {
      const { data } = await getUser(token, {
        ...(query && {
          "fullname[$like]": `%${query}%`,
        }),
        // $limit: -1,
        role: "client",
        "$sort[fullname]": 1,
      });

      if (active) {
        setLoadingText("data kosong");
        setUserList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingUser, token, query]);

  return {
    setOpenUser,
    userList,
    openUser,
    loadingUser,
    loadingText,
    setTempQuery,
  };
};

export default useFetchUser;
