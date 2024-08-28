'use client';

import { url } from '../store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuthStore from '../store';



export default function ChangePassword() {
    const { clearTokens } = useAuthStore();

const [password, set_password] = useState('')
const [password_check, set_password_check] = useState('')

const router = useRouter();

async function change_password() {

    if (password === password_check) {
    const data = {password: password}
    
    try{

        const response = await fetch(`${url}/member/authed/password`, {
            method: 'PATCH',
            headers: {
              'Authorization': `${localStorage.getItem("accessToken")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          });
      
          if (response.status === 200) {
alert("암호 변경이 완료되었습니다")
router.push('/'); 


          }
          
          else if (response.status === 400) {
            alert("비밀번호는 영문(대,소문자)과 숫자가 적어도 1개 이상씩 포함되어야 합니다 또한 길이가 8에서 30 사이여야 합니다")
          }
          
          
          else if (response.status === 403) {
            // 엑세스 토큰 재발급 시도
            const responseagain = await fetch(`${url}/member/authed/password`, {
                method: 'PATCH',
                headers: {
                  'Refresh': `${localStorage.getItem("refreshToken")}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              });
          if (responseagain.status === 200)
          {alert("암호 변경이 완료되었습니다")
            router.push('/'); 
            const token = responseagain.headers.get('Authorization');
            if (typeof token === 'string') {
           localStorage.setItem('accessToken', token);
         }
         
          } else if (response.status === 403)

            {alert("세션이 종료되었습니다. 다시 로그인해주세요")
                router.push('/'); 
                clearTokens();

            }
    
          } 


    }
catch (error) {

}
} else {
alert("암호가 일치하지 않습니다. 다시 확인해주세요.")

}
}

return(

<>
<div className="flex justify-center items-center h-screen">

<div>
          <label htmlFor="password">새 암호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => set_password(e.target.value)}
            required
            
          /> 
           <label htmlFor="passwordcheck">암호 확인:</label>
          <input
            type="password"
            id="password-check"
            value={password_check}
            onChange={(e) => set_password_check(e.target.value)}
            required
            
          />            <button onClick={() => change_password()}>변경하기</button>

        </div>


</div>

</>

);

}