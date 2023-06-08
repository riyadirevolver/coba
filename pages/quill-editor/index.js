import React, { useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";


import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuillEditor = () => {
  const [text, setText] = useState("");

  return (
    <Card sx={{ p: 0 }}>
      <ReactQuill
        value={text}
        onChange={(value) => {
          setText(value);
        }}
        placeholder="Type here..."
      />
    </Card>
  );
};

export default QuillEditor;
