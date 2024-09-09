'use client';

import React, { useEffect, useState } from 'react';
import useAuthStore from '../store';
import { useRouter } from 'next/navigation';

import { url } from '../store';
import { Link } from '@nextui-org/react';

export default function CheckMyInfo() {
  const router = useRouter();
  const { clearTokens } = useAuthStore();

  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    real_name: '',
    email: '',
    age: 0
  });

  useEffect(() => {
    getMyInfo();
  }, []);


  // 값을 받아오는 api 호출에서 중복된 코드가 보임
  // Jwt 토큰을 이용해 데이터를 받아오는 부분
  const getMyInfo = async () => {
    try {
      const response = await fetch(`${url}/member/authed`, {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserInfo({
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          real_name: data.name,
          age: data.age
        });
      } else if (response.status === 400) {
        alert("사용자 정보를 찾을 수 없습니다");
      } else if (response.status === 403) {
        await handleTokenRefresh();
      }
    } catch (error) {
      alert("Error");
    }
  };

  
  // Jwt 토큰이 만료되었다면 Refresh 토큰 이용해 데이터를 받아오는 부분
  const handleTokenRefresh = async () => {
    try {
      const response = await fetch(`${url}/member/authed`, {
        method: 'GET',
        headers: {
          'Refresh': `${localStorage.getItem("refreshToken")}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserInfo({
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          real_name: data.name,
          age: data.age
        });

        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('accessToken', token);
        }
      } else {
        alert("세션이 만료되었습니다. 다시 로그인해주세요");
        clearTokens();
        router.push('/');
      }
    } catch (error) {
      alert("Error");
    }
  };

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
                  <h2 className="text-2xl font-semibold text-gray-800">{userInfo.nickname}</h2>
                  <p className="text-gray-600 mt-1">{userInfo.email}</p>
                  <p className="text-gray-500 mt-2">가입일: 2024년 1월 15일</p>
                  <div className="mt-4 flex justify-center">
                      <Link href={'/update-my-password'} className="bg-[#6EB4FB] mx-2 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                          비밀번호 수정
                      </Link>
                      <Link href={'/update-my-info'} className="bg-[#6EB4FB] mx-2 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                          프로필 수정
                      </Link>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}
