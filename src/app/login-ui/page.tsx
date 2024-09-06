'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store'; // Zustand 스토어 가져오기
import Link from 'next/link';
import { url } from '../store'
import Swal from 'sweetalert2';

export default function LoginUi() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const encodedData = new URLSearchParams(formData);

    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedData.toString(),
      });

      if (response.status === 200) {
        const token = response.headers.get('Authorization');
        const refresh = response.headers.get('Refresh');

        if (typeof token === 'string' && typeof refresh === 'string') {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refresh);
          setAccessToken(token);
          Swal.fire({
            icon: 'success',
            title: '로그인 성공',
            text: '로그인 되었습니다',
            timer: 1000,
            showConfirmButton: false
          });
          router.push('/'); // 로그인 후 메인 페이지로 리다이렉트
        } else {
          alert('인증토큰을 불러오지 못했습니다. 다시 로그인해보세요.');
        }
      } else {
        console.error('Error submitting form');
        alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  return (
    <div className = "h-screen flex items-center justify-center">
        <div className="bg-white w-full max-w-lg py-20 px-4 rounded-lg text-center border-1 border-gray-300">
            <h3 className="text-3xl text-gray-800 font-semibold">로그인</h3>
            <form className="flex flex-col mt-5 px-5" onSubmit={handleSubmit}>
                <input
                  placeholder ="Email"
                  className="bg-white focus:outline-none border-1 focus:border-opacity-50 focus:border-gray-300 mb-3 py-3 px-5 rounded-lg"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required/>
                <input
                  placeholder ="passworld"
                  type="password"
                  className="bg-white focus:outline-none border-1 focus:border-opacity-50 focus:border-gray-300 py-3 px-5 rounded-lg"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required/>
                
                <input type="submit" className='py-3 px-5 text-white bg-[#6EB4FB] mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90' value="로그인" />

                <div className="my-6">
                  <Link href={'/email-check'} className='inline-block'><p className='m-2'>회원가입</p></Link>
                  <Link href={'/find-account'} className='inline-block'><p className='m-2'>아이디/비밀번호 찾기</p></Link>
                </div>
            </form>
        </div>
    </div>
  );
}