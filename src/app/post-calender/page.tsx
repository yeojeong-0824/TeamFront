"use client";

import { useState } from "react";
import PostCalender from "../components/PostCalender";
import PostLocation from "../components/PostLocation";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function PostCalenderPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  if (step === -1) {
    router.push("/calendar");
  }

  return (
    <div className="min-h-[1300px] sm:my-12 p-1 sm:p-2">
      <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto mt-24 p-3 text-gray-900">
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center text-xl sm:text-3xl text-gray-700 leading-10">
            <button
              className="mr-1 mt-0.5 text-gray-500 hover:text-gray-700"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <FaChevronLeft />
            </button>
            {step === 0 ? "플래너 추가하기" : "장소 추가하기"}
          </h1>
          <p className="text-xs sm:text-medium ml-1 text-gray-400">
            {step === 0
              ? "플래너를 추가해주세요! 플래너란 여행 일정의 날짜와 제목을 의미합니다."
              : "여행 장소를 추가해주세요! 장소란 여행 일정의 각 스케줄을 의미하고, 위치와 설명을 추가할 수 있습니다."}
          </p>
          {step === 0 && <PostCalender setStep={setStep} />}
          {step === 1 && <PostLocation setStep={setStep} />}
        </div>
      </div>
    </div>
  );
}
