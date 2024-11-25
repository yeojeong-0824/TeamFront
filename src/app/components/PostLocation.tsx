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

interface PostCalenderProps {
  setStep: (step: number) => void;
}

export default function PostLocation({ setStep }: PostCalenderProps) {
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

  return (
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
  );
}
