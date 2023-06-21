import ServiceAdapter from ".";

// export async function uploadFile(file = {}) {
//   const formData = new FormData();
//   formData.append("uri", file);
//   const { data: response } = await ServiceAdapter().post("/upload", formData);
//   return response;
// }

export async function uploadFile(file = {}, onProgress) {
  const formData = new FormData();
  formData.append("uri", file);
  const { data: response } = await ServiceAdapter().post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      if (onProgress) {
        onProgress(progress);
      }
    },
  });
  return response;
}
