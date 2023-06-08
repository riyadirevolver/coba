import { useEffect, useState } from "react";
import { getSearchUser } from "../../../lib/services/user";

/**
 *
 * @param {string} token Brearer token
 * @param {Object} params {
 * upliner_id: string,
 * user_id: string
 * }
 * @returns {Object} response API
 */
const useFetchUserDebounce = (token, params = {}) => {
  const [query, setQuery] = useState();
  const [tempQuery, setTempQuery] = useState();
  const [openUser, setOpenUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(
    () => {
      // Wait 1000ms before copying the value of tempValue into value;
      const timeout = setTimeout(() => {
        setUserList([]);
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

    if (!query) {
      setUserList([]);
      return undefined;
    }

    (async () => {
      setLoadingUser(true);

      const data = await getSearchUser(
        {
          "fullname[$like]": `%${query}%`,
          ...params,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setUserList([...data.data]);
      }

      setLoadingUser(false);
    })();

    return () => {
      active = false;
    };
  }, [token, query]);

  return {
    setOpenUser,
    userList,
    openUser,
    loadingUser,
    setTempQuery,
  };
};

export default useFetchUserDebounce;
