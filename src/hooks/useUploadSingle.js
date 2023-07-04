import { useEffect, useState } from "react";

const useUploadSingle = (defaultPreview = undefined) => {
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState();
  const [pesan, setPesan] = useState();
  const [userFile, setUserFile] = useState(defaultPreview);
  const [errorFiles, setErrorFiles] = useState(false);

  useEffect(() => {
    if (!banner) {
      if (userFile) {
        setPreview(defaultPreview);
        return;
      }
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(banner);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [banner, userFile, defaultPreview]);

  const onSelectFile = (e) => {
    const file = e.target.files;

    if (!file || file.length === 0) {
      setBanner(undefined);
      setErrorFiles(false);
      setPesan("");
      return;
    }

    if (file[0]?.size > 2000000) {
      setBanner(undefined);
      setErrorFiles(true);
      setPesan("*File harus dibawah 2 MB");
      return;
    }

    const pattern = /(image-.*)|(.*\.pdf$)|(.*\.docx$)/i;
    if (!file[0]?.name.match(pattern)) {
      setBanner(undefined);
      setErrorFiles(true);
      setPesan("*File harus berupa dokumen teks (Word) atau PDF");
      return;
    }
    setErrorFiles(false);
    setPesan("");
    setBanner(file[0]);
  };

  const handleDeletePoster = () => {
    setBanner(null);
    setPreview(undefined);
    setUserFile(undefined);
  };

  return {
    handleDeletePoster,
    onSelectFile,
    errorFiles,
    preview,
    banner,
    pesan,
  };
};

export default useUploadSingle;
