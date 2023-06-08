import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    const res = await axios.get(url);
    setTempData(res);
    setLoading(false);
    setFetched(true);
  };

  const fetchWithParams = useCallback(async (params) => {
    setLoading(true);
    setFetched(false);
    if (params) {
      axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          setTempData(res);
          setLoading(false);
          setFetched(true);
        });
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!tempData) {
      axios
        .get(url)
        .then((res) => {
          setTempData(res);
          setLoading(false);
          setFetched(true);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          setFetched(true);
        });
    }
  }, [tempData, url]);

  const refetch = async () => {
    setLoading(true);
    setFetched(false);
    getData();
  };

  return {
    data: tempData,
    fetched,
    loading,
    error,
    refetch,
    fetchWithParams,
  };
}
