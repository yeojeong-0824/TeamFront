'use client';
import { useState } from 'react';
import { url } from '../store';
import { useRouter } from 'next/navigation';


export default function FindAccount() {
    const [what_find, set_what_find] = useState<boolean | null>(null);
    const [email, set_email] = useState('');
    const [id, set_id] = useState('');
    const router = useRouter();

function Click(boolean:boolean) {
    set_what_find(boolean);
}

async function find_id() {
    try {
        const response = await fetch(`${url}/member/findMember/username?email=${email}`,
        );
        if (response.status === 200) {
            alert("가입하신 아이디를 이메일로 전송하였습니다")
            router.push('/login-ui'); // 로그인 페이지로 리다이렉트
        }
        else if (response.status === 400) {
            alert("이메일 주소를 바르게 입력해주세요");
        }
    } catch (error) {
        alert(error);

    }

}

async function find_pw() {
const data = {
username : id,
email: email
}
const queryString = new URLSearchParams(data).toString();

    try{
const response = await fetch(`${url}/member/findMember/password?${queryString}`, {
    method: 'PATCH', // HTTP 메서드 설정
   });
if (response.status===200) {
alert("암호를 재발급하였습니다. 이메일을 확인해주세요.")
router.push('/login-ui'); // 로그인 페이지로 리다이렉트
}
else if (response.status===400) {
alert("입력값이 잘못되었습니다")
}
    }
    catch (error) {
alert(error)
    }
    
}


    return (
        <div className="flex justify-center items-center h-screen">
            {what_find === null? <><div>가입한 아이디를 기억하십니까?</div> <button onClick={() => Click(true)}>예</button> <button onClick={() =>  Click(false)}>아니오</button></> : null }
            {what_find === true? <><div>가입하신 아이디와 이메일을 입력해주세요</div>
            <div>아이디<input id='id' type='text'   onChange={(e) => set_id(e.target.value)} value={id} required/></div>
            <div>이메일          <input
            type="text"
            id="email"
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            value={email}
            onChange={(e) => set_email(e.target.value)}
            required
          /> <button onClick={() => find_pw()}>조회</button> </div>
            </> : null} 
            {what_find === false?
            <><div>가입하신 이메일 주소를 알려주시면 아이디를 조회할 수 있습니다</div>
            <div>이메일<input
            type="text"
            id="email"
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            value={email}
            onChange={(e) => set_email(e.target.value)}
            required
          /></div>
<button onClick={() => find_id()}>조회</button>             </> : null }


        </div>
    );
}
