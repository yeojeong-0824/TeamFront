"use client";

import { useEffect, useState } from "react";
import PostCalender from "../components/PostCalender";
import PostLocation from "../components/PostLocation";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useConfirmPageLeave from "@/util/useConfirmPageLeave";
import Swal from "sweetalert2";
import useAccessCheck from "@/hooks/TokenHooks/useAccessCheck";

export default function PostCalenderPage() {
  const [step, setStep] = useState(0);
  const [plannerId, setPlannerId] = useState("");
  const router = useRouter();
  const { data: accessCheck, isLoading, refetch } = useAccessCheck();

  useEffect(() => {
    refetch();
    if (!accessCheck && !isLoading) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
    }
  }, []);

  useConfirmPageLeave();

  if (step === -1) router.push("/calendar");

  return (
    <div className="min-h-[calc(100vh-304px)] sm:min-h-[calc(100vh-294px)] mt-[63.48px] sm:mt-[90.9px] p-1 sm:p-2">
      <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto p-3 text-gray-900">
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center text-xl sm:text-3xl text-gray-700 leading-10">
            <button
              className="mr-1 mt-0.5 text-gray-500 hover:text-gray-700"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <FaChevronLeft />
            </button>
            {step === 0 ? "플랜 추가하기" : "일정 추가하기"}
          </h1>
          <p className="text-xs sm:text-medium ml-1 text-gray-400">
            {step === 0
              ? "플랜을 추가해주세요! 여행 일정을 추가하고, 일정을 관리해보세요."
              : "여행 일정을 추가해주세요! 일정이란 플랜의 각 세부 스케줄을 의미하고, 위치와 설명을 추가할 수 있습니다."}
          </p>
          {step === 0 && (
            <PostCalender setStep={setStep} setPlannerId={setPlannerId} />
          )}
          {step === 1 && <PostLocation plannerId={plannerId} />}
        </div>
      </div>
    </div>
  );
}
