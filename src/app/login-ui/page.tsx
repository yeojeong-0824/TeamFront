'use client';
import { useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
import { url } from '../store';
import Link from 'next/link';

export default function LoginUi() {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
const [formData, setFormData] = useState({
  username: '',
  password: ''
});

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const encodedData = new URLSearchParams(formData);

try{
const response = await fetch(`${url}/login`,{
method: 'POST',
headers: {
  'Content-Type': 'application/x-www-form-urlencoded',
},
body: encodedData.toString(),
});
if (response.status===200 ){
const token = response.headers.get('Authorization');
const refresh = response.headers.get('Refresh');

if (typeof token === 'string' && typeof refresh === 'string')
{

localStorage.setItem('auth_token', token);
localStorage.setItem('refresh_token', refresh);
alert('로그인하였습니다')
} else{
alert('인증토큰을 불러오지 못했습니다. 다시 로그인해보세요.')
}
} else {
  console.error('Error submitting form');
}

}

catch (error) {
  alert(error);
}


}







  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">닉네임:</label>
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
      <Link href={'/find-pw'} >암호찾기</Link>
    </div>
  );
}
