import * as FileDownload from "js-file-download";
import React from "react";
import ServiceAdapter from "../../../lib/services";
import axios from "axios";
const useGenerateReportClient = () => {
  const [loading, setLoading] = React.useState(false);
  const generate = async ({ data, onSuccess, onError }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/client/generate-report", data, {
        responseType: "arraybuffer",
      });
      FileDownload(response.data, `rekap-absen.xlsx`);
      setLoading(false);
      onSuccess();
      return;
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.byteLength);
      setLoading(false);
      // const errMessage =
      //   error.response?.data?.byteLength === 119
      //     ? "Tanggal tidak boleh kurang dari 2 hari"
      //     : "Maaf terjadi kesalahan pada server";
      const errMessage =
        error.response?.data?.message ?? "Maaf terjadi kesalahan pada server";
      onError(errMessage);
      onError(errMessage);
      return;
    }
  };
  return { generate, loading };
};

export default useGenerateReportClient;
