"use client";

import { useState } from 'react';
import CheckMyActivityBoardWrapper from './boards/page';
import CheckMyActivityCommentWrapper from './comments/page';

function CheckMyActivity() {
  const [pageStatus, setPageStatus] = useState("board");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div className="p-10 mt-10 sm:p-20 bg-white text-left shadow-md rounded-lg w-1/2 min-h-[1300px]">
        <div className="flex justify-center mb-6 space-x-4"> {/* 중앙 정렬을 위해 justify-center 사용 */}
          <button
            onClick={() => setPageStatus("board")}
            className={`py-2 px-4 rounded border-none bg-transparent ${pageStatus === "board" ? "text-gray-800 font-bold" : "text-gray-600"}`}
          >
            게시판
          </button>
          <button
            onClick={() => setPageStatus("comment")}
            className={`py-2 px-4 rounded border-none bg-transparent ${pageStatus === "comment" ? "text-gray-800 font-bold" : "text-gray-600"}`}
          >
            댓글
          </button>
        </div>
        <hr/>
        <div className="relative max-w-[800px] min-h-[1300px] mx-auto mt-10 sm:mt-20 p-2">
          {pageStatus === "board" ? <CheckMyActivityBoardWrapper /> : <CheckMyActivityCommentWrapper />}
        </div>
      </div>
    </div>
  );
}

export default CheckMyActivity;