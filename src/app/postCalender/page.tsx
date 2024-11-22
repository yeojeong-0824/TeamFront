'use client';

import { Button, DateRangePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { RangeCalendar } from "@nextui-org/calendar";
import { useState } from "react";
import type { RangeValue } from "@react-types/shared";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "@react-types/calendar"
import { FaCircleArrowDown } from "react-icons/fa6";
import { TimeInput } from "@nextui-org/date-input";
import { Time } from "@internationalized/date";

interface Date {
  year: number;
  month: number;
  day: number;
}

interface RangeCalendar {
  start: Date;
  end: Date;
}

export default function PostCalender() {
  const [rangeCalValue, setRangeCalValue] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const getDatesInRange = (start: DateValue, end: DateValue) => {
    const dates = [];
    let currentDate = start;
    while (currentDate.compare(end) <= 0) {
      dates.push(currentDate.day);
      currentDate = currentDate.add({ days: 1 });
    }
    return dates;
  };

  const datesInRange = getDatesInRange(rangeCalValue.start, rangeCalValue.end);

  const date = (date: Date) => {
    return date.year + "년 " + date.month + "월 " + date.day + "일";
  };

  return (
    <div className="min-h-[1300px] sm:my-12 p-1 sm:p-2">
      <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto mt-24 p-3 text-gray-900">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
            일정 추가하기
          </h1>
          <p className="text-xs sm:text-medium ml-1 text-gray-400">
            <span className="text-[#3D6592]">플래너</span>를 이용해 더욱 편리하게 여행 일정을 관리해보세요.
          </p>
        </div>
        <RangeCalendar
          aria-label="Date (No Selection)"
          className="mt-10 mx-auto"
          showShadow={true}
          value={rangeCalValue}
          onChange={setRangeCalValue}
        />
        <DateRangePicker
          className="mx-auto"
          aria-label="Date Range"
          value={rangeCalValue}
          onChange={setRangeCalValue}
        />

        <div className="w-full space-y-5 mt-10">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-blue-500 mb-3">
              {date(rangeCalValue.start)} ~ <span className="text-orange-300">{date(rangeCalValue.end)}</span>
            </h1>
          </div>
          <Input
            variant="bordered"
            placeholder="일정의 제목을 입력해주세요"
            label="제목"
            className="font-semibold"
            size="lg"
          />

          <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md mt-10">
            <Select label="날짜를 선택" placeholder="해당 일정에 맞는 날짜를 선택하세요">
              {datesInRange.map((date) => (
                <SelectItem key={date}>
                  {date}
                </SelectItem>
              ))}
            </Select>
            <div className="flex gap-3">
              <TimeInput
                label="일정 시작 시간을 선택"
                className="font-semibold"
              />
              <TimeInput
                label="일정 종료 시간을 선택"
                className="font-semibold"
              />
            </div>
            <Input
              variant="underlined"
              placeholder="일정의 위치를 입력해주세요"
              label="위치"
              className="font-semibold"
            />
            <Input
              variant="underlined"
              placeholder="일정의 설명을 입력해주세요"
              label="설명"
              className="font-semibold"
            />
            <div className="flex justify-end">
              <Button variant="flat" color="success">추가</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};  