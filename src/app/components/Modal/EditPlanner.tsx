"use client";

import formatStartTime from "@/util/formatStartTime";
import formatTravelTime from "@/util/formatTravelTime";
import { Input, Button } from "@nextui-org/react";
import fromUnixTime from "@/util/fromUnixTime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleDown, FaAngleUp, FaCircleArrowDown } from "react-icons/fa6";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import useEditPlanner from "@/hooks/calender/useEditPlanner";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteLocation from "@/hooks/calender/useDeleteLocation";

interface LocationInfo {
  address: string;
  id: number;
  memo: string;
  place: string;
  plannerId: number;
  travelTime: number;
  unixTime: number;
}

interface Planner {
  id: number;
  locationCount: number;
  personnel: number;
  title: string;
  subTitle: string;
  locationInfo: LocationInfo[];
}

interface EditPlannerProps {
  setModalState: (value: number) => void;
  plannerData: Planner;
}

interface EditData {
  title: string;
  subTitle: string;
}

export default function EditPlanner({
  setModalState,
  plannerData,
}: EditPlannerProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm<EditData>();
  const [personnel, setPersonnel] = useState(plannerData.personnel);
  const [calendarView, setCalendarView] = useState(false);
  const { mutate: editPlanner, isPending: editPlannerIsPending } =
    useEditPlanner(plannerData.id);
  const { mutate: deleteLocation, isPending: deleteLocationIsPending } =
    useDeleteLocation();

  useEffect(() => {
    if (plannerData) {
      setValue("title", plannerData.title);
      setValue("subTitle", plannerData.subTitle);
    }
  }, [plannerData]);

  const onSubmit = (data: EditData) => {
    if (
      plannerData.title === data.title &&
      plannerData.subTitle === data.subTitle &&
      plannerData.personnel === personnel
    ) {
      Swal.fire({
        icon: "error",
        title: "수정 된 내용이 없습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    editPlanner(
      { ...data, personnel },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "플래너가 성공적으로 수정되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          });
          queryClient.invalidateQueries({
            queryKey: ["planner", plannerData.id.toString()],
          });
          queryClient.invalidateQueries({ queryKey: ["userPlanners"] });
          setModalState(0);
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "플래너 수정에 실패했습니다.",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      }
    );
  };

  const handleIncrease = () => {
    setPersonnel((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setPersonnel((prev) => Math.max(1, prev - 1));
  };

  const handleDeleteLocation = (id: number) => {
    deleteLocation(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["planner", plannerData.id.toString()],
        });
        queryClient.invalidateQueries({ queryKey: ["userPlanners"] });
      },
    });
  };

  return (
    <div>
      <h1 className="flex items-center gap-1 text-xl font-semibold">
        플래너/장소 수정
        <CiEdit className="text-2xl font-semibold" />
      </h1>
      <form
        className="w-full space-y-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          variant="bordered"
          placeholder="일정의 제목을 입력해주세요"
          label="제목"
          className="font-semibold"
          size="lg"
          required
          {...register("title")}
        />
        <Input
          variant="bordered"
          placeholder="일정의 부제목 혹은 간단한 설명을 입력해주세요"
          label="부제/설명"
          className="font-semibold"
          required
          {...register("subTitle")}
        />
        <div className="flex w-[150px]">
          <Input
            type="number"
            variant="bordered"
            label="인원수"
            className="font-semibold"
            required
            value={personnel.toString()}
            readOnly
          />
          <div className="text-lg">
            <button type="button" className="p-1" onClick={handleIncrease}>
              <FaAngleUp />
            </button>
            <button type="button" className="p-1" onClick={handleDecrease}>
              <FaAngleDown />
            </button>
          </div>
        </div>
        <Button
          className="w-full"
          color="primary"
          type="submit"
          isLoading={editPlannerIsPending}
        >
          플래너 수정하기
        </Button>
      </form>
      {plannerData?.locationInfo.length === 0 && (
        <div>
          <p className="text-gray-500 text-sm m-10 text-center">
            해당 플래너에 일정이 아직 등록되지 않았습니다.
          </p>
        </div>
      )}
      <div className="flex justify-between items-center mt-10">
        {plannerData?.locationInfo.length !== 0 && (
          <h1 className="text-xl font-semibold text-gray-800">
            현재 플래너에 저장된 장소
          </h1>
        )}
        {plannerData?.locationInfo.length !== 0 && (
          <button onClick={() => setCalendarView((prev) => !prev)}>
            {calendarView ? (
              <FaAngleDoubleUp className="text-2xl text-gray-500 hover:text-gray-900" />
            ) : (
              <FaAngleDoubleDown className="text-2xl text-gray-500 hover:text-gray-900" />
            )}
          </button>
        )}
      </div>
      {calendarView && (
        <div className="space-y-5 mt-5">
          {plannerData?.locationInfo.map(
            (location: LocationInfo, index: number) => {
              const dateTime = fromUnixTime(location?.unixTime);
              console.log(location);
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
                    <p className="text-sm text-gray-500">{location.place}</p>
                    <p className="text-sm text-gray-500">{location.address}</p>
                    <div className="flex justify-end gap-2">
                      {/* 장소 수정 */}
                      <Button size="sm">
                        <CiEdit className="text-xl" />
                      </Button>
                      {/* 장소 삭제 */}
                      <Button
                        size="sm"
                        onClick={() => handleDeleteLocation(location.id)}
                        isLoading={deleteLocationIsPending}
                      >
                        <CiTrash className="text-xl" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
