'use client';

import { Link } from '@nextui-org/react';

import formatDate from '@/util/formatDate';
import useGetUserInfo from '@/hooks/userHooks/useGetUserInfo';

export default function CheckMyInfo() {
  const { data, error, isLoading } = useGetUserInfo();

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-200 p-4 text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#6EB4FB]"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800">{data?.nickname}</h2>
            <p className="text-gray-600 mt-1">{data?.email}</p>
            <p className="text-gray-500 mt-2">{formatDate(data?.time.createTime)}</p>
            <div className="mt-4 flex justify-center">
              <Link href={'/check-my-info/update-my-info'} className="bg-[#6EB4FB] mx-2 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                내 정보 수정
              </Link>
              <Link href={'/check-my-info/update-my-password'} className="bg-[#6EB4FB] mx-2 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                비밀번호 변경
              </Link>
              <Link href={'/check-my-info/check-my-activity'} className="bg-[#6EB4FB] mx-2 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                나의 활동
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
