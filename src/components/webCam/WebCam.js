import React from "react";
import Webcam from "react-webcam";
const WebCamComp = (props) => {
  return (
    <div>
      <Webcam {...props} />
    </div>
  );
};

export default WebCamComp;
