'use client';

import { Button, Calendar } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { FaCircleArrowDown } from "react-icons/fa6";
import { useState } from "react";
import type {DateValue} from "@react-types/calendar"
import {parseDate} from "@internationalized/date";
import { useRouter } from "next/navigation";

export default function Calender() {
  const router = useRouter();
  const [calValue, setCalValue] = useState<DateValue>(parseDate('2024-11-15'));

  const ChangeDate = () => {
    return calValue.year + "년 " + calValue.month + "월 " + calValue.day + "일";
  };

  const routePostCalender = () => router.push('/postCalender');

  return (
    <div className="min-h-[1300px] sm:my-12 p-1 sm:p-2">
      <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto mt-24 p-3 text-gray-900">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
            여행 일정 관리를 <span className="text-[#3D6592]">플래너</span>로!
          </h1>
          <p className="text-xs sm:text-medium ml-1 text-gray-400">
            <span className="text-[#3D6592]">플래너</span>를 이용해 더욱 편리하게 여행 일정을 관리해보세요.
          </p>
        </div>
        <Calendar 
          aria-label="Date (No Selection)" 
          className="mt-10 mx-auto" 
          showShadow={true} 
          value={calValue}
          onChange={setCalValue}
        />

        <Button color="primary" onClick={routePostCalender}>
            <div className="flex items-center">
              일정추가
              <IoIosAdd className="text-2xl font-semibold" />
            </div>
          </Button>

        <div className="w-full space-y-5 mt-10">
          <h1 className="text-2xl font-semibold text-blue-500 mb-3">{ChangeDate()}</h1>

          <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
            <h2 className="font-semibold text-lg">경북궁</h2>
            <p className="text-gray-700">서울 종로구 사직로 161 경복궁</p>
            <p className="text-sm text-gray-500">한복 빌려 입고 이쁜 사진 찍기!</p>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <FaCircleArrowDown className="text-3xl text-green-500" />
            <p className="text-orange-700">4분</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
            <h2 className="font-semibold text-lg">애즈라이크 서촌</h2>
            <p className="text-gray-700">서울 종로구 효자로 7길 23 1층 애즈라이크</p>
            <p className="text-sm text-gray-500">스테이크 샌드위치 추천 메뉴</p>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <FaCircleArrowDown className="text-3xl text-green-500" />
            <p className="text-orange-700">14분</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
            <h2 className="font-semibold text-lg">서울역</h2>
            <p className="text-gray-700">서울 용산구 한강대로 405</p>
            <p className="text-sm text-gray-500">21시 6번 플랫폼</p>
          </div>
        </div>
      </div>
    </div>
  );
};