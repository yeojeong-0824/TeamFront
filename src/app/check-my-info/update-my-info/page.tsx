'use client';

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { nicknameV, ageV } from "../../validationRules";

import useGetUserInfo from "@/hooks/userHooks/useGetUserInfo";
import useCheckNickname from "@/hooks/userHooks/useCheckNickname";

import { useEffect, useState } from "react";
import CheckPasswordModal from "../../components/CheckPasswordModal";
import { UpdateUserInfo } from "@/types/userTypes/updateInfo";
import useUpdateUserInfo from "@/hooks/userHooks/useUpdateUserInfo";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function UpdateMyInfo() {
  const router = useRouter();

  const [checkKey, setCheckKey] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(0);
  const updateData: UpdateUserInfo = {
    key: checkKey,
    nickname: nickname,
    age: age
  }

  const { mutate, isPending } = useUpdateUserInfo();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(updateData, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "회원 정보 수정 성공",
          text: "회원 정보 수정에 성공하였습니다.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.back();
        });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "회원정보 수정 실패",
          text: "입력 값을 확인해주세요.",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };

  const { data, error, isLoading } = useGetUserInfo();

  const { register, handleSubmit, formState: { errors }, getValues, trigger, setValue } = useForm<UpdateUserInfo>({
    mode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
  });

  useEffect(() => {
    if(data) {
      setValue('nickname', data.nickname)
      setValue('age', data.age)
    }
  }, [data, checkKey]);

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
        <CheckPasswordModal checkKey={ checkKey } setCheckKey={ setCheckKey }/>
      </div>
      <div className="p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          내 정보 수정
        </h3>
        <form
          onSubmit={ submit }
          className="flex flex-col gap-5 mt-5">
          {/* email */}
          <div className="flex items-end gap-1">
            <Input
              type="email"
              variant='underlined'
              label="이메일"
              value={ data?.email }
              readOnly
            />
          </div>
          {/* username */}
          <div className="flex items-end gap-1">
            <Input
              type="text"
              variant="underlined"
              label="아이디"
              value={ data?.username }
              readOnly
            />
          </div>
          {/* nickname입력&중복확인&에러메세지 */}
          <div className="flex items-end gap-1">
            <Input
              type="text"
              variant="underlined"
              label="닉네임"
              isDisabled={checkNickname.isSuccess}
              {...register('nickname', {
                ...nicknameV,
                onChange: (e) => setNickname(e.target.value),
              })}
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
            {...register('age', {
              ...ageV,
              onChange: (e) => setAge(e.target.value),
            })}
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