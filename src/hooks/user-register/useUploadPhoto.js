import { useEffect, useState } from "react";

const useUploadPhoto = (defaultPreview = undefined) => {
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState();
  const [userPhoto, setUserPhoto] = useState(defaultPreview);

  useEffect(() => {
    if (!banner) {
      if (userPhoto) {
        setPreview(defaultPreview);
        return;
      }
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(banner);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [banner, userPhoto, defaultPreview]);

  const onSelectFile = (e) => {
    const file = e.target.files;

    if (!file || file.length === 0) {
      setBanner(undefined);
      return;
    }

    if (file[0].size > 2000000) {
      setBanner(undefined);
      openSnackBar("File harus dibawah 2 MB");
      return;
    }

    const pattern = /image-*/;

    if (!file[0].type.match(pattern)) {
      setBanner(undefined);
      openSnackBar("File harus berupa gambar");
      return;
    }

    setBanner(file[0]);
  };

  const handleDeletePoster = () => {
    setBanner(null);
    setPreview(undefined);
    setUserPhoto(undefined);
  };

  return {
    handleDeletePoster,
    onSelectFile,
    preview,
    banner,
  };
};

export default useUploadPhoto;
