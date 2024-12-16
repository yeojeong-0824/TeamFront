"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  TimeInput,
  Calendar,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { Time } from "@internationalized/date";
import type { TimeInputValue } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import useGetPlanner from "@/hooks/calender/useGetPlanner";
import type { DateValue } from "@react-types/calendar";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { useForm } from "react-hook-form";
import usePostLocation from "@/hooks/calender/usePostLocation";
import { useQueryClient } from "@tanstack/react-query";
import LocationItems from "./locationItems";
import toUnixTime from "@/util/toUnixTime";

interface PostCalenderProps {
  plannerId: string;
}

interface FormData {
  transportationNote: string;
  place: string;
  address: string;
  phoneNumber: string;
  memo: string;
}

interface LocationInfo {
  id: number;
  travelTime: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  place: string;
  address: string;
  memo: string;
}

export default function PostLocation({ plannerId }: PostCalenderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [calValue, setCalValue] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const [timeStartValue, setTimeStartValue] = useState<TimeInputValue>(
    new Time(9, 0)
  );
  const [calendarView, setCalendarView] = useState(true);
  const { data } = useGetPlanner(plannerId);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [selectedTransportation, setSelectedTransportation] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const { mutate } = usePostLocation(plannerId);

  const inputFields = [
    {
      placeholder: "예시) 2호선 홍대입구역 3번 출구 10시 30분 출발 예정",
      label: "교통수단 메모",
      name: "transportationNote",
    },
    { placeholder: "일정의 위치를 입력해주세요", label: "위치", name: "place" },
    {
      placeholder: "상세 주소를 입력해주세요",
      label: "상세 주소",
      name: "address",
    },
    {
      placeholder: "연락처를 입력해주세요",
      label: "연락처",
      name: "phoneNumber",
    },
  ];

  const transportations = [
    "지하철",
    "버스",
    "택시",
    "도보",
    "기차",
    "비행기",
    "자차",
    "배",
  ];

  const highlightedDates: DateValue[] = data?.locationInfo.map(
    (location: LocationInfo) =>
      new CalendarDate(location.year, location.month, location.day)
  );

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setHours(value);
    updateTotalMinutes(value, minutes);
  };

  // 분 입력 핸들러
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setMinutes(value);
    updateTotalMinutes(hours, value);
  };

  // 총 분 상태 업데이트
  const updateTotalMinutes = (hours: number, minutes: number) => {
    setTotalMinutes(hours * 60 + minutes);
  };

  const routeCalender = () => router.push("/calendar");

  const onSubmit = (formData: FormData) => {
    const unixTime = toUnixTime({
      year: calValue.year,
      month: calValue.month,
      day: calValue.day,
      hour: timeStartValue.hour,
      minute: timeStartValue.minute,
    });

    const locationData = {
      unixTime,
      travelTime: totalMinutes,
      transportation: selectedTransportation,
      ...formData,
    };
    mutate(locationData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["planner", plannerId] });
        setCalValue(today(getLocalTimeZone()));
        setTimeStartValue(new Time(9, 0));
        setSelectedTransportation("");
        setHours(0);
        setMinutes(0);
        setTotalMinutes(0);
        reset();
      },
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-2xl font-semibold text-gray-800">
          {data?.title}
        </h1>
        <h2 className="text-xl text-gray-500">{data?.subTitle}</h2>
        <h3 className="text-green-500">{data?.personnel}명</h3>
      </div>
      <form
        className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-semibold text-blue-500 my-3 text-center">
          {calValue.year}년 {calValue.month}월 {calValue.day}일
        </h1>
        <div className="flex justify-center">
          <Calendar
            aria-label="Date Selection"
            value={calValue}
            onChange={setCalValue}
            minValue={today(getLocalTimeZone())}
            isDateUnavailable={(date) =>
              highlightedDates?.some(
                (highlightedDate) =>
                  date.year === highlightedDate.year &&
                  date.month === highlightedDate.month &&
                  date.day === highlightedDate.day
              )
            }
          />
        </div>
        <TimeInput
          label="일정 시작 시간을 선택"
          className="font-semibold"
          value={timeStartValue}
          onChange={setTimeStartValue}
        />
        <Select
          label="교통 수단"
          placeholder="교통 수단을 선택해주세요"
          className="font-semibold"
          selectedKeys={selectedTransportation ? [selectedTransportation] : []}
          onSelectionChange={(keys) =>
            setSelectedTransportation(Array.from(keys)[0] as string)
          }
        >
          {transportations.map((transportation: string) => (
            <SelectItem key={transportation} value={transportation}>
              {transportation}
            </SelectItem>
          ))}
        </Select>
        {inputFields.map((field, index) => (
          <Input
            key={index}
            variant="underlined"
            placeholder={field.placeholder}
            label={field.label}
            className="font-semibold"
            {...register(field.name as keyof FormData)}
            required
          />
        ))}
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="시간"
            label="이동 시간 (시간)"
            className="font-semibold"
            onChange={handleHoursChange}
          />
          <Input
            type="number"
            placeholder="분"
            label="이동 시간 (분)"
            className="font-semibold"
            onChange={handleMinutesChange}
          />
        </div>
        <Textarea
          label="메모"
          placeholder="일정에 대한 메모를 입력해주세요"
          className="font-semibold"
          minRows={5}
          required
          {...register("memo")}
        />
        <div className="flex justify-end">
          <Button variant="flat" color="success" type="submit">
            장소 추가하기
          </Button>
        </div>
      </form>

      <div className="w-full space-y-5 mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            현재 해당 플래너에 저장된 정보
          </h1>
          <button onClick={() => setCalendarView((prev) => !prev)}>
            {calendarView ? (
              <FaAngleDoubleUp className="text-2xl text-gray-500 hover:text-gray-900" />
            ) : (
              <FaAngleDoubleDown className="text-2xl text-gray-500 hover:text-gray-900" />
            )}
          </button>
        </div>
        {calendarView && <LocationItems locationItems={data?.locationInfo} />}
      </div>

      {data?.locationInfo.length === 0 && (
        <div className="text-xl text-center text-gray-500 mt-40">
          <p>해당 플래너에 아직 장소가 등록되지 않았습니다.</p>
        </div>
      )}

      <Button className="w-full mt-3" color="primary" onClick={routeCalender}>
        작성 완료
      </Button>
    </div>
  );
}
