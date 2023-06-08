const labelDisplayedRows = ({ from, to, count }) => {
    return `Menampilkan ${from}-${to} dari ${
      count !== -1 ? count : `more than ${to}`
    } data`;
  };
  
  export default labelDisplayedRows;
  