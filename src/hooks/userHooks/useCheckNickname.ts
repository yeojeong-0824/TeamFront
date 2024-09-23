import checkNickname from "@/api/userApi/checkNickname";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string)=> checkNickname(nickname),
    onError: (error: any) => {
      if(error.response.status === 409){
        Swal.fire({
          icon: 'error',
          title: '사용 불가능한 닉네임',
          text: '이미 사용중인 닉네임입니다.'
        });
      } else if(error.response.status === 400){
        Swal.fire({
          icon: 'error',
          title: '사용 불가능한 닉네임',
          text: '닉네임은 2~10자의 한글 또는 영문자이어야 합니다.'
        });
      }
    }
  });
};

export default useCheckNickname;