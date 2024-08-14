'use client';

import { NavigationNumberMainProps } from "@/types/navigation";
import { useEffect } from "react";

const NavigationNumberMain = ({ currentPage, setCurrentPage, totalPage, searchMode }: NavigationNumberMainProps) => {
  const handlePage = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);

    if(searchMode) {
      localStorage.setItem("SearchCurrentPage", page.toString());
      return;
    };
    localStorage.setItem("currentPage", page.toString());
  };

  useEffect(() => {
    const savedPage = searchMode ? localStorage.getItem("SearchCurrentPage") : localStorage.getItem("currentPage");
    if (savedPage) setCurrentPage(+savedPage)
  }, [setCurrentPage]);

  const btn_style = `p-1 rounded-sm w-[25px]`;

  const createPageBtn = () => {
    const btns = [];
    for (let i = 1; i <= totalPage; i++) {
      btns.push(
        <button
          key={i}
          className={btn_style + (currentPage === i ? " bg-blue-500 text-white" : " bg-white text-blue-500")}
          onClick={() => handlePage(i)}
        >
          {i}
        </button>
      );
    }
    return btns;
  };

  console.log(currentPage, totalPage);

  return (
    <nav className="flex justify-center mt-3 absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <div className="w-[500px] flex justify-center gap-1">
        <button
          onClick={() => handlePage(currentPage - 1)}
          className={currentPage !== 1 ? undefined : 'opacity-0'}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {createPageBtn()}
        <button
          onClick={() => handlePage(currentPage + 1)}
          className={currentPage === totalPage || totalPage === 0 ? 'opacity-0' : undefined}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default NavigationNumberMain;