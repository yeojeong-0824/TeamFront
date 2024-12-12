'use client';

import { Link } from '@nextui-org/react';

import formatDate from '@/util/formatDate';
import useGetUserInfo from '@/hooks/userHooks/useGetUserInfo';

export default function CheckMyInfo() {
  const { data, error, isLoading } = useGetUserInfo();

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
  <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-6">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">{data?.nickname}</h2>
        <p className="text-gray-600 mt-1">{data?.email}</p>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">설정</h3>
      <ul className="mt-6 space-y-4">
        <li>
          <Link href="/update-my-info" className="text-gray-600 hover:text-gray-800">
            내 정보 수정
          </Link>
        </li>
        <hr/>
        <li>
          <Link href="/update-my-password" className="text-gray-600 hover:text-gray-800">
            비밀번호 변경
          </Link>
        </li>
        <hr/>
        <li>
          <Link href="/check-my-activity" className="text-gray-600 hover:text-gray-800">
            나의 활동
          </Link>
        </li>
        <hr/>
        <li className="flex justify-end">
          <Link href="/delete-account" className="text-sm text-gray-600 hover:text-red-600">
            회원 탈퇴
          </Link>
        </li>
      </ul>
    </div>
  </div>
</div>

  );
}
