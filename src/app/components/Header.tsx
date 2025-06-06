"use client";

import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import useAccessCheck from "@/hooks/TokenHooks/useAccessCheck";
import { useQueryClient } from "@tanstack/react-query";
import useRemoveRefreshToken from "@/hooks/TokenHooks/useRemoveRefeshToken";
import { useEffect } from "react";

const Header = (): JSX.Element => {
  const { data: accessCheckData, isError, isLoading } = useAccessCheck();
  const queryClient = useQueryClient();
  const { mutate: removeRefreshToken } = useRemoveRefreshToken();

  useEffect(() => {
    if (isLoading) return;
    if (isError) {
      localStorage.removeItem("accessToken");
      return;
    }
    const tokenWithBearer = accessCheckData?.headers?.["authorization"];
    if (tokenWithBearer) {
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", tokenWithBearer);
      queryClient.refetchQueries({ queryKey: ["accessCheck"] });
    }
  }, [accessCheckData, isError, isLoading, queryClient]);

  const handleLogout = () => {
    removeRefreshToken(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        queryClient.resetQueries({ queryKey: ["accessCheck"] });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "로그아웃 실패",
          text: "다시 시도해주세요.",
        });
      },
    });
  };

  const commonStyle = "p-1 px-2.5 text-xs sm:p-2 sm:px-4 sm:text-sm";
  const logoutLoginStyle = `${commonStyle} border hover:bg-gray-100 rounded-full`;
  const infoSignupStyle = `${commonStyle} bg-[#3D6691] text-white hover:bg-[#2f5072] rounded-full`;

  return (
    <header className="grid grid-cols-2 sm:grid-cols-3 items-center fixed w-full top-0 p-2 bg-white border-b-2 z-50">
      <Link
        href={"/"}
        className="w-[50px] sm:col-start-2 sm:justify-self-center sm:w-[80px]"
      >
        <Image src="/여정logo.png" alt="메인 로고" width={80} height={80} />
      </Link>
      <div className="col-start-3 justify-self-end">
        {accessCheckData?.status ? (
          <div className="flex gap-2">
            <button onClick={handleLogout} className={logoutLoginStyle}>
              로그아웃
            </button>
            <Link href={"/check-my-info"} className={infoSignupStyle}>
              회원정보
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href={"/login"} className={logoutLoginStyle}>
              로그인
            </Link>
            <Link href={"/sign-up"} className={infoSignupStyle}>
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
