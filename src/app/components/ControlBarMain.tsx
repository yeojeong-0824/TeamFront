'use client';

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ControlBarMain = () => {
  const [sortOptionVisible, setSortOptionVisible] = useState<boolean>(false);
  const pointer = 'cursor-pointer';
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (formData: any) => {
    localStorage.removeItem('SearchCurrentPage');
    router.push(`/search/${formData.keyword}`);
  };

  const onInvalid = (error: any) => {
    Swal.fire({
      icon: 'error',
      title: '검색 실패',
      text: `${error.keyword?.message}`
    });
  };

  return (
    <div className="flex justify-between items-center">
      <Link href={'/write'}>
        <button className="p-2 rounded-lg text-white bg-blue-500">작성하기</button>
      </Link>

      <form className="flex gap-1" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <input
          type="text"
          className="border p-1 rounded-md"
          placeholder="커뮤니티 내에서 검색"
          {...register('keyword', {
            required: '검색어를 입력해주세요',
            maxLength: { value: 15, message: '검색어는 15자 이하로 입력하세요' }
          })}
        />
        <button className="p-2 rounded-lg border">검색</button>
      </form>

      <div>
        <button className="p-2 rounded-lg border text-blue-500" 
        onClick={() => setSortOptionVisible(!sortOptionVisible)}>최신</button>
        {sortOptionVisible && (
          <div className="flex flex-col w-[100px] gap-3 p-3 text-sm ml-1 border shadow-md rounded-md absolute bg-white mt-1">
            <p className="text-blue-500">최신</p> {/* 글 목록 정렬 버튼 */}
            <p className={pointer}>아이디</p>
            <p className={pointer}>좋아요</p>
            <p className={pointer}>댓글</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ControlBarMain;