'use client';

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ControlBarMainProps } from "@/types/controlbar";
import { usePathname } from "next/navigation";

const ControlBarMain = ({sortOption, setSortOption, setCurrentPage}: ControlBarMainProps) => {
  const [sortOptionVisible, setSortOptionVisible] = useState<boolean>(false);
  const pointer = 'cursor-pointer';
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const isSearchPage = pathname.includes('search');

  const onSubmit = (formData: any) => {
    router.push(`/search/${formData.keyword}`)
    // 새 검색이 시작되므로 로컬스토리지에 있는 searchpage 모든 정보들을 삭제
    localStorage.removeItem('searchPageid');
    localStorage.removeItem('searchPagelatest');
    localStorage.removeItem('searchPagecomment');
    localStorage.removeItem('SearchSortOption');
  };

  useEffect(() => {
    if(isSearchPage) {
      const SearchSortOption = localStorage.getItem('SearchSortOption');
      SearchSortOption && setSortOption(SearchSortOption);
    }
    const sortOption = localStorage.getItem('sortOption');
    sortOption && setSortOption(sortOption);
  }, []);

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
    if(pathname === '/') {
      const sortPostsPage = localStorage.getItem(`sortPosts${option}`);
      localStorage.setItem('sortOption', option);
      sortPostsPage && setCurrentPage(Number(sortPostsPage));
    } 
    if(isSearchPage) {
      const searchPage = localStorage.getItem(`searchPage${option}`);
      localStorage.setItem('SearchSortOption', option);
      searchPage && setCurrentPage(Number(searchPage));
    }
  };

  return (
    <div className="flex justify-between items-center">
      <Link href="/write">
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
        <button className="p-2 rounded-lg border text-blue-500" onClick={() => setSortOptionVisible(!sortOptionVisible)}>
          {sortOption}
        </button>
        {sortOptionVisible && (
          <div className="flex flex-col w-[100px] gap-3 p-3 text-sm ml-1 border shadow-md rounded-md absolute bg-white mt-1">
            {['latest', 'id', 'comment'].map((option) => (
              // like오류 때문에 제외하였음, 추후 추가
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