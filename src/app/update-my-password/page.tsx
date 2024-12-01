'use client';

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { usernameV, nicknameV, emailV, emailConfirmV, passwordV, passwordConfirmV, ageV } from "../validationRules";
import { useCallback, useEffect, useState } from "react";
import useSendEmail from "@/hooks/userHooks/useSendEmail";
import useEmailConfirm from "@/hooks/userHooks/useEmailConfirm";
import useCheckUsername from "@/hooks/userHooks/useCheckUsername";
import useCheckNickname from "@/hooks/userHooks/useCheckNickname";
import useSignup from "@/hooks/userHooks/useSignup";
import Swal from "sweetalert2";
import { SignupData, SignupRequest } from "@/types/userTypes/signup";
import { useRouter } from "next/navigation";

export default function UpdateMyPassword() {
  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<SignupData>({
    mode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
  });

  const router = useRouter();

  // 회원가입 요청
  const onSubmit = (signupData: SignupRequest) => {
    return
  };

  const errorStyle = 'text-sm text-red-500 font-semibold';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div className="p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          새로운 비밀번호
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-5">
          {/* 비밀번호 입력&에러메세지 */}
          <Input
            type="password"
            variant="underlined"
            label="비밀번호"
            {...register('password', passwordV)}
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
            {...register('passwordConfirm', passwordConfirmV)}
          />
          <ErrorMessage
            errors={errors}
            name="passwordConfirm"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 회원가입 버튼 */}
          <Button 
            color="primary" 
            variant="bordered" 
            type="submit"
          >
            비밀번호 변경
          </Button>
        </form>
      </div>
    </div>
  )
};