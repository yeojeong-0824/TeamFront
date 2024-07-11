'use client';

const Header = ():JSX.Element => {
  return (
    <header className="flex justify-between fixed top-0 z-50 w-full py-5 px-1 bg-white border-b shadow-md">
      <h1 className="text-2xl font-bold text-blue-500">Seoul Community</h1>
      <div className="flex gap-10 items-center">
        <div className="flex gap-1">
          <input type="text" className="border p-2 rounded-lg" />
          <button className="p-2 rounded-lg text-white bg-blue-500">검색</button>
        </div>

        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-blue-500 text-white">로그인</button>
          <button className="p-2 rounded-xl bg-blue-500 text-white">회원가입</button>
        </div>
      </div>
    </header>
  )
};

export default Header;