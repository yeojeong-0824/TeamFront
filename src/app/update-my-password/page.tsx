"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { passwordV, passwordConfirmV } from "../validationRules";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckPasswordModal from "../components/CheckPasswordModal";
import useUpdateUserPassword from "@/hooks/userHooks/useUpdateUserPassword";
import { UpdateUserPassword } from "@/types/userTypes/updateInfo";

export default function UpdateMyPassword() {
  const router = useRouter();
  const [checkKey, setCheckKey] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPassword>({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
  });

  const { mutate, isPending } = useUpdateUserPassword();

  const onSubmit = (updateData: UpdateUserPassword) => {
    if (!updateData) return;

    mutate(updateData, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  const errorStyle = "text-sm text-red-500 font-semibold";
  return (
    <div className="min-h-[calc(100vh-304px)] sm:min-h-[calc(100vh-294px)] mt-[63.48px] sm:mt-[90.9px] flex items-center justify-center bg-gray-100 p-1">
      {!checkKey && <CheckPasswordModal setCheckKey={setCheckKey} />}
      <div className="p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg max-w-[400px]">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          새로운 비밀번호
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-5"
        >
          {/* 비밀번호 입력&에러메세지 */}
          <Input
            type="password"
            variant="underlined"
            label="비밀번호"
            {...register("password")}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 비밀번호 확인 입력&에러메세지 */}
          <Input
            type="password"
            variant="underlined"
            label="비밀번호 확인"
            {...register("checkPassword")}
          />
          <ErrorMessage
            errors={errors}
            name="checkPassword"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 비밀번호 변경 버튼 */}
          <Button color="primary" variant="bordered" type="submit">
            비밀번호 변경
          </Button>
        </form>
      </div>
    </div>
  );
}
