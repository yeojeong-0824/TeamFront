'use client';

import { NavigationNumberMainProps } from "@/types/navigation";
import { Pagination } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const NavigationNumberMain = ({ currentPage, setCurrentPage, totalPage }: NavigationNumberMainProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // URL에서 현재 페이지를 가져오기
  const queryPage = searchParams.get('page') ? Number(searchParams.get('page')) : currentPage;
  const sortOption = searchParams.get('sort') || 'latest';

  useEffect(() => {
    const validPage = Math.max(1, queryPage);
    // URL 쿼리 파라미터로부터 페이지를 설정
    if (validPage <= totalPage) {
      setCurrentPage(validPage);
    } else {
      setCurrentPage(totalPage);
    }
  }, [queryPage, setCurrentPage, totalPage]);
  
  const handlePage = (page: number) => {
    if (page < 1 || page > totalPage) return;

    // URL을 업데이트하여 페이지 정보 저장
    const query = new URLSearchParams(searchParams.toString());
    query.set('page', page.toString());
    query.set('sort', sortOption); // 기존 정렬 옵션 유지
    router.push(`${pathname}?${query.toString()}`);
    setCurrentPage(page);
  };

  return (
    <nav className="flex justify-center mt-3 absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <div className="w-[500px] flex justify-center gap-1">
        <Pagination
          total={totalPage}
          page={currentPage}
          onChange={handlePage}
          showControls
          className="flex gap-1"
        />
      </div>
    </nav>
  );
};

export default NavigationNumberMain;
