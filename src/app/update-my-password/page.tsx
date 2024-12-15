'use client';

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { passwordV, passwordConfirmV } from "../validationRules";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckPasswordModal from "../components/CheckPasswordModal";
import useUpdateUserPassword from "@/hooks/userHooks/useUpdateUserPassword";
import { UpdateUserPassword } from "@/types/userTypes/updateInfo";
import Swal from "sweetalert2";

export default function UpdateMyPassword() {
  const router = useRouter();
  const [checkKey, setCheckKey] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<UpdateUserPassword>({
    mode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
  });

  const updateData: UpdateUserPassword = {
    checkPassword: checkPassword,
    password: password
  }

  const { mutate, isPending } = useUpdateUserPassword();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate(updateData);
      router.back();
    } catch (error) {}
  };

  const errorStyle = 'text-sm text-red-500 font-semibold';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div>
        <CheckPasswordModal checkKey={ checkKey } setCheckKey={ setCheckKey }/>
      </div>
      <div className="p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg w-1/4">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          새로운 비밀번호
        </h3>
        <form
          onSubmit={ submit }
          className="flex flex-col gap-5 mt-5">
          {/* 비밀번호 입력&에러메세지 */}
          <Input
            type="password"
            variant="underlined"
            label="비밀번호"
            {...register('password', {
              ...passwordV,
              onChange: (e) => setPassword(e.target.value),
            })}
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
            {...register('checkPassword', {
              ...passwordConfirmV,
              onChange: (e) => setCheckPassword(e.target.value),
            })}
          />
          <ErrorMessage
            errors={errors}
            name="checkPassword"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 비밀번호 변경 버튼 */}
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