export const getFileExtension = (fileName) => {
  if (!fileName || fileName?.length <= 1) {
    if (fileName !== 'string') {
      return;
    }
  }
  const getExtension = fileName.split('/').pop();
  return getExtension;
};
