'use client';

import { NavigationNumberMainProps } from "@/types/navigation";
import { Pagination } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NavigationNumberMain = ({ currentPage, setCurrentPage, totalPage, sortOption }: NavigationNumberMainProps) => {
  const pathname = usePathname();
  const isSearchPage = pathname.includes('search');

  useEffect(() => {
    const pageKey = isSearchPage ? `searchPage${sortOption}` : `sortPosts${sortOption}`;
    const getPage = localStorage.getItem(pageKey);
    if (getPage) {
      setCurrentPage(Number(getPage));
    }
  }, [isSearchPage, sortOption, setCurrentPage]);

  const handlePage = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
    const pageKey = isSearchPage ? `searchPage${sortOption}` : `sortPosts${sortOption}`;
    localStorage.setItem(pageKey, page.toString());
  };

  return (
    <nav className="flex justify-center mt-3 absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <div className="w-[500px] flex justify-center gap-1">
        <Pagination
          total={totalPage}
          page={currentPage}
          onChange={handlePage}
          showControls
          className="flex gap-1" />
      </div>
    </nav>
  );
};

export default NavigationNumberMain;