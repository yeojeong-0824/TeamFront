"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { usernameV, emailV } from "../validationRules";
import { ErrorMessage } from "@hookform/error-message";
import { Input, Button } from "@nextui-org/react";
import useFindPassword from "@/hooks/userHooks/useFindPassword";
import Swal from "sweetalert2";

type FindPassword = {
  username: string;
  email: string;
};

export default function FindPassword() {
  const router = useRouter();
  const { mutate, isPending } = useFindPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPassword>({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
  });

  const onSubmit = (data: FindPassword) => {
    if (!data.username || !data.email) return;
    mutate(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "비밀번호 전송 성공",
          text: "이메일을 확인하여 새로운 비밀번호로 로그인 후 비밀번호를 변경해주세요",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/login");
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "비밀번호 전송 실패",
          text: "아이디와 이메일 주소를 확인해주세요",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div className="p-10 sm:p-20 bg-white text-center shadow-md rounded-lg">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          비밀번호 찾기
        </h3>
        <form
          className="flex flex-col mx-auto gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input placeholder="아이디" {...register("username", usernameV)} />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <p className="text-sm text-red-500 font-semibold">{message}</p>
            )}
          />
          <Input placeholder="이메일" {...register("email", emailV)} />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="text-sm text-red-500 font-semibold">{message}</p>
            )}
          />
          <Button
            color="primary"
            type="submit"
            className="mt-5"
            isLoading={isPending}
          >
            비밀번호 찾기
          </Button>
          <Link
            href={"/login"}
            className="text-xs sm:text-sm hover:text-blue-500 mt-3"
          >
            <p>로그인으로 돌아가기</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
