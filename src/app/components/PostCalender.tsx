"use client";

import { Button, Input } from "@nextui-org/react";
import { RangeCalendar } from "@nextui-org/calendar";
import { useState } from "react";
import type { RangeValue } from "@react-types/shared";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "@react-types/calendar";

interface Date {
  year: number;
  month: number;
  day: number;
}

interface RangeCalendar {
  start: Date;
  end: Date;
}

interface PostCalenderProps {
  setStep: (step: number) => void;
}

export default function PostCalender({ setStep }: PostCalenderProps) {
  const [rangeCalValue, setRangeCalValue] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const date = (date: Date) => {
    return date.year + "년 " + date.month + "월 " + date.day + "일";
  };

  return (
    <div className="flex flex-col justify-center">
      <RangeCalendar
        aria-label="Date (No Selection)"
        className="mt-10 mx-auto"
        showShadow={true}
        value={rangeCalValue}
        onChange={setRangeCalValue}
      />

      <div className="w-full space-y-5 mt-10">
        <div className="flex justify-between">
          <h1 className="text-xl sm:text-3xl font-semibold text-blue-500 mb-3">
            {date(rangeCalValue.start)} ~{" "}
            <span className="text-orange-300">{date(rangeCalValue.end)}</span>
          </h1>
        </div>
        <Input
          variant="bordered"
          placeholder="일정의 제목을 입력해주세요"
          label="제목"
          className="font-semibold"
          size="lg"
        />
        <Button className="w-full" color="primary" onClick={() => setStep(1)}>
          플래너 추가
        </Button>
      </div>
    </div>
  );
}
