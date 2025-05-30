"use client";

import { Button, Calendar } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import type { DateValue } from "@react-types/calendar";
import { useRouter } from "next/navigation";
import { today, getLocalTimeZone } from "@internationalized/date";
import ModalCalendar from "../components/Modal/Modal";
import LoadingSpinner from "../components/Loading";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useFilterPlanner from "@/hooks/useFilterPlanner";
import useAccessCheck from "@/hooks/TokenHooks/useAccessCheck";

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

export default function CalenderPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [calValue, setCalValue] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const [modalData, setModalData] = useState<Planner>();
  const [showModal, setShowModal] = useState(false);
  const { data: cacheData, isLoading: accessCheckIsLoading } = useAccessCheck();
  const startOfMonth = new Date(calValue.year, calValue.month - 1, 1);
  const endOfMonth = new Date(calValue.year, calValue.month, 0);
  const startUnixTime = Math.floor(startOfMonth.getTime() / 1000);
  const endUnixTime = Math.floor(endOfMonth.getTime() / 1000);

  const { data: filterData, isLoading } = useFilterPlanner(
    startUnixTime,
    endUnixTime
  );

  useEffect(() => {
    // 모달 켜졌을 때 배경 스크롤 막기
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.touchAction = "auto";
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const ChangeDate = () => {
    return calValue.year + "년 " + calValue.month + "월 " + "플랜 목록";
  };

  const routePostCalender = () => router.push("/post-calender");

  const handleShowModal = (planner: Planner) => {
    if (!cacheData && !accessCheckIsLoading) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login`);
      return;
    }
    setModalData(planner);
    setShowModal(true);
  };

  return (
    <div className="min-h-[calc(100vh-304px)] sm:min-h-[calc(100vh-294px)] mt-[63.48px] sm:mt-[90.9px] p-1 sm:p-2">
      <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto p-3 text-gray-900">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
            여행 일정 관리를 <span className="text-[#3D6592]">플래너</span>
            로!
          </h1>
          <p className="text-xs sm:text-medium ml-1 text-gray-400">
            <span className="text-[#3D6592]">플래너</span>를 이용해 더욱
            편리하게 여행 일정을 관리해보세요.
          </p>
          <p className="text-gray-400 text-xs sm:text-medium ml-1">
            선택한 날짜가 포함된 달의 플랜을 표시합니다.
          </p>
        </div>
        <h1 className="text-2xl font-semibold text-gray-500 my-3 text-center">
          {ChangeDate()}
        </h1>
        <Calendar
          aria-label="Date (No Selection)"
          className="mx-auto"
          showShadow={true}
          value={calValue}
          onChange={setCalValue}
        />
        <Button color="primary" onClick={routePostCalender}>
          <div className="flex items-center">
            플랜 추가
            <IoIosAdd className="text-2xl font-semibold" />
          </div>
        </Button>
        <LoadingSpinner isLoading={isLoading} size={15} />
        <div className="space-y-5">
          {filterData?.length !== 0 &&
            filterData?.map((planner: FilterPlanner) => (
              <div
                key={planner?.planner?.id}
                className="p-3 border-2 shadow-sm rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleShowModal(planner.planner)}
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
          {!isLoading && filterData?.length === 0 && (
            <p className="text-center font-semibold text-lg text-gray-500 mt-10 min-h-[200px]">
              선택한 달에 등록된 일정이 없습니다.
            </p>
          )}
        </div>
      </div>
      {showModal && (
        <ModalCalendar modalData={modalData} setShowModal={setShowModal} />
      )}
    </div>
  );
}
