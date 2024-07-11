'use client';
import { useState } from "react";

const Board_main_control_bar = () => {
  const [sort_option_visible, set_sort_option_visible] = useState<boolean>(false);

  return (
    <div className="flex justify-between items-center">
      <button className="p-2 rounded-lg text-white bg-blue-500">작성하기</button>

      <div>
        <input type="text" className="border p-1 rounded-md" placeholder="커뮤니티 내에서 검색" />
        <button className="p-2 rounded-lg border">검색</button>
      </div>

      <div>
        <button className="p-2 rounded-lg border" onClick={() => set_sort_option_visible(!sort_option_visible)}>최신순</button>
        {sort_option_visible && (
          <div className="flex flex-col w-[100px] gap-3 p-3 text-sm ml-1 border shadow-md rounded-md absolute bg-white mt-1">
            <p className="text-blue-500">최신순</p> {/* 글 목록 정렬 버튼 */}
            <p>추천순</p>
            <p>댓글순</p>
            <p>조회순</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board_main_control_bar;