"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { useState } from "react";
import type { TimeValue } from "@react-types/datepicker";
import {
  parseAbsoluteToLocal,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
import type { TimeInputValue } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import { FaCircleArrowDown } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface PostCalenderProps {
  setStep: (step: number) => void;
}

export default function PostLocation({ setStep }: PostCalenderProps) {
  const router = useRouter();
  const [timeStartValue, setTimeStartValue] = useState<TimeInputValue>(
    parseAbsoluteToLocal("2024-04-08T12:00:22Z")
  );
  const [timeEndValue, setTimeEndValue] = useState<TimeInputValue>(
    parseAbsoluteToLocal("2024-04-08T18:45:22Z")
  );

  // const getDatesInRange = (start: DateValue, end: DateValue) => {
  //   const dates = [];
  //   let currentDate = start;
  //   while (currentDate.compare(end) <= 0) {
  //     dates.push({
  //       year: currentDate.year,
  //       month: currentDate.month,
  //       day: currentDate.day,
  //     });
  //     currentDate = currentDate.add({ days: 1 });
  //   }
  //   return dates;
  // };

  // const datesInRange = getDatesInRange(rangeCalValue.start, rangeCalValue.end);
  const datesInRange = [
    { year: 2024, month: 4, day: 8 },
    { year: 2024, month: 4, day: 9 },
    { year: 2024, month: 4, day: 10 },
  ];

  const inputFields = [
    { placeholder: "일정의 위치를 입력해주세요", label: "위치" },
    { placeholder: "상세 주소를 입력해주세요", label: "상세 주소" },
    { placeholder: "일정의 설명을 입력해주세요", label: "설명" },
  ];

  const routeCalender = () => router.push("/calendar");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-blue-500 my-3">
        2024년 11월 26일 ~ 2024년 12월 3일
      </h1>
      <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md mt-10">
        <Select
          label="날짜를 선택"
          placeholder="해당 일정에 맞는 날짜를 선택하세요"
        >
          {datesInRange.map((date) => (
            <SelectItem key={date.day}>
              {date.year}년 {date.month}월 {date.day}일
            </SelectItem>
          ))}
        </Select>
        <div className="flex gap-3">
          <TimeInput
            label="일정 시작 시간을 선택"
            className="font-semibold"
            value={timeStartValue}
            onChange={setTimeStartValue}
          />
          <TimeInput
            label="일정 종료 시간을 선택"
            className="font-semibold"
            value={timeEndValue}
            onChange={setTimeEndValue}
          />
        </div>
        {inputFields.map((field, index) => (
          <Input
            key={index}
            variant="underlined"
            placeholder={field.placeholder}
            label={field.label}
            className="font-semibold"
          />
        ))}
        <div className="flex justify-end">
          <Button variant="flat" color="success">
            장소 추가하기
          </Button>
        </div>
      </div>

      <div className="w-full space-y-5 mt-10">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          연말 서울 여행
        </h1>

        <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
          <h2 className="font-semibold text-lg">경북궁</h2>
          <p className="text-gray-700">서울 종로구 사직로 161 경복궁</p>
          <p className="text-sm text-gray-500">
            한복 빌려 입고 이쁜 사진 찍기!
          </p>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <FaCircleArrowDown className="text-3xl text-green-500" />
          <p className="text-orange-700">4분</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
          <h2 className="font-semibold text-lg">애즈라이크 서촌</h2>
          <p className="text-gray-700">
            서울 종로구 효자로 7길 23 1층 애즈라이크
          </p>
          <p className="text-sm text-gray-500">스테이크 샌드위치 추천 메뉴</p>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <FaCircleArrowDown className="text-3xl text-green-500" />
          <p className="text-orange-700">14분</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
          <h2 className="font-semibold text-lg">서울역</h2>
          <p className="text-gray-700">서울 용산구 한강대로 405</p>
          <p className="text-sm text-gray-500">21시 6번 플랫폼</p>
        </div>
      </div>
      {/* 
      <div className="text-xl text-center text-gray-500 mt-40">
        <p>해당 플래너에 아직 장소가 등록되지 않았습니다.</p>
      </div> */}

      <Button className="w-full mt-3" color="primary" onClick={routeCalender}>
        작성 완료
      </Button>
    </div>
  );
}
