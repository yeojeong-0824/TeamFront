'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store'; // Zustand 스토어 가져오기
import Link from 'next/link';
import { url } from '../store'

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
          alert('로그인하였습니다');
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
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">아이디:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">암호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" value="로그인" />
      </form>
      <Link href={'/email-check'}>회원가입</Link>
      <Link href={'/find-account'}>계정찾기</Link>
    </div>
  );
}
