"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./QuillEditor.module.css";
import { Noto_Sans_KR } from "next/font/google";
import { UnprivilegedEditor } from "react-quill";
import usePostImages from "@/hooks/usePostImages";
import ReactQuill from "react-quill";

// Dynamic import for React Quill
const Quill = dynamic(() => import("react-quill"), { ssr: false });

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "700"], // 필요한 폰트 굵기를 지정
  subsets: ["latin"],
  variable: "--font-noto-sans-kr", // CSS 변수 이름을 지정
});

interface QuillEditorProps {
  html: string;
  setHtml: (html: string) => void;
  defaultBody?: string;
}

export default function QuillEditor({
  html,
  setHtml,
  defaultBody,
}: QuillEditorProps) {
  const quillRef = useRef<ReactQuill>();
  const { mutate: uploadImage } = usePostImages();

  const base64ToBlob = (base64: string) => {
    const byteString = atob(base64.split(",")[1]); // Base64 디코딩
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]; // MIME 타입 추출

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeString }); // Blob 반환
  };

  const handleClickImage = function (this: any) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
          const blob = base64ToBlob(reader.result as string);
          uploadImage(blob, {
            onSuccess: (data) => {
              if (quillRef.current) {
                const range = quillRef.current.getEditor().getSelection(true);
                const index = range.index + range.length;
                quillRef.current.getEditor().insertEmbed(index, "image", data);
              }
            },
          });
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "video"],
        ],
        handlers: {
          image: handleClickImage,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
    "video",
    "link",
  ];

  const isQuillEmpty = (value: string) => {
    if (
      value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value.includes("<img")
    ) {
      return true;
    }
    return false;
  };

  const handleQuillChange = (
    content: string,
    delta: any,
    source: any,
    editor: UnprivilegedEditor
  ) => {
    // Update the type of 'editor' parameter
    if (isQuillEmpty(content)) {
      setHtml(""); // 상태를 빈 문자열로 설정
    } else {
      const text = editor.getHTML();
      setHtml(text);
    }
  };

  return (
    <div className={`${styles.quillWrapper}${notoSansKr.className}`}>
      <Quill
        ref={quillRef}
        onChange={handleQuillChange}
        className={styles.quill}
        modules={modules}
        formats={formats}
        defaultValue={defaultBody}
        placeholder={"내용을 입력해주세요."}
        theme="snow"
      />
    </div>
  );
}
