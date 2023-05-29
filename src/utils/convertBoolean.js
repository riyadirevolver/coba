export function convertToBoolean(value) {
  switch (value) {
    case 'true':
      return true;

    case 'false':
      return false;

    case 1:
      return true;

    case 0:
      return false;
    default:
      return false;
  }
}
