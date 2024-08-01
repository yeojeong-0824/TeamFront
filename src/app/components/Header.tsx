'use client';
import Link from "next/link";

const Header = (): JSX.Element => {
  return (
    <header className="flex justify-between w-full py-5 px-1 bg-white border-b shadow-md">
      <Link href={'/'}>
        <h1 className="text-2xl font-bold text-blue-500">Seoul Community</h1>
      </Link>
      <div className="flex gap-10 items-center">
        <div className="flex gap-2">
          <Link href={'/login-ui'} className="p-2 rounded-xl bg-blue-500 text-white">로그인</Link>
          <Link href={'/email-check'} className="p-2 rounded-xl bg-blue-500 text-white">회원가입</Link>
        </div>
      </div>
    </header>
  )
};

export default Header;