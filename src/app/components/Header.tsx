'use client';

import Link from "next/link";
import useAuthStore, { useAuthInitializer } from '../store';
import Swal from "sweetalert2";
import Image from "next/image";

const Header = (): JSX.Element => {
  useAuthInitializer(); // 상태 초기화 훅 호출

  const { accessToken, clearTokens } = useAuthStore();

  const handleLogout = () => {
    clearTokens(); // 액세스 토큰과 리프레쉬 토큰 삭제
    Swal.fire({
      icon: 'success',
      title: '로그아웃 성공',
      text: '로그아웃 되었습니다',
    });
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
        {accessToken ? (
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
    </header>
  );
};

export default Header;