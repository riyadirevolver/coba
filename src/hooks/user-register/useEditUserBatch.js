import { useState } from "react";
import axios from "axios";

const useEditUserBatch = (userIds) => {
  const [loading, setLoading] = useState(false);

  const doSubmitBatch = async ({ data, onSuccess, onError }) => {
    setLoading(true);
    try {
      const payload = data.filter((user, idx) => user.id === userIds[idx]);
      for (let index = 0; index < userIds.length; index++) {
        const element = userIds[index];
        await axios.patch(`/api/v2/users/${element}`, payload[index]);
      }

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
    doSubmitBatch,
    loading,
  };
};

export default useEditUserBatch;
