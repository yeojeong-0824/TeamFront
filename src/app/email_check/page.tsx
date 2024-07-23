'use client';

import { use_user_signup_info, url } from '../store';
import { useRouter } from 'next/navigation';


export default function email_check() {

  const {email, set_email} = use_user_signup_info();
  const router = useRouter();

async function check_email_for_sign_up() {  try {
  console.log(email);

  const response = await fetch(`${url}/member/emailAuthed/${email}`);

  if (response.status===200){
alert('이메일이 전송되었습니다')
router.push('/input_email_code');


  } else if (response.status===400){
    alert('올바른 이메일 주소를 입력해주세요')
  }
  else if (response.status===409) {
alert('이미 사용중인 이메일 계정입니다')

  }

}
catch (error) {
  alert(error)
}
};

    return (
<div><input             type="text"
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            value={email}
            onChange={(e) => set_email(e.target.value)}
            required
 />        <button onClick={() => check_email_for_sign_up()}>이메일 인증하기</button>
</div>
)
    ;
  }


  