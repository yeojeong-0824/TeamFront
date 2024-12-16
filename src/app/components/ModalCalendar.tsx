"use client";

import { Button } from "@nextui-org/react";
import useGetPlanner from "@/hooks/calender/useGetPlanner";
import useDeletePlanner from "@/hooks/calender/useDeletePlanner";
import { useQueryClient } from "@tanstack/react-query";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import fromUnixTime from "@/util/fromUnixTime";
import formatTravelTime from "@/util/formatTravelTime";

interface Planner {
  id: number;
  locationCount: number;
  personnel: number;
  title: string;
  subTitle: string;
}

interface LocationInfo {
  address: string;
  id: number;
  memo: string;
  place: string;
  plannerId: number;
  travelTime: number;
  unixTime: number;
}

interface ModalCalendarProps {
  modalData: Planner | undefined;
  setShowModal: (value: boolean) => void;
}

export default function ModalCalendar({
  modalData,
  setShowModal,
}: ModalCalendarProps) {
  const queryClient = useQueryClient();
  const { data } = useGetPlanner(modalData ? modalData.id.toString() : "");
  const { mutate: deletePlanner, isPending: deletePlannerIsPending } =
    useDeletePlanner();

  const handleDeletePlanner = () => {
    deletePlanner(modalData ? modalData.id.toString() : "", {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userPlanners"] });
        setShowModal(false);
      },
    });
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
      onClick={(e) => setShowModal(false)}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg w-[370px] sm:w-[700px] md:w-[1000px] min-h-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2 mb-3">
          <h1 className="text-xl font-semibold text-gray-800">
            {modalData?.title}
          </h1>
          <h2 className="text-lg text-gray-500">{modalData?.subTitle}</h2>
          <p className="text-green-500">{modalData?.personnel}명</p>
        </div>

        <div className="space-y-5">
          {data?.locationInfo.map((location: LocationInfo) => {
            const dateTime = fromUnixTime(location.unixTime);

            return (
              <div key={location.id} className="bg-gray-100 rounded-md p-2">
                <h1 className="font-semibold text-lg text-gray-700">
                  {dateTime.year}년 {dateTime.month}월 {dateTime.day}일
                </h1>
                <h2>{location.place}</h2>
                <h3>{location.address}</h3>
                <p>{location.memo}</p>
                <p>{formatTravelTime(location.travelTime)}</p>
              </div>
            );
          })}
        </div>
        {data?.locationInfo.length === 0 && (
          <div>
            <p className="text-gray-500 text-sm m-10">
              해당 플래너에 일정이 아직 등록되지 않았습니다.
            </p>
          </div>
        )}
        <div className="flex justify-end gap-2 mt-3">
          <Button color="primary" size="sm">
            <div className="flex items-center">
              일정 추가
              <IoIosAdd className="text-xl font-semibold" />
            </div>
          </Button>
          <Button
            onClick={handleDeletePlanner}
            isLoading={deletePlannerIsPending}
            variant="bordered"
            size="sm"
          >
            <div className="flex items-center gap-1">
              삭제
              <FiMinus className="text-[16px] font-semibold" />
            </div>
          </Button>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3"
        >
          <IoCloseOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
