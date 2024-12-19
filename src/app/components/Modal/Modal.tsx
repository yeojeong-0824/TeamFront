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
import formatStartTime from "@/util/formatStartTime";
import { FaCircleArrowDown } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdChevronLeft } from "react-icons/md";
import LoadingSpinner from "../Loading";
import { useState } from "react";
import EditPlanner from "./EditPlanner";

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

export default function Modal({ modalData, setShowModal }: ModalCalendarProps) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetPlanner(
    modalData ? modalData.id.toString() : ""
  );
  const { mutate: deletePlanner, isPending: deletePlannerIsPending } =
    useDeletePlanner();
  const [modalState, setModalState] = useState(0);

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
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg w-[370px] sm:w-[700px] max-h-[650px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {modalState === 0 && (
          <>
            <div className="space-y-2 mb-3">
              <h1 className="text-xl font-semibold text-gray-800">
                {data?.title}
              </h1>
              <h2 className="text-lg text-gray-500">{data?.subTitle}</h2>
              <p className="text-green-500">{data?.personnel}명</p>
            </div>
            <LoadingSpinner isLoading={isLoading} size={15} />
            <div className="space-y-5">
              {data?.locationInfo.map(
                (location: LocationInfo, index: number) => {
                  const dateTime = fromUnixTime(location.unixTime);

                  return (
                    <div key={location.id}>
                      <div className="flex gap-2 justify-center items-center mb-4">
                        <FaCircleArrowDown className="text-3xl text-green-500" />
                        <p className="text-orange-700">
                          {formatTravelTime(location.travelTime)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
                        <h2 className="font-semibold text-lg text-gray-700">
                          {dateTime.year}년 {dateTime.month}월 {dateTime.day}일
                        </h2>
                        <p className="text-gray-700">
                          {formatStartTime(dateTime.hour, dateTime.minute)}부터
                        </p>
                        <p className="text-sm text-gray-500">
                          {location.place}
                        </p>
                        <p className="text-sm text-gray-500">
                          {location.address}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            {data?.locationInfo.length === 0 && (
              <div>
                <p className="text-gray-500 text-sm m-10 text-center">
                  해당 플래너에 일정이 아직 등록되지 않았습니다.
                </p>
              </div>
            )}
            {!isLoading && (
              <div className="flex justify-end gap-2 mt-3">
                <Button color="primary" size="sm">
                  <div className="flex items-center">
                    일정 추가
                    <IoIosAdd className="text-xl font-semibold" />
                  </div>
                </Button>
                <Button
                  variant="solid"
                  size="sm"
                  onClick={() => setModalState(1)}
                >
                  <div className="flex items-center">
                    플래너 수정
                    <CiEdit className="text-lg font-semibold" />
                  </div>
                </Button>
                <Button
                  onClick={handleDeletePlanner}
                  isLoading={deletePlannerIsPending}
                  variant="bordered"
                  size="sm"
                >
                  <div className="flex items-center gap-1">
                    플래너 삭제
                    <FiMinus className="text-[16px] font-semibold" />
                  </div>
                </Button>
              </div>
            )}
          </>
        )}
        {modalState === 1 && (
          <EditPlanner setModalState={setModalState} plannerData={data} />
        )}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {modalState !== 0 && (
            <button onClick={() => setModalState((prev) => prev - 1)}>
              <MdChevronLeft className="text-3xl" />
            </button>
          )}
          <button onClick={() => setShowModal(false)}>
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
