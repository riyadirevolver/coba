import * as FileDownload from "js-file-download";
import React from "react";
import ServiceAdapter from "../../../lib/services";
const useGenerateLaporan = () => {
  const [loading, setLoading] = React.useState(false);
  const generate = async ({ data, onSuccess, onError }) => {
    setLoading(true);
    try {
      const response = await ServiceAdapter().post("/generate-report", data, {
        responseType: "arraybuffer",
      });
      FileDownload(response.data, `rekap-absen.xlsx`);
      setLoading(false);
      onSuccess();
      return;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      const errMessage =
        error.response?.data?.message ?? "Maaf terjadi kesalahan pada server";
      onError(errMessage);
      onError(errMessage);
      return;
    }
  };
  return { generate, loading };
};

export default useGenerateLaporan;
