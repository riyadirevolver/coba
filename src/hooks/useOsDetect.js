import { useState } from "react";
import { useEffect } from "react";
import { UAParser } from "ua-parser-js";

export const useOsDetect = () => {
  const [detectedDevice, setDetectedDevice] = useState(null);

  useEffect(() => {
    const detect = window.navigator.userAgent;
    if (detect) {
      setDetectedDevice(detect);
    }
    return () => {
      window;
    };
  }, []);

  const parser = new UAParser(detectedDevice);

  return {
    os: parser.getOS(),
    browser: parser.getBrowser(),
    device: parser.getDevice(),
    ua: parser.getUA(),
  };
};
