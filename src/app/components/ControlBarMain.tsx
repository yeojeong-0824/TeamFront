import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ControlBarMainProps } from "@/types/controlbar";

const ControlBarMain = ({ sortOption, setSortOption, setCurrentPage }: ControlBarMainProps) => {
  const [sortOptionVisible, setSortOptionVisible] = useState<boolean>(false);
  const pointer = 'cursor-pointer';
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  
  const onSubmit = (formData: any) => {
    setSortOption('latest');
    setCurrentPage(1);
    router.push(`/search/${formData.keyword}`);
  };
  
  const onInvalid = (error: any) => {
    Swal.fire({
      icon: 'error',
      title: '검색 실패',
      text: `${error.keyword?.message}`
    });
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
    setSortOptionVisible(false);
    setCurrentPage(1);
  };

  const handlePost = () => {
    const token = localStorage.getItem('accessToken');
    if(!token) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다'
      });
      router.push('/login-ui');
      return;
    }
    router.push('/write');
  }

  return (
    <div className="flex justify-between items-center">
      <button onClick={handlePost} className="p-2 rounded-lg text-white bg-blue-500">
        작성하기
      </button>

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
        <button className="p-2 rounded-lg border text-blue-500" onClick={() => setSortOptionVisible(!sortOptionVisible)}>
          {sortOption}
        </button>
        {sortOptionVisible && (
          <div className="flex flex-col w-[100px] gap-3 p-3 text-sm ml-1 border shadow-md rounded-md absolute bg-white mt-1">
            {['latest', 'score', 'comment'].map((option) => (
              <p
                key={option}
                className={`${pointer} ${sortOption === option ? 'text-blue-500' : ''}`}
                onClick={() => handleSortOption(option)}
              >
                {option}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ControlBarMain;
