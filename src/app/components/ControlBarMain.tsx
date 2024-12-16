"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ControlBarMainProps } from "@/types/controlbar";
import { Input } from "@nextui-org/react";
import { CiSearch, CiCalendarDate } from "react-icons/ci";
import { PiNotePencilThin } from "react-icons/pi";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
  keyword: string;
};

const ControlBarMain = ({
  sortOption,
  setSortOption,
  setCurrentPage,
}: ControlBarMainProps) => {
  const [sortOptionVisible, setSortOptionVisible] = useState<boolean>(false);
  const pointer = "cursor-pointer";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setSortOptionVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    if (!formData.keyword.trim()) {
      setValue("keyword", "");
      Swal.fire({
        icon: "error",
        title: "검색 실패",
        text: "검색어를 입력해주세요",
        showConfirmButton: false,
        timer: 800,
      });
      return;
    }
    setSortOption("latest");
    setCurrentPage(1);
    router.push(`/search/${formData.keyword}`);
  };

  const onInvalid = (error: any) => {
    Swal.fire({
      icon: "error",
      title: "검색 실패",
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

  const handleLoginCheck = (url: string) => {
    queryClient.invalidateQueries({ queryKey: ["accessCheck"] });
    const updatedLoginStatus = queryClient.getQueryData(["accessCheck"]);
    if (!updatedLoginStatus) {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요한 서비스입니다.",
        text: "로그인 후 이용해주세요.",
        showConfirmButton: false,
        timer: 800,
      });
      return;
    } else {
      router.push(url);
    }
  };

  const btnStyle =
    "flex items-center gap-1 p-1.5 px-2 text-xs text-white rounded-lg sm:p-2 sm:px-3 sm:text-sm";
  return (
    <div className="flex justify-between items-center mt-[30px] pb-8 border-b-1">
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => handleLoginCheck("/write")}
          className={`${btnStyle} bg-[#6EB4FB] hover:bg-blue-500`}
        >
          <PiNotePencilThin className="inline text-sm sm:text-xl" />
          작성하기
        </button>
        <button
          onClick={() => handleLoginCheck("/calendar")}
          className={`${btnStyle} bg-pink-400 hover:bg-pink-500`}
        >
          <CiCalendarDate className="inline text-sm sm:text-xl" />
          캘린더
        </button>
      </div>

      <form
        className="flex items-end gap-1"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <Input
          aria-label="검색"
          type="text"
          label="검색"
          variant="underlined"
          placeholder="게시글을 검색해보세요"
          required
          {...register("keyword", {
            required: "검색어를 입력해주세요",
            maxLength: {
              value: 15,
              message: "검색어는 15자 이하로 입력하세요",
            },
          })}
          onChange={(e) => setValue("keyword", e.target.value)}
          isClearable
          className="w-[165px] sm:w-full"
        />
        <button type="submit" className="h-[24px]">
          <CiSearch className="text-2xl text-gray-900" />
        </button>
      </form>

      <div>
        <button
          ref={buttonRef}
          className="p-1.5 sm:p-2 text-xs sm:text-sm border text-gray-900 rounded-lg"
          onClick={() => setSortOptionVisible((option) => !option)}
        >
          {sortOption === "latest"
            ? "최신순"
            : sortOption === "score"
            ? "별점순"
            : "댓글순"}
        </button>
        {sortOptionVisible && (
          <div
            ref={menuRef}
            className="flex flex-col absolute right-2 w-[60px] sm:w-[100px] gap-3 mt-1 p-2 sm:p-3 text-xs sm:text-sm bg-white border rounded-md shadow-sm"
          >
            {["latest", "score", "comment"].map((option) => (
              <p
                key={option}
                className={`${pointer} ${
                  sortOption === option && "text-blue-500"
                }text-gray-900 hover:text-blue-500`}
                onClick={() => handleSortOption(option)}
              >
                {option === "latest"
                  ? "최신순"
                  : option === "score"
                  ? "별점순"
                  : "댓글순"}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlBarMain;
