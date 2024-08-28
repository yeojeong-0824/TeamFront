'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import useAuthStore from '../store';
import { useRouter } from 'next/navigation';

import { url } from '../store';

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
    <div className="flex justify-center items-center h-screen">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>내 정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>{userInfo.username}</td>
          </tr>
          <tr>
            <td>암호</td>
            <td><Link href={'/change-pw'}>변경</Link></td>
          </tr>
          <tr>
            <td>닉네임</td>
            <td>{userInfo.nickname} <Link href={'/change-nickname'}>변경</Link></td>
          </tr>
          <tr>
            <td>email</td>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{userInfo.real_name}</td>
          </tr>
          <tr>
            <td>생년</td>
            <td>{userInfo.age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
