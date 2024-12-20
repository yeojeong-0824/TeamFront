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
import { useEffect, useState } from "react";
import { Time } from "@internationalized/date";
import type { TimeInputValue } from "@nextui-org/react";
import useGetPlanner from "@/hooks/calender/useGetPlanner";
import type { DateValue } from "@react-types/calendar";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toUnixTime from "@/util/toUnixTime";
import Swal from "sweetalert2";
import useGetLocation from "@/hooks/calender/useGetLocation";
import fromUnixTime from "@/util/fromUnixTime";
import useEditLocation from "@/hooks/calender/useEditLocation";

interface PostCalenderProps {
  plannerId: string;
  setModalState: (value: number) => void;
  locationId: number | null;
}

interface FormData {
  transportationNote: string;
  place: string;
  address: string;
  phoneNumber: string;
  memo: string;
  travleTimeHours: number;
  travleTimeMinutes: number;
}

export default function AditLocation({
  plannerId,
  setModalState,
  locationId,
}: PostCalenderProps) {
  const queryClient = useQueryClient();
  const { data: locationData, isLoading: locationIsLoading } =
    useGetLocation(locationId);
  const { mutate: editLocation, isPending: editLocationIsPending } =
    useEditLocation(Number(locationId));

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [calValue, setCalValue] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const [timeStartValue, setTimeStartValue] = useState<TimeInputValue>(
    new Time(hours, minutes)
  );
  const { data } = useGetPlanner(plannerId);
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [selectedTransportation, setSelectedTransportation] = useState("");

  const { year, month, day, hour, minute } = fromUnixTime(
    locationData?.unixTime
  );

  const travleTimeFormat = (travleTime: number) => {
    const THours = Math.floor(travleTime / 60);
    const TMinutes = travleTime % 60;
    return { THours, TMinutes };
  };

  useEffect(() => {
    if (locationData) {
      setValue("transportationNote", locationData.transportationNote);
      setValue("place", locationData.place);
      setValue("address", locationData.address);
      setValue("phoneNumber", locationData.phoneNumber);
      setValue("memo", locationData.memo);
      setHours(hour);
      setMinutes(minute);
      const { THours, TMinutes } = travleTimeFormat(locationData.travelTime);
      setValue("travleTimeHours", THours);
      setValue("travleTimeMinutes", TMinutes);
      setCalValue(new CalendarDate(year, month, day));
      setSelectedTransportation(locationData.transportation);
    }
  }, [locationData]);

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

  const onSubmit = (formData: FormData) => {
    if (!selectedTransportation || !calValue || !timeStartValue || !formData) {
      Swal.fire({
        icon: "error",
        title: "일정 추가 실패",
        text: "모든 항목을 입력해주세요.",
      });
      return;
    }

    if (
      locationData &&
      locationData.transportationNote === formData.transportationNote &&
      locationData.place === formData.place &&
      locationData.address === formData.address &&
      locationData.phoneNumber === formData.phoneNumber &&
      locationData.memo === formData.memo &&
      locationData.travelTime ===
        formData.travleTimeHours * 60 + formData.travleTimeMinutes &&
      locationData.unixTime ===
        toUnixTime({
          year: calValue.year,
          month: calValue.month,
          day: calValue.day,
          hour: timeStartValue.hour,
          minute: timeStartValue.minute,
        }) &&
      locationData.transportation === selectedTransportation
    ) {
      Swal.fire({
        icon: "info",
        title: "변경 사항 없음",
        text: "변경된 내용이 없습니다.",
      });
      return;
    }

    const unixTime = toUnixTime({
      year: calValue.year,
      month: calValue.month,
      day: calValue.day,
      hour: timeStartValue.hour,
      minute: timeStartValue.minute,
    });

    const { travleTimeHours, travleTimeMinutes } = formData;
    const travleTime = travleTimeHours * 60 + travleTimeMinutes;
    const newLocationData = {
      unixTime,
      travelTime: travleTime,
      transportation: selectedTransportation,
      transportationNote: formData.transportationNote,
      place: formData.place,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      memo: formData.memo,
    };

    editLocation(newLocationData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["planner", plannerId.toString()],
        });
        queryClient.invalidateQueries({ queryKey: ["userPlanners"] });
        setModalState(0);
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "일정 추가 실패",
          text: "일정 추가에 실패했습니다. 다시 시도해주세요.",
        });
      },
    });
  };

  return (
    <div>
      <h1 className="flex items-center gap-1 text-2xl font-semibold mb-3">
        장소 수정
      </h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-gray-800">{data?.title}</h1>
        <h2 className="text-lg text-gray-500">{data?.subTitle}</h2>
        <h3 className="text-green-500">{data?.personnel}명</h3>
      </div>
      {!locationIsLoading && (
        <form
          className="p-3 rounded-lg space-y-2"
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
            selectedKeys={
              selectedTransportation ? [selectedTransportation] : []
            }
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
              {...register("travleTimeHours")}
            />
            <Input
              type="number"
              placeholder="분"
              label="이동 시간 (분)"
              className="font-semibold"
              {...register("travleTimeMinutes")}
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
          <Button
            color="primary"
            type="submit"
            className="w-full"
            isLoading={editLocationIsPending}
          >
            장소 추가하기
          </Button>
        </form>
      )}
    </div>
  );
}
