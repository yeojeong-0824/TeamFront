'use client';

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { usernameV, nicknameV, emailV, emailConfirmV, passwordV, passwordConfirmV, ageV } from "../validationRules";
import { useCallback, useEffect, useState } from "react";

import useGetUserInfo from "@/hooks/userHooks/useGetUserInfo";
import useSendEmail from "@/hooks/userHooks/useSendEmail";
import useEmailConfirm from "@/hooks/userHooks/useEmailConfirm";
import useCheckUsername from "@/hooks/userHooks/useCheckUsername";
import useCheckNickname from "@/hooks/userHooks/useCheckNickname";
import useSignup from "@/hooks/userHooks/useSignup";

import Swal from "sweetalert2";
import { SignupData, SignupRequest } from "@/types/userTypes/signup";
import { useRouter } from "next/navigation";

export default function SignupDemo() {
  const [checkKey, setCheckKey] = useState('');
  
  const modal = () => {
    if(!checkKey) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
              비밀번호 확인
            </h3>
            <Input
              type="password"
              variant="underlined"
              label="기존 비밀번호"
              {...register('oldPassword', passwordConfirmV)}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p className={errorStyle}>{message}</p>}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkPassword} >비밀번호 확인</button>
        </div>
      </div>
    )
  };
  
  const checkPassword = () => {
    setCheckKey('test');
  };

  const { register, handleSubmit, formState: { errors }, getValues, trigger, setValue } = useForm<SignupData>({
    mode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
  });

  const router = useRouter();

  const { data, error, isLoading } = useGetUserInfo();

  useEffect(() => { if (data?.email) { setValue('email', data.email); } }, [data, setValue]);

  const checkNickname = useCheckNickname();
  const signup = useSignup();

  // nickname 중복확인
  const handleCheckNickname = async () => {
    const isValid = await trigger('nickname');
    if (!isValid) return;
    const nickname = getValues('nickname');
    checkNickname.mutate(nickname);
  };

  // 회원가입 요청
  const onSubmit = (signupData: SignupRequest) => {
    if (!checkNickname.isSuccess) {
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: '모든 인증과 중복확인을 완료해주세요.'
      })
      return;
    }

    const { username, nickname, email, password, age } = signupData;
    signup.mutate({ username, nickname, email, password, age }, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '회원가입 성공',
          text: '로그인 페이지로 이동합니다.'
        });
        router.push('/login-ui');
      },
      onError: (error) => {
        Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: error.message
        })
      }
    });
  };

  const errorStyle = 'text-sm text-red-500 font-semibold';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div>
        {modal()}
      </div>
      <div className="p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          내 정보 수정
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-5">
          <div className="flex items-end gap-1">
            <Input
              type="email"
              variant='underlined'
              label="이메일"
              defaultValue={data?.email}
            />
          </div>
          {/* username입력&중복확인&에러메세지 */}
          <div className="flex items-end gap-1">
            <Input
              type="text"
              variant="underlined"
              label="아이디"
              defaultValue={data?.username}
            />
          </div>
          {/* nickname입력&중복확인&에러메세지 */}
          <div className="flex items-end gap-1">
            <Input
              type="text"
              variant="underlined"
              label="닉네임"
              defaultValue={data?.nickname}
              isDisabled={checkNickname.isSuccess}
              {...register('nickname', nicknameV)}
            />
            <Button
              color="primary"
              size="sm"
              isDisabled={checkNickname.isSuccess}
              onClick={handleCheckNickname}
            >
              {checkNickname.isSuccess ? '확인완료' : '중복확인'}
            </Button>
          </div>
          <ErrorMessage
            errors={errors}
            name="nickname"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 나이 입력&에러메세지 */}
          <Input
            type="number"
            variant="underlined"
            label="나이"
            {...register('age', ageV)}
          />
          <ErrorMessage
            errors={errors}
            name="age"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 수정 버튼 */}
          <Button 
            color="primary" 
            variant="bordered" 
            type="submit"
            isLoading={signup.isPending}
          >
            내 정보 수정
          </Button>
        </form>
      </div>
    </div>
  )
};