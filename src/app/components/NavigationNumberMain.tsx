'use client';

import { NavigationNumberMainProps } from "@/types/navigation";
import { Pagination } from "@nextui-org/react";
import { useEffect } from "react";

const NavigationNumberMain = ({ currentPage, setCurrentPage, totalPage }: NavigationNumberMainProps) => {

  useEffect(() => { 
    const validPage = Math.max(1, currentPage);
    if (validPage <= totalPage) {
      setCurrentPage(validPage);
    } else {
      setCurrentPage(1);
    }
  }, [currentPage, setCurrentPage, totalPage]);

  useEffect(() => {
    const validPage = Math.max(1, currentPage);
    if (validPage <= totalPage) {
      setCurrentPage(validPage);
    } else {
      setCurrentPage(1);
    }
  }, [currentPage, setCurrentPage, totalPage]);
  
  const handlePage = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
  };

  return (
    <nav className="flex absolute transform left-1/2 bottom-32 -translate-x-1/2 mt-3">
      <div className="flex justify-center w-[500px] gap-1">
        <Pagination
          total={totalPage}
          page={currentPage}
          onChange={handlePage}
          showControls
          className="flex gap-1"
          classNames={{
            cursor: 'bg-[#6EB4FB]',
          }}
        />
      </div>
    </nav>
  );
};

export default NavigationNumberMain;
