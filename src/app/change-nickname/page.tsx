'use client';

import { url } from '../store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuthStore from '../store';



export default function ChangeNickname() {
    const { clearTokens } = useAuthStore();

const [nickname, set_nickname] = useState('')
const router = useRouter();

async function change_nickname() {

    const data = {nickname: nickname}
    
    try{
        const response = await fetch(`${url}/member/authed/nickname`, {
            method: 'PATCH',
            headers: {
              'Authorization': `${localStorage.getItem("accessToken")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          });
      
          if (response.status === 200) {
alert("닉네임 변경이 완료되었습니다")
router.push('/'); 


          }
          
          else if (response.status === 400) {
            alert("유저를 찾지 못하였습니다")
          }
          
          else if (response.status === 403) {
            // 엑세스 토큰 재발급 시도
            const responseagain = await fetch(`${url}/member/authed/nickname`, {
                method: 'PATCH',
                headers: {
                  'Refresh': `${localStorage.getItem("refreshToken")}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              });
          if (responseagain.status === 200)
          {alert("닉네임 변경이 완료되었습니다")
            router.push('/'); 
            const token = responseagain.headers.get('Authorization');
            if (typeof token === 'string') {
           localStorage.setItem('accessToken', token);
         }
         
          }
          else if (responseagain.status === 403)

            {alert("세션이 종료되었습니다. 다시 로그인해주세요")
                router.push('/'); 
                clearTokens();

            }
    
          } 


    }
catch (error) {

}

}

return(

<>
<div className="flex justify-center items-center h-screen">

<div>
          <label htmlFor="nickname">새 닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => set_nickname(e.target.value)}
            required
            
          />          <button onClick={() => change_nickname()}>변경하기</button>

        </div>


</div>

</>

);

}