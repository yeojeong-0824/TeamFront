"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import useGetUserPlanners from "@/hooks/calender/useGetUserPlanners";

interface PostModalProps {
  setShowModal: (value: boolean) => void;
  setPlannerId: (value: string) => void;
}

interface Planner {
  id: number;
  locationCount: number;
  personnel: number;
  title: string;
  subTitle: string;
}

export default function PostModal({
  setShowModal,
  setPlannerId,
}: PostModalProps) {
  const { data: planners } = useGetUserPlanners();

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg w-[370px] sm:w-[700px] max-h-[625px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button onClick={() => setShowModal(false)}>
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>
        <div className="space-y-5 mt-5">
          <h1 className="flex items-center gap-1 text-2xl font-semibold mb-3">
            플래너 목록
          </h1>
          {planners?.content.map((planner: Planner) => (
            <div
              key={planner.id}
              className="p-3 border-2 shadow-sm rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setPlannerId(planner.id.toString());
                setShowModal(false);
              }}
            >
              <h1 className="text-xl font-semibold">{planner.title}</h1>
              <h2 className="text-lg">{planner.subTitle}</h2>
              <p className="text-green-500">{planner.personnel}명</p>
              {planner.locationCount !== 0 ? (
                <p className="text-sm text-gray-500">
                  <span className="text-blue-500 font-semibold">
                    {planner.locationCount}
                  </span>
                  개의 장소가 있습니다.
                </p>
              ) : (
                <p className="text-sm text-gray-500">등록된 장소가 없습니다.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
