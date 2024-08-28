'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import useAuthStore from '../store';
import { useRouter } from 'next/navigation';


import { url} from '../store';

export default function CheckMyInfo() {
  const router = useRouter();

  const { clearTokens } = useAuthStore();

const [username, set_username] = useState("");
const [nickname, set_nickname] = useState("");
const [real_name, set_real_name] = useState("");
const [email, set_email] = useState("");
const [age, set_age] = useState(0);




  
  useEffect(() => {
    get_my_info();
  }, [get_my_info]);


  async function get_my_info() {
    try {
      const response = await fetch(`${url}/member/authed`, {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const data = await response.json(); // 응답의 본문을 JSON 형식으로 변환하여 저장
        set_username(data.username);
        set_nickname(data.nickname);
        set_email(data.email);
        set_real_name(data.name);
        set_age(data.age);

      } else if (response.status === 400) {
alert("사용자 정보를 찾을 수 없습니다")
      } else if (response.status === 403) {
// 리프레쉬 토큰 불러오기
const responseagain = await fetch(`${url}/member/authed`, {
  method: 'GET',
  headers: {
    'Refresh': `${localStorage.getItem("refreshToken")}`,
    'Content-Type': 'application/json'
  }
});
if (responseagain.status === 200) {
  const data = await responseagain.json(); // 응답의 본문을 JSON 형식으로 변환하여 저장
  set_username(data.username);
  set_nickname(data.nickname);
  set_email(data.email);
  set_real_name(data.name);
  set_age(data.age);

  const token = responseagain.headers.get('Authorization');
   if (typeof token === 'string') {
  localStorage.setItem('accessToken', token);
}

} else {
  alert("세션이 만료되었습니다. 다시 로그인해주세요")
  clearTokens();
  router.push('/'); 

  }


      }
  
    } catch (error) {
      alert(error);
    }
  }
      

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
            <td>{username}</td>
          </tr>
          <tr>
            <td>암호</td>
            <td><Link href={'/change-pw'}>변경</Link></td>
          </tr>
          <tr>
            <td>닉네임</td>
            <td>{nickname}<Link href={'/change-nickname'}>변경</Link></td>
          </tr>
          <tr>
            <td>email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{real_name}</td>
          </tr>
          <tr>
            <td>생년</td>
            <td>{age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  

}
