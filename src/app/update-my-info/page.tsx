"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import LoadingSpinner from "@/app/components/Loading";

import useGetUserInfo from "@/hooks/userHooks/useGetUserInfo";
import useCheckNickname from "@/hooks/userHooks/useCheckNickname";

import { useEffect, useState } from "react";
import CheckPasswordModal from "../components/CheckPasswordModal";
import { UpdateUserInfo } from "@/types/userTypes/updateInfo";
import useUpdateUserInfo from "@/hooks/userHooks/useUpdateUserInfo";
import { useRouter } from "next/navigation";

export default function UpdateMyInfo() {
  const router = useRouter();

  const [checkKey, setCheckKey] = useState("");
  const [changeNickname, setChangeNickname] = useState(false);

  const { data: userInfo, isLoading: getUserInfoIsLoading } = useGetUserInfo();
  const { mutate: updateUserInfo, isPending: updateUserInfoIsPending } =
    useUpdateUserInfo();
  const checkNickname = useCheckNickname();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    trigger,
    setValue,
  } = useForm<UpdateUserInfo>({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
  });

  useEffect(() => {
    if (userInfo) {
      setValue("nickname", userInfo.nickname);
      setValue("age", userInfo.age);
    }
  }, [userInfo, checkKey]);

  useEffect(() => {
    const nickname = watch("nickname");
    if (nickname !== userInfo?.nickname) {
      setChangeNickname(true);
    } else {
      setChangeNickname(false);
    }
  }, [watch("nickname")]);

  const onSubmit = (updateData: UpdateUserInfo) => {
    if (!updateData) return;

    updateUserInfo(updateData, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  // nickname 중복확인
  const handleCheckNickname = async () => {
    const isValid = await trigger("nickname");
    if (!isValid) return;
    const nickname = getValues("nickname");
    checkNickname.mutate(nickname);
  };

  const errorStyle = "text-sm text-red-500 font-semibold";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      {!checkKey && <CheckPasswordModal setCheckKey={setCheckKey} />}
      {getUserInfoIsLoading ? (
        <LoadingSpinner size={15} isLoading={getUserInfoIsLoading} />
      ) : (
        <div className="max-w-[800px] p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg">
          <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
            내 정보 수정
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            {/* email */}
            <div className="flex items-end gap-1">
              <Input
                type="email"
                variant="underlined"
                label="이메일"
                value={userInfo?.email}
                isDisabled
                readOnly
              />
            </div>
            {/* username */}
            <div className="flex items-end gap-1">
              <Input
                type="text"
                variant="underlined"
                label="아이디"
                value={userInfo?.username}
                isDisabled
                readOnly
              />
            </div>
            {/* nickname 입력 & 중복 확인 & 에러 메시지 */}
            <div className="flex items-end gap-1">
              <Input
                type="text"
                variant="underlined"
                label="닉네임"
                isDisabled={checkNickname.isSuccess}
                {...register("nickname")}
              />
              {changeNickname && (
                <Button
                  color="primary"
                  size="sm"
                  isDisabled={checkNickname.isSuccess}
                  onClick={handleCheckNickname}
                >
                  {checkNickname.isSuccess ? "확인완료" : "중복확인"}
                </Button>
              )}
            </div>
            <ErrorMessage
              errors={errors}
              name="nickname"
              render={({ message }) => <p className={errorStyle}>{message}</p>}
            />
            {/* 나이 입력 & 에러 메시지 */}
            <Input
              type="number"
              variant="underlined"
              label="나이"
              {...register("age")}
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
              isLoading={updateUserInfoIsPending}
            >
              내 정보 수정
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
