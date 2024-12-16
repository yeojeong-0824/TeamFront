"use client";

import { Button } from "@nextui-org/react";
import useGetPlanner from "@/hooks/calender/useGetPlanner";
import useDeletePlanner from "@/hooks/calender/useDeletePlanner";
import { useQueryClient } from "@tanstack/react-query";

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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg">
        <div className="space-y-2 mb-3">
          <h1 className="text-xl font-semibold text-gray-800">
            {modalData?.title}
          </h1>
          <h2 className="text-lg text-gray-500">{modalData?.subTitle}</h2>
          <p>{modalData?.personnel}명</p>
        </div>

        <div className="space-y-5">
          {data?.locationInfo.map((location: LocationInfo) => (
            <div key={location.id} className="bg-gray-100 rounded-md p-2">
              <h1>{location.place}</h1>
              <h2>{location.address}</h2>
              <p>{location.memo}</p>
              <p>{location.travelTime}분</p>
            </div>
          ))}
        </div>
        {data?.locationInfo.length === 0 && (
          <div>
            <p className="text-gray-500 text-sm m-10">
              해당 플래너에 일정이 아직 등록되지 않았습니다.
            </p>
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <Button color="primary">일정 추가</Button>
          <Button
            onClick={handleDeletePlanner}
            isLoading={deletePlannerIsPending}
            color="danger"
          >
            플래너 삭제
          </Button>
          <Button onClick={() => setShowModal(false)} color="success">
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}