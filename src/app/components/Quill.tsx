import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from './QuillEditor.module.css';
import { Noto_Sans_KR } from 'next/font/google';
import ReactQuill, { UnprivilegedEditor } from 'react-quill'; // Import the ReactQuill namespace

// Dynamic import for React Quill
const Quill = dynamic(() => import('react-quill'), { ssr: false });

const notoSansKr = Noto_Sans_KR({ 
  weight: ['400', '700'],  // 필요한 폰트 굵기를 지정
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',  // CSS 변수 이름을 지정
})

interface QuillEditorProps {
  html: string;
  setHtml: (html: string) => void;
  defaultBody?: string;
}

export default function QuillEditor({ html, setHtml, defaultBody }: QuillEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
  ];

  const isQuillEmpty = (value: string) => {
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !value.includes('<img')) {
      return true;
    }
    return false;
  };

  const handleQuillChange = (content: string, delta: any, source: any, editor: UnprivilegedEditor) => { // Update the type of 'editor' parameter
    if (isQuillEmpty(content)) {
      setHtml(''); // 상태를 빈 문자열로 설정
    } else {
      const text = editor.getHTML();
      setHtml(text);
    }
  };

  return (
    <div className={`${styles.quillWrapper}${notoSansKr.className}`}>
      <Quill
        onChange={handleQuillChange}
        className={styles.quill}
        modules={modules}
        formats={formats}
        defaultValue={defaultBody}
        placeholder={'내용을 입력해주세요.'}
        theme="snow"
      />
    </div>
  );
}