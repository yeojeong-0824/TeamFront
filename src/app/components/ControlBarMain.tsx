'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ControlBarMainProps } from "@/types/controlbar";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { PiNotePencilThin } from "react-icons/pi";

type FormData = {
  keyword: string;
};

const ControlBarMain = ({ sortOption, setSortOption, setCurrentPage }: ControlBarMainProps) => {
  const [sortOptionVisible, setSortOptionVisible] = useState<boolean>(false);
  const pointer = 'cursor-pointer';
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    setSortOption('latest');
    setCurrentPage(1);
    router.push(`/search/${formData.keyword}`);
  };

  const onInvalid = (error: any) => {
    Swal.fire({
      icon: 'error',
      title: '검색 실패',
      text: `${error.keyword?.message}`,
      showConfirmButton: false,
      timer: 800,
    });
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
    setSortOptionVisible(false);
    setCurrentPage(1);
  };

  const handlePost = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다'
      });
      router.push('/login-ui');
      return;
    }
    router.push('/write');
  };

  return (
    <div className="flex justify-between items-center mt-[30px] pb-8 border-b-1">
        <button onClick={handlePost} className="flex items-center gap-1 p-2 px-3 text-sm bg-[#6EB4FB] text-white hover:bg-blue-500 rounded-lg">
        <PiNotePencilThin className="inline text-xl"/>
        작성하기
        </button>

      <form className="flex items-end gap-1" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <Input
          aria-label="검색"
          type="text"
          label="검색"
          variant="underlined"
          placeholder="게시글을 검색해보세요"
          {...register('keyword', {
            required: '검색어를 입력해주세요',
            maxLength: { value: 15, message: '검색어는 15자 이하로 입력하세요' }
          })}
          onChange={(e) => setValue('keyword', e.target.value)}
          isClearable
        />
        <button type="submit" className="h-[24px]">
          <CiSearch className="text-2xl text-gray-900" />
        </button>
      </form>

      <div>
        <button className="p-2 text-sm border text-gray-900 rounded-lg" 
        onClick={() => setSortOptionVisible((option)=> !option)}>
          {sortOption === 'latest' ? '최신순' : sortOption === 'score' ? '별점순' : '댓글순'}
        </button>
        {sortOptionVisible && (
          <div className="flex flex-col absolute w-[100px] gap-3 mt-1 p-3 text-sm bg-white border rounded-md shadow-sm">
            {['latest', 'score', 'comment'].map((option) => (
              <p
                key={option}
                className={`${pointer} ${sortOption === option && 'text-blue-500'}text-gray-900 hover:text-blue-500`}
                onClick={() => handleSortOption(option)}
              >
                {option === 'latest' ? '최신순' : option === 'score' ? '별점순' : '댓글순'}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ControlBarMain;
