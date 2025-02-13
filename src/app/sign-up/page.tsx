"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  usernameV,
  nicknameV,
  emailV,
  emailConfirmV,
  passwordV,
  passwordConfirmV,
  ageV,
} from "../validationRules";
import { useCallback, useEffect, useState } from "react";
import useSendEmail from "@/hooks/userHooks/useSendEmail";
import useEmailConfirm from "@/hooks/userHooks/useEmailConfirm";
import useCheckUsername from "@/hooks/userHooks/useCheckUsername";
import useCheckNickname from "@/hooks/userHooks/useCheckNickname";
import useSignup from "@/hooks/userHooks/useSignup";
import Swal from "sweetalert2";
import { SignupData, SignupRequest } from "@/types/userTypes/signup";
import { useRouter } from "next/navigation";

export default function SignupDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<SignupData>({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
  });

  const router = useRouter();

  // 이메일 인증시간 카운트다운
  const [countdown, setCountdown] = useState<number | null>(null);
  // 인증시간 만료 메시지 여부
  const [expriedMessage, setExpriedMessage] = useState(false);

  // 커스텀 훅 사용
  const sendEmail = useSendEmail();
  const emailConfirmM = useEmailConfirm();
  const checkUsername = useCheckUsername();
  const checkNickname = useCheckNickname();
  const signup = useSignup();

  // 시간 포맷 함수
  const formatTime = useCallback((second: number | null) => {
    if (second === null) return;
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }, []);

  // 카운트다운 처리
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev! - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setExpriedMessage(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  // 이메일 전송
  const handleSendEmail = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;
    const email = getValues("email");
    sendEmail.mutate(email, {
      onSuccess: () => {
        setCountdown(300);
        setExpriedMessage(false);
      },
    });
  };

  // 이메일 인증
  const handleEmailConfirm = async () => {
    const isValid = await trigger("emailConfirm");
    if (!isValid) return;
    const email = getValues("email");
    const key = getValues("emailConfirm").trim();
    emailConfirmM.mutate(
      { email, key },
      {
        onSuccess: () => {
          setCountdown(null);
          setExpriedMessage(false);
        },
      }
    );
  };

  // username 중복확인
  const handleCheckUsername = async () => {
    const isValid = await trigger("username");
    if (!isValid) return;
    const username = getValues("username");
    checkUsername.mutate(username);
  };

  // nickname 중복확인
  const handleCheckNickname = async () => {
    const isValid = await trigger("nickname");
    if (!isValid) return;
    const nickname = getValues("nickname");
    checkNickname.mutate(nickname);
  };

  // 회원가입 요청
  const onSubmit = (signupData: SignupRequest) => {
    if (
      !emailConfirmM.isSuccess ||
      !checkUsername.isSuccess ||
      !checkNickname.isSuccess
    ) {
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "모든 인증과 중복확인을 완료해주세요.",
      });
      return;
    }

    const { username, nickname, email, password, age } = signupData;
    signup.mutate(
      { username, nickname, email, password, age },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "회원가입 성공",
            text: "로그인 페이지로 이동합니다.",
          });
          router.push("/login");
          localStorage.setItem("signup", "success");
        },
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "회원가입 실패",
            text: error.message,
          });
        },
      }
    );
  };

  const errorStyle = "text-sm text-red-500 font-semibold";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div className="p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          회원가입
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-5"
        >
          {/* 이메일 입력&전송&에러메세지 */}
          <div className="flex items-end gap-1">
            <Input
              type="email"
              variant="underlined"
              label="이메일"
              isDisabled={emailConfirmM.isSuccess}
              {...register("email", emailV)}
            />
            <Button
              color="primary"
              size="sm"
              onClick={handleSendEmail}
              isLoading={sendEmail.isPending}
              isDisabled={emailConfirmM.isSuccess}
            >
              {emailConfirmM.isSuccess ? "전송완료" : "전송"}
            </Button>
          </div>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 이메일 인증입력&확인&에러메세지 */}
          <div className="flex items-end gap-1">
            <Input
              type="text"
              variant="underlined"
              label="이메일 확인 코드"
              isDisabled={emailConfirmM.isSuccess}
              {...register("emailConfirm", emailConfirmV)}
            />
            <p className="text-sm text-yellow-500 m-1">
              {formatTime(countdown)}
            </p>
            <Button
              color="primary"
              size="sm"
              onClick={handleEmailConfirm}
              isLoading={emailConfirmM.isPending}
              isDisabled={emailConfirmM.isSuccess}
            >
              {emailConfirmM.isSuccess ? "인증완료" : "인증"}
            </Button>
          </div>
          {expriedMessage && (
            <p className="text-sm text-red-500">
              인증시간이 만료되었습니다. 다시 인증해주세요.
            </p>
          )}
          <ErrorMessage
            errors={errors}
            name="emailConfirm"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* username입력&중복확인&에러메세지 */}
          <div className="flex items-end gap-1">
            <Input
              type="text"
              variant="underlined"
              label="아이디"
              isDisabled={checkUsername.isSuccess}
              {...register("username", usernameV)}
            />
            <Button
              color="primary"
              size="sm"
              onClick={handleCheckUsername}
              isLoading={checkUsername.isPending}
              isDisabled={checkUsername.isSuccess}
            >
              {checkUsername.isSuccess ? "확인완료" : "중복확인"}
            </Button>
          </div>
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* nickname입력&중복확인&에러메세지 */}
          <div className="flex items-end gap-1">
            <Input
              type="text"
              variant="underlined"
              label="닉네임"
              isDisabled={checkNickname.isSuccess}
              {...register("nickname", nicknameV)}
            />
            <Button
              color="primary"
              size="sm"
              isDisabled={checkNickname.isSuccess}
              onClick={handleCheckNickname}
            >
              {checkNickname.isSuccess ? "확인완료" : "중복확인"}
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
            {...register("age", ageV)}
          />
          <ErrorMessage
            errors={errors}
            name="age"
            render={({ message }) => <p className={errorStyle}>{message}</p>}
          />
          {/* 비밀번호 입력&에러메세지 */}
          <Input
            type="password"
            variant="underlined"
            label="비밀번호"
            {...register("password", passwordV)}
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
            {...register("passwordConfirm", passwordConfirmV)}
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
            isLoading={signup.isPending}
          >
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
