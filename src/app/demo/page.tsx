'use client';

import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Demo = () => {
  const modules:{} = useMemo(() => ({
    toolbar: {
        container: [
            ["image"],
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "underline"]
        ]
    },
}), []);
  return (
    <div>
      <ReactQuill theme="snow" modules={modules} className="max-w-[850px] min-h-[300px] mx-auto" />
    </div>
  )
};

export default Demo;