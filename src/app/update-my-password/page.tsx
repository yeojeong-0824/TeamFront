'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { url } from '../store';

export default function UpdateMyPassword() {
    const router = useRouter();

    const [updateData, setUpdateData] = useState({
      newPassword: "",
      password: ""
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUpdateData({
        ...updateData,
        [name]: value
      });
    };
  
    // jwt 만료 되었을 때 설정을 안해줬습니다! api 요청에서 리팩토링이 필요해 보여서 jwt 토큰이 만료 안된 상황만 처리했습니다.
    async function patchMember() {
        try {
            const response = await fetch(`${url}/member/authed/password`, {
                method: "PATCH",
                headers: {
                    'Authorization': `${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json' // 데이터 형식 설정
                },
                body: JSON.stringify(updateData)})
            if (response.status === 200) {
                alert("비밀번호가 수정되었습니다")
                router.push('/check-my-info'); // 로그인 페이지로 리다이렉트
            }
            else if (response.status === 400) {
                alert("입력값을 확인해주세요");
            }
        } catch (error) {
            alert(error);
        }
    }
  
    return (
        <div className = "h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white w-full py-20 px-4 text-center border-1 border-gray-300 max-w-md shadow-md rounded-lg overflow-hidden">
                <h3 className="text-3xl text-gray-800 font-semibold">비밀번호 수정</h3>
                <div className="flex flex-col mt-5 px-5">
                    <input
                    placeholder ="NEW PASSWORD"
                    className="bg-white focus:outline-none border-1 focus:border-opacity-50 focus:border-gray-300 mb-3 py-3 px-5 rounded-lg"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={updateData.newPassword}
                    onChange={handleChange}
                    required/>
                    <input
                    placeholder ="PASSWORD"
                    type="password"
                    className="bg-white focus:outline-none border-1 focus:border-opacity-50 focus:border-gray-300 py-3 px-5 rounded-lg"
                    id="password"
                    name="password"
                    value={updateData.password}
                    onChange={handleChange}
                    required/>
                    
                    <button className='py-3 px-5 text-white bg-[#6EB4FB] mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90 hover:bg-blue-500' onClick={patchMember}>
                        비밀번호 수정
                    </button>
                </div>
            </div>
        </div>
    );
}
