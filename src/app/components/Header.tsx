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

  return (
    <header className="w-full top-0 z-50 flex justify-between p-2 bg-white border-b-2 fixed">
      <Link href={'/'}>
        <Image src='/여정logo.png' alt="메인 로고" width={80} height={80} />
      </Link>
      {accessToken ? (
        <div className="flex gap-10 items-center">
          <div className="flex gap-2">
            <button onClick={handleLogout} className="px-4 p-2 rounded-full border hover:bg-gray-100 text-sm">로그아웃</button>
            <Link href={'/check-my-info'} className="px-4 p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 text-sm">회원정보</Link>
          </div>
        </div>
      ) : (
        <div className="flex gap-10 items-center">
          <div className="flex gap-2">
            <Link href={'/login-ui'} className="px-4 p-2 rounded-full border hover:bg-gray-100 text-sm">로그인</Link>
            <Link href={'/email-check'} className="px-4 p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 text-sm">회원가입</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;