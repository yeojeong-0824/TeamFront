import checkUsername from "@/api/userApi/checkUsername";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useCheckUsername = () => {
  return useMutation({
    mutationFn:(username:string)=> checkUsername(username),
    onError:(error: any)=> {
      if(error.response.status === 409){
        Swal.fire({
          icon: 'error',
          title: '사용 불가능한 아이디',
          text: '이미 사용중인 아이디입니다.'
        });
      } else if(error.response.status === 400){
        Swal.fire({
          icon: 'error',
          title: '사용 불가능한 아이디',
          text: '아이디는 영문자로 시작하는 5~20자 영문자 또는 숫자이어야 합니다.'
        });
      }
    }
  })
};

export default useCheckUsername;