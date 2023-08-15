import validator from "validator";

const isValidUrl = (url) => {
  const valid = validator.isURL(url, {
    require_tld: true,
    require_host: true,
    require_protocol: true,
  });

  return valid;
};

export default isValidUrl;
