import { useEffect, useState } from "react";
import { getUser } from "../../../lib/services/user";

const useFetchUser = (token) => {
  const [openUser, setOpenUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const loadingUser = openUser && userList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingUser) {
      return undefined;
    }

    (async () => {
      const { data } = await getUser(token, {
        //  $limit: -1,
        role: "admin",
        "$sort[fullname]": 1,
      });

      if (active) {
        setUserList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingUser, token]);

  return {
    setOpenUser,
    userList,
    openUser,
    loadingUser,
  };
};

export default useFetchUser;
