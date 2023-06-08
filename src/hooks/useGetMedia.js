export const useGetMedia = async (contraints) => {
  let stream = await global.navigator?.mediaDevices.getUserMedia(contraints);

  if (stream) {
    return stream;
  } else {
    return undefined;
  }
};
