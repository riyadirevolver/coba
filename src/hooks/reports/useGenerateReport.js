import * as FileDownload from "js-file-download";
import React from "react";
import ServiceAdapter from "../../../lib/services";
const useGenerateReport = () => {
  const [loading, setLoading] = React.useState(false);
  const generate = async ({ data, path, title, onSuccess, onError }) => {
    setLoading(true);
    try {
      const response = await ServiceAdapter().get(path, {
        responseType: "arraybuffer",
      });
      FileDownload(response.data, `${title}.xlsx`);
      setLoading(false);
      onSuccess();
      return;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      const errMessage =
        error.response?.data?.message || "Maaf terjadi kesalahan pada server";
      onError(errMessage);
      return;
    }
  };
  return { generate, loading };
};

export default useGenerateReport;
