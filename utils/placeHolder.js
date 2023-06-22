export const handlePlaceHolder = (field) => {
  if (field === "name_user") {
    return "Cari berdasarkan nama";
  } else if (field === "nik_user") {
    return "Cari berdasarkan NIK";
  } else if (field === "client_name") {
    return "Cari berdasarkan nama klien";
  } else if (field === "pic_name") {
    return "Cari berdasarkan nama PIC";
  } else {
    return "Cari berdasarkan apa yang ingin dicari";
  }
};
