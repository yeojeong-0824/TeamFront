"use client";

import { Button, Input } from "@nextui-org/react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import usePostPlanner from "@/hooks/calender/usePostPlanner";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface PostCalenderProps {
  setStep: (step: number) => void;
  setPlannerId: (plannerId: string) => void;
}

interface FormData {
  title: string;
  subTitle: string;
}

export default function PostCalender({
  setStep,
  setPlannerId,
}: PostCalenderProps) {
  const { mutate, isPending } = usePostPlanner();
  const { register, handleSubmit } = useForm<FormData>();
  const [personnel, setPersonnel] = useState(1);

  const onSubmit = (formData: FormData) => {
    const plannerData = {
      title: formData.title,
      subTitle: formData.subTitle,
      personnel,
    };
    mutate(plannerData, {
      onSuccess: (res) => {
        setPlannerId(res.id);
        setStep(1);
      },
    });
  };

  const handleIncrease = () => {
    setPersonnel((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setPersonnel((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex flex-col justify-center">
      <form
        className="w-full space-y-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          variant="bordered"
          placeholder="일정의 제목을 입력해주세요"
          label="제목"
          className="font-semibold"
          size="lg"
          required
          {...register("title")}
        />
        <Input
          variant="bordered"
          placeholder="일정의 부제목 혹은 간단한 설명을 입력해주세요"
          label="부제/설명"
          className="font-semibold"
          required
          {...register("subTitle")}
        />
        <div className="flex w-[150px]">
          <Input
            type="number"
            variant="bordered"
            label="인원수"
            className="font-semibold"
            required
            value={personnel.toString()}
            readOnly
          />
          <div className="text-lg">
            <button type="button" className="p-1" onClick={handleIncrease}>
              <FaAngleUp />
            </button>
            <button type="button" className="p-1" onClick={handleDecrease}>
              <FaAngleDown />
            </button>
          </div>
        </div>
        <Button
          className="w-full"
          color="primary"
          isLoading={isPending}
          type="submit"
        >
          다음
        </Button>
      </form>
    </div>
  );
}
