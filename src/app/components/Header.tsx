'use client';

import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
// import useGetIp from "@/api/getIp";
import useAccessCheck from "@/hooks/TokenHooks/useAccessCheck";
import { useQueryClient } from "@tanstack/react-query";
import useRefreshReissue from "@/hooks/TokenHooks/useRefreshReissue";
import { useEffect } from "react";

const Header = (): JSX.Element => {
  // const { data: ipData, isLoading: isIpLoading } = useGetIp();
  const { data: accessCheckData, isLoading: accessIsLoading, isError } = useAccessCheck();
  const queryClient = useQueryClient();
  const { mutate: refreshReissue } = useRefreshReissue();

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('accessToken');
      refreshReissue(undefined, {
        onSuccess: (data) => {
          const tokenWithBearer = data.headers['authorization'];
          localStorage.setItem('accessToken', tokenWithBearer);
          queryClient.invalidateQueries({ queryKey: ['accessCheck'] });
        },
        // onError: () => {
        //   Swal.fire({
        //     icon: 'error',
        //     title: '토큰 갱신 실패',
        //     text: '다시 로그인 해주세요.',
        //   });
        // },
      });
    }
  }, [isError]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    queryClient.resetQueries({ queryKey: ['accessCheck'] });
  };

  const commonStyle = 'p-1 px-2.5 text-xs sm:p-2 sm:px-4 sm:text-sm';
  const logoutLoginStyle = `${commonStyle} border hover:bg-gray-100 rounded-full`;
  const infoSignupStyle = `${commonStyle} bg-[#3D6691] text-white hover:bg-[#2f5072] rounded-full`;
  return (
    <header className="grid grid-cols-2 sm:grid-cols-3 items-center fixed w-full top-0 p-2 bg-white border-b-2 z-50">
      <Link href={'/'} className="w-[50px] sm:col-start-2 sm:justify-self-center sm:w-[80px]">
        <Image src='/여정logo.png' alt="메인 로고" width={80} height={80} />
      </Link>
      <div className="col-start-3 justify-self-end">
        {accessCheckData?.status ? (
          <div className="flex gap-2">
            <button onClick={handleLogout} className={logoutLoginStyle}>로그아웃</button>
            <Link href={'/check-my-info'} className={infoSignupStyle}>회원정보</Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href={'/login-ui'} className={logoutLoginStyle}>로그인</Link>
            <Link href={'/sign-up'} className={infoSignupStyle}>회원가입</Link>
          </div>
        )}
      </div>
      {/* {isIpLoading && <p>사용자의 ip 가져오는 중...</p>}
      {ipData && <p>{ipData?.IPv4}</p>} */}
    </header>
  );
};

export default Header;