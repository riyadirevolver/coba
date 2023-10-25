import FileSaver from "file-saver";

export const UseDownloadExcelBlob = async (blobData, name) => {
  const excelName = name ? name : "activity";
  const dirtyFileName = blobData.headers["content-disposition"];
  const regex =
    /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
  var fileName = dirtyFileName?.match(regex)[3] ?? dirtyFileName;

  var blob = new Blob([blobData?.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  FileSaver?.saveAs(blob, excelName);
};
