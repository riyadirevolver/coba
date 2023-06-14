import { useEffect, useState } from "react";

const useUploadPhoto = (defaultPreview = []) => {
  const [gambar, setGambar] = useState([]);
  const [preview, setPreview] = useState([]);
  const [pesan, setPesan] = useState();
  const [userPhoto, setUserPhoto] = useState(defaultPreview);

  useEffect(() => {
    if ((!gambar || gambar.length === 0) && userPhoto !== undefined) {
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
      return;
    }
    const selectedFiles = Array.from(files);
    if (selectedFiles.some((file) => file.size > 2000000)) {
      setGambar([]);
      setPesan("*File harus dibawah 2 MB");
      return;
    }
    const pattern = /image-*/;
    if (selectedFiles.some((file) => !file.type.match(pattern))) {
      setGambar([]);
      setPesan("*File harus berupa gambar");
      return;
    }
    setGambar(selectedFiles);
  };

  const handleDeletePoster = () => {
    setGambar([]);
    setPreview([]);
    setUserPhoto(undefined);
  };

  return {
    handleDeletePoster,
    onSelectFile,
    preview,
    gambar,
    pesan,
  };
};

export default useUploadPhoto;
