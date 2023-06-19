import { useEffect, useState } from "react";
import { getPersonJC } from "../../../lib/services/person-jc";

const useFetchPersonJC = (token) => {
  const [openPersonJC, setOpenPersonJC] = useState(false);
  const [personJCList, setPersonJCList] = useState([]);
  const loadingPersonJC = openPersonJC && personJCList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingPersonJC) {
      return undefined;
    }

    (async () => {
      const { data } = await getPersonJC(token, {
        //  $limit: -1,
        "$sort[name]": 1,
      });

      if (active) {
        setPersonJCList(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingPersonJC, token]);

  return {
    setOpenPersonJC,
    personJCList,
    openPersonJC,
    loadingPersonJC,
  };
};

export default useFetchPersonJC;
