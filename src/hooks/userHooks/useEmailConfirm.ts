import emailConfirm from "@/api/userApi/emailConfirm";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

type EmailConfirmData = {
  email: string;
  key: string;
};

const useEmailConfirm = () => {
  return useMutation({
    mutationFn: (emailData: EmailConfirmData) => emailConfirm(emailData),
    onError: (error: any) => {
      Swal.fire({
        icon: 'error',
        title: '이메일 인증 실패',
        text: '이메일 인증에 실패했습니다. 다시 시도해 주십시오',
      });
    }
  });
};

export default useEmailConfirm;