import { NavigationNumberMainProps } from "@/types/navigation";
import { Pagination } from "@nextui-org/react";
import { useEffect } from "react";

const NavigationNumberMain = ({ currentPage, setCurrentPage, totalPage }: NavigationNumberMainProps) => {
  useEffect(() => { // Add this block
    const validPage = Math.max(1, currentPage);
    if (validPage <= totalPage) {
      setCurrentPage(validPage);
    } else {
      setCurrentPage(totalPage);
    }
  }, [currentPage, setCurrentPage, totalPage]);

  useEffect(() => {
    const validPage = Math.max(1, currentPage);
    if (validPage <= totalPage) {
      setCurrentPage(validPage);
    } else {
      setCurrentPage(totalPage);
    }
  }, [currentPage, setCurrentPage, totalPage]);
  
  const handlePage = (page: number) => {
    if (page < 1 || page > totalPage) return;
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
