"use client";

import { NavigationNumberMainProps } from "@/types/navigation";
import { Pagination } from "@nextui-org/react";
import { useEffect } from "react";

const NavigationNumberMain = ({
  currentPage,
  setCurrentPage,
  totalPage,
}: NavigationNumberMainProps) => {
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
    <div className="mt-3 flex justify-center">
      <Pagination
        total={totalPage}
        page={currentPage}
        onChange={handlePage}
        showControls
        size="sm"
        classNames={{
          cursor: "bg-[#6EB4FB]",
        }}
      />
    </div>
  );
};

export default NavigationNumberMain;
