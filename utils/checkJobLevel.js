const checkJobLevel = (jobLevel) => {
  if (!jobLevel) {
    return false;
  }
  return jobLevel > 1;
};

export default checkJobLevel;
