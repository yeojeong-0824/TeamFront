"use client";

import { Button, Calendar } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import type { DateValue } from "@react-types/calendar";
import { useRouter } from "next/navigation";
import { today, getLocalTimeZone } from "@internationalized/date";
import useGetUserPlanners from "@/hooks/calender/useGetUserPlanners";
import ModalCalendar from "../components/Modal/Modal";
import LoadingSpinner from "../components/Loading";
import getPlanner from "@/api/calender/getPlanner";
import { useQueries } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

interface Planner {
  id: number;
  locationCount: number;
  personnel: number;
  title: string;
  subTitle: string;
  location: Location[];
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
  time: {
    createTime: string;
    updateTime: string;
  };
}

interface DetailedPlanner extends Planner {
  location: Location[];
  time: {
    createTime: string;
    updateTime: string;
  };
}

export default function Calender() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [calValue, setCalValue] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const { data: planners, isLoading } = useGetUserPlanners();
  const [modalData, setModalData] = useState<Planner>();
  const [showModal, setShowModal] = useState(false);
  const cacheData = queryClient.getQueryData(["accessCheck"]);

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["accessCheck"] });
    if (!cacheData) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login-ui`);
    }
  }, [cacheData]);

  const plannerQueries = useQueries({
    queries: (planners?.content ?? []).map((planner: Planner) => ({
      queryKey: ["planner", planner.id],
      queryFn: () => getPlanner(planner.id.toString()),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isAllLoading =
    isLoading || plannerQueries.some((query) => query.isLoading);

  const filteredPlanners = useMemo(() => {
    if (!planners?.content || plannerQueries.some((query) => query.isLoading)) {
      return [];
    }

    const selectedMonth = calValue.month;

    return planners.content.filter((planner: Planner, index: number) => {
      const detailedPlanner = plannerQueries[index].data as DetailedPlanner;

      if (!detailedPlanner?.location) return false;

      return detailedPlanner.location.some((loc) => {
        const locationDate = new Date(loc.unixTime * 1000);
        return locationDate.getMonth() + 1 === selectedMonth;
      });
    });
  }, [calValue.month, planners?.content, plannerQueries]);

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
    if (!cacheData) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login-ui`);
      return;
    }
    setModalData(planner);
    setShowModal(true);
  };

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
        <LoadingSpinner isLoading={isAllLoading} size={15} mt={200} />
        <div className="space-y-5">
          {filteredPlanners.length !== 0 &&
            filteredPlanners.map((planner: Planner) => (
              <div
                key={planner.id}
                className="p-3 border-2 shadow-sm rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleShowModal(planner)}
              >
                <h1 className="text-xl font-semibold">{planner.title}</h1>
                <h2 className="text-lg">{planner.subTitle}</h2>
                <p className="text-green-500">{planner.personnel}명</p>
                <p className="text-sm text-gray-500">
                  <span className="text-blue-500 font-semibold">
                    {filteredPlanners.length}
                  </span>
                  개의 일정이 있습니다.
                </p>
              </div>
            ))}
          {!isAllLoading && filteredPlanners.length === 0 && (
            <p className="text-center font-semibold text-lg text-gray-500 mt-10">
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
