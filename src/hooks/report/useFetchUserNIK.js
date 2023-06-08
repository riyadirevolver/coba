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
const useFetchUserNIK = (token, params = {}) => {
  const [query, setQuery] = useState();
  const [tempQuery, setTempQuery] = useState();
  const [openNIK, setOpenNIK] = useState(false);
  const [nikList, setNIKList] = useState([]);
  const [loadingNIK, setLoadingNIK] = useState(false);

  useEffect(
    () => {
      // Wait 1000ms before copying the value of tempValue into value;
      const timeout = setTimeout(() => {
        setNIKList([]);
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
      setNIKList([]);
      return undefined;
    }

    (async () => {
      setLoadingNIK(true);

      const data = await getSearchUser(
        {
          nik: query,
          ...params,
        },
        {
          Authorization: token,
        }
      );

      if (active) {
        setNIKList([...data.data]);
      }

      setLoadingNIK(false);
    })();

    return () => {
      active = false;
    };
  }, [token, query]);

  return {
    setOpenNIK,
    nikList,
    openNIK,
    loadingNIK,
    setTempQuery,
  };
};

export default useFetchUserNIK;
