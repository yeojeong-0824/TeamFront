import sendEmail from "@/api/userApi/sendEmail";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useSendEmail = () => {
  return useMutation({
    mutationFn: (email: string) => sendEmail(email),
    onError: (error: any) => {
      if(error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '이메일 전송 실패',
          text: '입력 값이 올바르지 않습니다.'
        });
      }else if(error.response?.status === 409) {
        Swal.fire({
          icon: 'error',
          title: '이메일 전송 실패',
          text: '이미 가입된 이메일입니다.'
        });
      }
    }
  })
};

export default useSendEmail;