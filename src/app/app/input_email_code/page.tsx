'use client';

import { use_user_signup_info, url } from '../store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InputEmailCode() {
    const {email} = use_user_signup_info();
    const [code, set_code] = useState("");
    const router = useRouter();

    async function send_code() {
        console.log("Button clicked");  // 디버그 로그 추가
       const number_code = {email: email, option: "join", key: code}
        try {
            const response = await fetch(`${url}/member/emailAuthed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(number_code),  // body should be an object
            });
            console.log(response.status);  // 응답 상태 코드 확인
            if (response.status === 200) {
                alert("인증되었습니다");
                router.push('/sign_up');
            } else if (response.status === 401) {
                alert("인증에 실패하였습니다. 이메일 인증 코드를 바르게 입력해주세요");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <input type="text" value={code} onChange={(e) => set_code(e.target.value)} />
            <button onClick={() => send_code()}>인증하기</button>
        </div>
    );
}
