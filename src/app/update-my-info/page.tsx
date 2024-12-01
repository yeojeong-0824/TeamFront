'use client';

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { nicknameV, passwordV, ageV } from "../validationRules";

import useGetUserInfo from "@/hooks/userHooks/useGetUserInfo";
import useCheckNickname from "@/hooks/userHooks/useCheckNickname";

import { SignupData } from "@/types/userTypes/signup";
import Swal from 'sweetalert2';
import useCheckPassword from "@/hooks/userHooks/useCheckPassword";

type CheckPassword = {
  password: string;
};

export default function UpdateMyInfo() {

  const { mutate, isPending } = useCheckPassword();
  let checkKey : string = ''

  const checkPassword = (data: CheckPassword) => {
    if(!data.password) return;
    mutate(data, {
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: '비밀번호 전송 성공',
                text: '이메일을 확인하여 새로운 비밀번호로 로그인 후 비밀번호를 변경해주세요',
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: '비밀번호 전송 실패',
                text: '아이디와 이메일 주소를 확인해주세요',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
  };

  const modal = () => {
    if(checkKey) return null;
    let data: CheckPassword = {
      password: ""
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
              비밀번호 확인
            </h3>
            <form
            onSubmit={handleSubmit(checkPassword)}
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
              <Button
                color="primary"
                size="sm"
              >비밀번호 확인</Button>
            </form>
          </div>
        </div>
      </div>
    )
  };

  const { register, handleSubmit, formState: { errors }, getValues, trigger, setValue } = useForm<SignupData>({
    mode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
  });

  
  const { data, error, isLoading } = useGetUserInfo();

  const checkNickname = useCheckNickname();

  // nickname 중복확인
  const handleCheckNickname = async () => {
    const isValid = await trigger('nickname');
    if (!isValid) return;
    const nickname = getValues('nickname');
    checkNickname.mutate(nickname);
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
          // onSubmit={handleSubmit(onSubmit)}
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
            // isLoading={signup.isPending}
          >
            내 정보 수정
          </Button>
        </form>
      </div>
    </div>
  )
};