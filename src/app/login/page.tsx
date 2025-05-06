"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useLogin from "@/hooks/userHooks/useLogin";
import { Input, Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginUi() {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<{
    username: string;
    password: string;
  }>();
  const router = useRouter();
  const { mutate: login, isPending: loginPending } = useLogin();

  const onSubmit = (data: { username: string; password: string }) => {
    login(data, {
      onSuccess: (res) => {
        const tokenWithBearer = res.headers["authorization"];
        localStorage.setItem("accessToken", tokenWithBearer);
        queryClient.refetchQueries({ queryKey: ["accessCheck"] });
        if (localStorage.getItem("signup")) {
          localStorage.removeItem("signup");
          router.push("/");
          return;
        }
        router.back();
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "아이디와 비밀번호를 확인해주세요.",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };

  const loginMenuStyle = "hover:text-blue-500";

  return (
    <div className="min-h-[calc(100vh-304px)] sm:min-h-[calc(100vh-294px)] flex items-center justify-center bg-white sm:bg-gray-100 p-1 mt-[63.48px] sm:mt-[90.9px]">
      <div className="w-full sm:w-[500px] p-10 bg-white text-center shadow-none sm:shadow-md rounded-lg">
        <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">
          로그인
        </h3>
        <form
          className="flex flex-col mx-auto gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input placeholder="아이디" {...register("username")} required />
          <Input
            placeholder="비밀번호"
            type="password"
            {...register("password")}
            required
          />

          <Button
            type="submit"
            color="primary"
            className="mt-5"
            isLoading={loginPending}
          >
            로그인
          </Button>

          <div className="flex justify-center gap-3 text-xs sm:text-sm text-gray-900">
            <Link href={"/sign-up"} className={loginMenuStyle}>
              <p>회원가입</p>
            </Link>
            <Link href={"/find-username"} className={loginMenuStyle}>
              <p>아이디 찾기</p>
            </Link>
            <Link href={"/find-password"} className={loginMenuStyle}>
              <p>비밀번호 찾기</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
