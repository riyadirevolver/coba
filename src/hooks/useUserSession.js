import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => await axios.get(url);

export const useUserSession = (options) => {
  const { data, error } = useSWR("/api/user", fetcher);

  if (options === "simple") {
    const newData = {
      fullname: data?.data?.fullname,
      photo: data?.data?.photo,
      requiredSelfie: data?.data?.requiredSelfie,
    };

    return {
      data: newData,
      error: error,
    };
  }
  return {
    data: data,
    error: error,
  };
};
