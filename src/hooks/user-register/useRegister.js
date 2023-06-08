import { useState } from "react";
import axios from "axios";

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const doSubmit = async ({ data, onSuccess, onError }) => {
    setLoading(true);
    try {
      await axios.post("/api/v2/users", data);
      setLoading(false);
      onSuccess();
      return;
    } catch (error) {
      setLoading(false);
      const errMsg =
        error.response.data?.message ?? "Terjadi kesalahan pada server";
      onError(errMsg);
      return;
    }
  };

  return {
    doSubmit,
    loading,
  };
};

export default useRegister;
