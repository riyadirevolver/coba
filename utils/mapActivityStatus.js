export const mapActivityStatus = (status) => {
  switch (status) {
    case "IN":
      return "Hadir";
    case "IZIN":
      return "Izin";
    case "OVERTIME":
      return "Lembur";
    case "CUTI":
      return "Cuti";
    case "SAKIT":
      return "Sakit";
    default:
      break;
  }
};
