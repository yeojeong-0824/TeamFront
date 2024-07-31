'use client';
import Link from "next/link";
import { useState } from "react";

const ControlBarMain = () => {
  const [sortOptionVisible, setSortOptionVisible] = useState<boolean>(false);
  const pointer = 'cursor-pointer';
  
  return (
    <div className="flex justify-between items-center">
      <Link href={'/write'}>
        <button className="p-2 rounded-lg text-white bg-blue-500">작성하기</button>
      </Link>

      <form className="flex gap-1">
        <input type="text" className="border p-1 rounded-md" placeholder="커뮤니티 내에서 검색" />
        <button className="p-2 rounded-lg border">검색</button>
      </form>

      <div>
        <button className="p-2 rounded-lg border text-blue-500" onClick={() => setSortOptionVisible(!sortOptionVisible)}>최신순</button>
        {sortOptionVisible && (
          <div className="flex flex-col w-[100px] gap-3 p-3 text-sm ml-1 border shadow-md rounded-md absolute bg-white mt-1">
            <p className="text-blue-500">최신순</p> {/* 글 목록 정렬 버튼 */}
            <p className={pointer}>추천순</p>
            <p className={pointer}>댓글순</p>
            <p className={pointer}>조회순</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlBarMain;