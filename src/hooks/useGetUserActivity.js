import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const useGetUserActivity = (userId, params = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      await axios
        .get("/api/activity", {
          params: {
            // user_id: userId,
            ...params,
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          const errors = err.response;

          setError({
            status: false,
            statusCode: errors.status,
            statusText: errors.statusText,
          });
          setLoading(false);
        });
    };
    if (data.length <= 1 && loading) {
      fetchActivity();
    }
    return () => {
      fetchActivity;
    };
  }, [data, userId, params, loading]);

  return {
    loading: loading,
    data: data,
    error: error,
  };
};
