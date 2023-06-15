import axios from "axios";
import useSWR from "swr";
import NextApi from "../../lib/services/next-api";

const fetcher = async (url) => await NextApi().get(url);

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
