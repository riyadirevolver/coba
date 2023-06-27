import { useEffect, useState } from "react";
import { getSearchZip } from "../../../lib/services/zip";

const useFetchZip = (field) => {
  const [query, setQuery] = useState();
  const [tempQuery, setTempQuery] = useState();
  const [openZip, setOpenZip] = useState(false);
  const [searchZip, setSearchZip] = useState([]);
  const [loadingZip, setLoadingZip] = useState(false);

  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setSearchZip([]);
        setQuery(tempQuery);
      }, 500);

      return () => clearTimeout(timeout);
    },
    // Run the hook every time the user makes a keystroke
    [tempQuery]
  );

  useEffect(() => {
    let active = true;

    if (!query) {
      setSearchZip([]);
      return undefined;
    }

    (async () => {
      setLoadingZip(true);

      const data = await getSearchZip({
        limit: -1,
        search: 1,
        q: `${query}`,
        exclude: field,
      });

      if (active) {
        setSearchZip([...data.data]);
      }

      setLoadingZip(false);
    })();

    return () => {
      active = false;
    };
  }, [query]);

  return {
    setOpenZip,
    searchZip,
    openZip,
    loadingZip,
    setTempQuery,
  };
};

export default useFetchZip;
