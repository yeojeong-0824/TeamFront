"use client";

import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import type { DateValue } from "@react-types/calendar";
import { Calendar } from "@nextui-org/react";
import LoadingSpinner from "./Loading";
import useFilterPlanner from "@/hooks/useFilterPlanner";

interface PostModalProps {
  setShowModal: (value: boolean) => void;
  setPlannerId: (value: string) => void;
}

interface Time {
  createTime: string;
  updateTime: string;
}

interface Location {
  id: number;
  unixTime: number;
  travelTime: number;
  transportation: string;
  transportationNote: string;
  place: string;
  address: string;
  phoneNumber: string;
  memo: string;
  plannerId: number;
  time: Time;
}

interface Planner {
  id: number;
  title: string;
  personnel: number;
  subTitle: string;
  locationCount: number;
  location: Location[];
  time: Time;
}

interface FilterPlanner {
  planner: Planner;
}

export default function PostModal({
  setShowModal,
  setPlannerId,
}: PostModalProps) {
  const router = useRouter();
  const [calValue, setCalValue] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const startOfMonth = new Date(calValue.year, calValue.month - 1, 1);
  const endOfMonth = new Date(calValue.year, calValue.month, 0);
  const startUnixTime = Math.floor(startOfMonth.getTime() / 1000);
  const endUnixTime = Math.floor(endOfMonth.getTime() / 1000);

  const { data: filterData, isLoading } = useFilterPlanner(
    startUnixTime,
    endUnixTime
  );

  const ChangeDate = () => {
    return calValue.year + "년 " + calValue.month + "월 " + "플랜 목록";
  };

  const handleRouteCalendar = () => router.push("/calendar");

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg w-[370px] sm:w-[700px] max-h-[625px] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button onClick={() => setShowModal(false)}>
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>
        <div className="space-y-5 mt-5">
          <h1 className="flex items-center gap-1 text-2xl font-semibold mb-3">
            플랜 찾기
          </h1>
          <p className="text-gray-400 text-xs sm:text-medium ml-1">
            선택한 날짜가 포함된 달의 플랜을 표시합니다.
            <br />
            상세 일정은 플랜을 클릭하여 확인하세요.
          </p>
          <h1 className="text-lg font-semibold text-gray-500 my-3 text-center">
            {ChangeDate()}
          </h1>
          <div className="flex justify-center">
            <Calendar
              aria-label="Date (No Selection)"
              showShadow={true}
              classNames={{
                base: "w-[225px] flex justify-center overflow-hidden",
                cell: "text-sm",
              }}
              value={calValue}
              onChange={setCalValue}
            />
          </div>
          <LoadingSpinner isLoading={isLoading} size={15} />
          <div className="space-y-5">
            {filterData?.length !== 0 &&
              filterData?.map((planner: FilterPlanner) => (
                <div
                  key={planner?.planner?.id}
                  className="p-3 border-2 shadow-sm rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setPlannerId(planner?.planner?.id.toString());
                    setShowModal(false);
                  }}
                >
                  <h1 className="text-xl font-semibold">
                    {planner?.planner?.title}
                  </h1>
                  <h2 className="text-lg">{planner?.planner?.subTitle}</h2>
                  <p className="text-green-500">
                    {planner?.planner?.personnel}명
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-500 font-semibold">
                      {planner?.planner?.location?.length}
                    </span>
                    개의 일정이 있습니다.
                  </p>
                </div>
              ))}
            {!isLoading && filterData.length === 0 && (
              <p className="text-center font-semibold text-lg text-gray-500 mt-10">
                선택한 달에 등록된 일정이 없습니다.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-5 sticky bottom-0">
          <button
            className="p-1 px-3 sm:p-2 sm:px-6 border text-gray-900 hover:bg-gray-200 rounded-lg text-sm sm:text-base bg-gray-100"
            type="button"
            onClick={handleRouteCalendar}
          >
            캘린더 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
