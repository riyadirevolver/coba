import { useEffect, useState } from "react";

const useUploadPhoto = (defaultPreview = []) => {
  const [gambar, setGambar] = useState([]);
  const [preview, setPreview] = useState([]);
  const validationMessage =
    "*File harus berupa dokumen teks (word), PDF, atau format gambar (JPG/JPEG/PNG)";
  const [pesan, setPesan] = useState(validationMessage);
  const [errorFiles, setErrorFiles] = useState(false);
  useEffect(() => {
    if (!gambar || gambar.length === 0) {
      setPreview(defaultPreview);
    } else if (gambar.length > 0) {
      const objectUrls = gambar.map((file) => URL.createObjectURL(file));
      setPreview(objectUrls);

      return () => {
        objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
      };
    }
  }, []);

  const onSelectFile = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setGambar([]);
      setErrorFiles(false);
      setPesan("");
      return;
    }
    const selectedFiles = Array.from(files);
    if (selectedFiles.some((file) => file.size > 2000000)) {
      setGambar([]);
      setErrorFiles(true);
      setPesan("*File harus dibawah 2 MB");
      return;
    }
    // const pattern = /image-*/;
    // if (selectedFiles.some((file) => !file.type.match(pattern))) {
    //   setGambar([]);
    //   setErrorFiles(true);
    //   setPesan("*File harus berupa gambar");
    //   return;
    // }
    const allowedExtensions = /\.(docx|pdf|jpg|jpeg|png)$/i;
    if (selectedFiles.some((file) => !allowedExtensions.test(file.name))) {
      setGambar([]);
      setErrorFiles(true);
      setPesan(
        "*File harus berupa dokumen teks (word), PDF, atau format gambar (JPG/JPEG/PNG)"
      );
      return;
    }
    setGambar(selectedFiles);
    setPesan("");
    setErrorFiles(false);
  };

  const handleDeletePoster = () => {
    setGambar([]);
    setPreview([]);
    setPesan("");
    setErrorFiles(false);
  };

  return {
    handleDeletePoster,
    onSelectFile,
    errorFiles,
    preview,
    gambar,
    pesan,
  };
};

export default useUploadPhoto;
