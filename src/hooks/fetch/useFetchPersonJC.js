import { useEffect, useState } from "react";
import { getPersonJC } from "../../../lib/services/person-jc";

const useFetchPersonJC = (token) => {
  const [query, setQuery] = useState();
  const [tempQuery, setTempQuery] = useState();
  const [openPersonJC, setOpenPersonJC] = useState(false);
  const [personJCList, setPersonJCList] = useState([]);
  const loadingPersonJC = openPersonJC && personJCList.length === 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPersonJCList([]);
      setQuery(tempQuery);
    }, 500);
    return () => clearTimeout(timeout);
  }, [tempQuery]);

  useEffect(() => {
    let active = true;
    if (!loadingPersonJC) {
      return undefined;
    }

    (async () => {
      const { data } = await getPersonJC(token, {
        ...(query && {
          "name[$like]": `%${query}%`,
        }),
        "$sort[name]": 1,
      });

      if (active) {
        setPersonJCList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingPersonJC, token, query]);

  return {
    setOpenPersonJC,
    personJCList,
    openPersonJC,
    loadingPersonJC,
    setTempQuery,
  };
};

export default useFetchPersonJC;
