'use client';
import { useState } from 'react';
import { url } from '../store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FindPassword() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function find_id() {
        try {
            const response = await fetch(`${url}/member/findMember/password`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json' // 데이터 형식 설정
                },
                body: JSON.stringify(formData)})
            if (response.status === 200) {
                alert("비밀번호를 이메일로 전송하였습니다")
                router.push('/login-ui'); // 로그인 페이지로 리다이렉트
            }
            else if (response.status === 400) {
                alert("이메일 주소를 바르게 입력해주세요");
            }
        } catch (error) {
            alert(error);
        }
    }

    return(
        <div className = "h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white w-full py-20 px-4 text-center border-1 border-gray-300 max-w-md shadow-md rounded-lg overflow-hidden">
                <h3 className="text-3xl text-gray-800 font-semibold">비밀번호 찾기</h3>
                <div className="flex flex-col mt-5 px-5">
                    <input
                        placeholder ="ID"
                        className="bg-white focus:outline-none border-1 focus:border-opacity-50 focus:border-gray-300 mb-3 py-3 px-5 rounded-lg"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required/>
                    <input
                        placeholder ="EMAIL"
                        className="bg-white focus:outline-none border-1 focus:border-opacity-50 focus:border-gray-300 py-3 px-5 rounded-lg"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    
                    <input type="submit" className='py-3 px-5 text-white bg-[#6EB4FB] mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90 hover:bg-blue-500' value="이메일 전송" onClick={find_id}/>

                    <div className="my-6">
                        <Link href={'/login-ui'} className='inline-block'><p className='m-2'>로그인으로 돌아가기</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}