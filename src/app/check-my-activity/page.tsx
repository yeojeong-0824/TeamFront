"use client";

import { useState } from "react";
import CheckMyActivityBoardWrapper from "./boards/page";
import CheckMyActivityCommentWrapper from "./comments/page";

function CheckMyActivity() {
  const [pageStatus, setPageStatus] = useState("board");

  return (
    <div className="flex items-center justify-center bg-white sm:bg-gray-100 p-1 mt-[63.48px] sm:mt-[90.9px]">
      <div className="p-5 sm:p-10 bg-white text-left shadow-none sm:shadow-md rounded-lg w-full sm:w-[500px] md:w-[700px] min-h-[calc(100vh-304px)] sm:min-h-[calc(100vh-294px)]">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setPageStatus("board")}
            className={`py-2 px-4 rounded border-none bg-transparent ${
              pageStatus === "board"
                ? "text-gray-800 font-bold underline"
                : "text-gray-600"
            }`}
          >
            게시판
          </button>
          <button
            onClick={() => setPageStatus("comment")}
            className={`py-2 px-4 rounded border-none bg-transparent ${
              pageStatus === "comment"
                ? "text-gray-800 font-bold underline"
                : "text-gray-600"
            }`}
          >
            댓글
          </button>
        </div>
        <hr />
        <div className="relative max-w-[800px] mx-auto p-2">
          {pageStatus === "board" ? (
            <CheckMyActivityBoardWrapper />
          ) : (
            <CheckMyActivityCommentWrapper />
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckMyActivity;
