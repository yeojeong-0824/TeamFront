"use client";

import { Button, Calendar } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { FaCircleArrowDown } from "react-icons/fa6";
import { useState } from "react";
import type { DateValue } from "@react-types/calendar";
import { useRouter } from "next/navigation";
import { today, getLocalTimeZone } from "@internationalized/date";
import useGetUserPlanners from "@/hooks/calender/useGetUserPlanners";
import ModalCalendar from "../components/ModalCalendar";
import LoadingSpinner from "../components/Loading";

interface Planner {
  id: number;
  locationCount: number;
  personnel: number;
  title: string;
  subTitle: string;
}

export default function Calender() {
  const router = useRouter();
  const [calValue, setCalValue] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const { data: planners, isLoading } = useGetUserPlanners();
  const [modalData, setModalData] = useState<Planner>();
  const [showModal, setShowModal] = useState(false);

  const ChangeDate = () => {
    return calValue.year + "년 " + calValue.month + "월 " + calValue.day + "일";
  };

  // function dateToUnix(dateString: string) {
  //   const date = new Date(dateString);
  //   return Math.floor(date.getTime() / 1000);
  // }

  // const date = dateToUnix(
  //   calValue.year + "-" + calValue.month + "-" + calValue.day
  // );
  // console.log(
  //   new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul" }).format(
  //     date * 1000
  //   )
  // );

  const routePostCalender = () => router.push("/post-calender");

  return (
    <div className="min-h-[1300px] sm:my-12 p-1 sm:p-2">
      <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto mt-24 p-3 text-gray-900">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
            여행 일정 관리를 <span className="text-[#3D6592]">플래너</span>
            로!
          </h1>
          <p className="text-xs sm:text-medium ml-1 text-gray-400">
            <span className="text-[#3D6592]">플래너</span>를 이용해 더욱
            편리하게 여행 일정을 관리해보세요.
          </p>
        </div>
        <h1 className="text-2xl font-semibold text-blue-500 my-3">
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
            플래너 추가
            <IoIosAdd className="text-2xl font-semibold" />
          </div>
        </Button>
        <LoadingSpinner isLoading={isLoading} size={15} mt={200} />
        <div className="space-y-5">
          {planners?.content.map((planner: Planner) => (
            <div
              key={planner.id}
              className="p-3 border-2 shadow-sm rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setModalData(planner);
                setShowModal(true);
              }}
            >
              <h1 className="text-xl font-semibold">{planner.title}</h1>
              <h2 className="text-lg">{planner.subTitle}</h2>
              <p className="text-green-500">{planner.personnel}명</p>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <ModalCalendar modalData={modalData} setShowModal={setShowModal} />
      )}
    </div>
  );
}
