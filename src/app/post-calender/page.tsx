"use client";

import { useState } from "react";
import PostCalender from "../components/PostCalender";
import PostLocation from "../components/PostLocation";

export default function PostCalenderPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-[1300px] sm:my-12 p-1 sm:p-2">
      <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto mt-24 p-3 text-gray-900">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
            일정 추가하기
          </h1>
          <p className="text-xs sm:text-medium ml-1 text-gray-400">
            <span className="text-[#3D6592]">플래너</span>를 이용해 더욱
            편리하게 여행 일정을 관리해보세요.
          </p>
          {step === 0 && <PostCalender setStep={setStep} />}
          {step === 1 && <PostLocation setStep={setStep} />}
        </div>
      </div>
    </div>
  );
}
