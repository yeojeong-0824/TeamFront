'use client';
import Link from "next/link";
import useAuthStore, { useAuthInitializer } from '../store';
import Swal from "sweetalert2";

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
    <header className="flex justify-between w-full py-5 px-1 bg-white border-b shadow-md">
      <Link href={'/'}>
        <h1 className="text-2xl font-bold">여 정</h1>
      </Link>   
      {accessToken ? (
        <div className="flex gap-10 items-center">
          <div className="flex gap-2">
            <button onClick={handleLogout} className="p-2 rounded-xl bg-red-500 text-white">로그아웃</button>
            <Link href={'/check-my-info'} className="p-2 rounded-xl bg-blue-500 text-white">회원정보</Link>
          </div>
        </div>
      ) : (
        <div className="flex gap-10 items-center">
          <div className="flex gap-2">
            <Link href={'/login-ui'} className="p-2 rounded-xl bg-blue-500 text-white">로그인</Link>
            <Link href={'/email-check'} className="p-2 rounded-xl bg-blue-500 text-white">회원가입</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;