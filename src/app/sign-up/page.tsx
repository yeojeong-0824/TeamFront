'use client';

import { useRouter } from 'next/navigation';
import { use_user_signup_info, url } from '../store';
import { useState } from 'react';

// 이메일 입력 받아 인증을 먼저 한 뒤 회원 가입 화면을 띄워서 계정 중복 체크를 하고 가입 승인을 하기

const Signup: React.FC = () => {
  const [checked_jungbok, set_checked_jungbok] = useState(false)
  const [password_check, set_password_check] = useState("")


  const router = useRouter();
  const { username, nickname, name, password, email, age, set_username, set_nickname, set_name, set_password, set_email, set_age } = use_user_signup_info();


  //** 회원가입 로직입니다 */
  async function handleSubmit() {


    try {

      if (password === password_check) {
      const data = { username, password, email, age, nickname, name };
      const response = await fetch(`${url}/member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status===201) {
alert("회원 가입이 완료되었습니다!")
router.push('/'); 

      } else {
        alert('회원가입 실패: ' + response.statusText);
      }
      }  else {
        alert("비밀번호가 일치하지 않습니다")
  }
    } catch (error) {
      alert('서버 에러입니다: ' + error);
    }
  };


 //** 중복 확인 로직입니다 */ 
 async function check_jungbok() {
const data = {username, email, nickname}
try{
const response = await fetch(`${url}/member/confirm`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    
});
if (response.status===200){
  alert('사용할 수 있습니다')
  set_checked_jungbok(true)
  
} else if (response.status===409){
  alert('중복입니다')
} else if (response.status===400){
  alert('잘못된 입력입니다')
}

} catch (error) {
  alert('서버 에러입니다: ' + error);

}
 }



  return (
    <div>
      <h1>회원가입</h1>
      <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="text"
            id="email"
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            value={email}
            required
            readOnly
          />        </div>    

        <div>
          <label htmlFor="username">아이디:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => set_username(e.target.value)}
            required
            readOnly={checked_jungbok}
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => set_nickname(e.target.value)}
            required
            readOnly={checked_jungbok}

          />          <button onClick={() => check_jungbok()}>중복 확인</button>

        </div>

        <div>
        <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => set_name(e.target.value)}
            required
          />
        </div>
            <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$"
            onChange={(e) => set_password(e.target.value)}
            required
          />
        </div>     
          <div>

        <label htmlFor="passwordcheck">비밀번호 확인:</label>
          <input
            type="password"
            id="passwordcheck"
            value={password_check}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$"
            onChange={(e) => set_password_check(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="age">나이:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => set_age(Number(e.target.value))}
            required
          />
        </div>
        <button onClick={() => handleSubmit()}>회원가입</button>
    </div>
  );
};

export default Signup;
